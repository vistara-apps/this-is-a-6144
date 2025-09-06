/**
 * Data Manager - Centralized data handling and business logic
 * Handles API calls, data transformation, and state management
 */

// API Configuration
const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || 'https://api.analyflow.com',
  version: 'v1',
  timeout: 10000,
  retries: 3
};

// Data transformation utilities
export const DataTransformers = {
  /**
   * Transform raw metric data for display
   */
  transformMetrics: (rawData) => {
    return rawData.map(metric => ({
      ...metric,
      formattedValue: formatNumber(metric.value),
      changeFormatted: formatPercentage(metric.change),
      trendIcon: metric.trend === 'up' ? '↗' : metric.trend === 'down' ? '↘' : '→'
    }));
  },

  /**
   * Transform chart data for Recharts
   */
  transformChartData: (rawData, chartType) => {
    switch (chartType) {
      case 'area':
      case 'bar':
        return rawData.map(point => ({
          name: point.name,
          value: Number(point.value),
          timestamp: point.timestamp
        }));
      
      case 'pie':
        return rawData.map(point => ({
          name: point.name,
          value: Number(point.value),
          color: point.color || generateColor()
        }));
      
      default:
        return rawData;
    }
  },

  /**
   * Transform activity data with enhanced formatting
   */
  transformActivities: (rawData) => {
    return rawData.map(activity => ({
      ...activity,
      timeAgo: formatTimeAgo(activity.timestamp),
      priorityColor: getPriorityColor(activity.priority),
      isRecent: isRecentActivity(activity.timestamp)
    }));
  }
};

// Data validation utilities
export const DataValidators = {
  /**
   * Validate metric data structure
   */
  validateMetric: (metric) => {
    const required = ['id', 'title', 'value', 'change', 'trend'];
    return required.every(field => metric.hasOwnProperty(field));
  },

  /**
   * Validate chart data structure
   */
  validateChartData: (chartData) => {
    if (!Array.isArray(chartData)) return false;
    return chartData.every(point => 
      point.hasOwnProperty('name') && point.hasOwnProperty('value')
    );
  },

  /**
   * Validate date range
   */
  validateDateRange: (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return start <= end && start <= new Date();
  }
};

// API service layer
export class APIService {
  constructor() {
    this.baseURL = API_CONFIG.baseURL;
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  /**
   * Generic API request handler with retry logic
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}/api/${API_CONFIG.version}${endpoint}`;
    const config = {
      timeout: API_CONFIG.timeout,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    for (let attempt = 1; attempt <= API_CONFIG.retries; attempt++) {
      try {
        const response = await fetch(url, config);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        if (attempt === API_CONFIG.retries) {
          throw new Error(`API request failed after ${API_CONFIG.retries} attempts: ${error.message}`);
        }
        
        // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
  }

  /**
   * Get cached data or fetch from API
   */
  async getCachedData(key, fetchFunction) {
    const cached = this.cache.get(key);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }

    const data = await fetchFunction();
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });

    return data;
  }

  /**
   * Fetch dashboard metrics
   */
  async getMetrics() {
    return this.getCachedData('metrics', async () => {
      const response = await this.request('/metrics');
      return DataTransformers.transformMetrics(response.data);
    });
  }

  /**
   * Fetch chart data
   */
  async getChartData(chartId, options = {}) {
    const cacheKey = `chart-${chartId}-${JSON.stringify(options)}`;
    
    return this.getCachedData(cacheKey, async () => {
      const queryParams = new URLSearchParams(options).toString();
      const endpoint = `/charts/${chartId}/data${queryParams ? `?${queryParams}` : ''}`;
      
      const response = await this.request(endpoint);
      return {
        ...response.data,
        data: DataTransformers.transformChartData(response.data.data, response.data.type)
      };
    });
  }

  /**
   * Fetch activity feed
   */
  async getActivities(options = {}) {
    const queryParams = new URLSearchParams({
      limit: 20,
      ...options
    }).toString();
    
    const response = await this.request(`/activities?${queryParams}`);
    return {
      ...response,
      data: DataTransformers.transformActivities(response.data)
    };
  }

  /**
   * Fetch table data with pagination and sorting
   */
  async getTableData(tableId, options = {}) {
    const cacheKey = `table-${tableId}-${JSON.stringify(options)}`;
    
    return this.getCachedData(cacheKey, async () => {
      const queryParams = new URLSearchParams({
        page: 1,
        limit: 10,
        ...options
      }).toString();
      
      const response = await this.request(`/tables/${tableId}?${queryParams}`);
      return response.data;
    });
  }
}

// Real-time data manager
export class RealTimeManager {
  constructor() {
    this.ws = null;
    this.subscribers = new Map();
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
  }

  /**
   * Connect to WebSocket for real-time updates
   */
  connect() {
    const wsURL = API_CONFIG.baseURL.replace('http', 'ws') + '/ws';
    
    try {
      this.ws = new WebSocket(wsURL);
      
      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
      };

      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.handleMessage(data);
      };

      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
        this.handleReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    } catch (error) {
      console.error('Failed to connect WebSocket:', error);
    }
  }

  /**
   * Handle incoming WebSocket messages
   */
  handleMessage(data) {
    const { type, payload } = data;
    
    if (this.subscribers.has(type)) {
      this.subscribers.get(type).forEach(callback => {
        try {
          callback(payload);
        } catch (error) {
          console.error('Error in subscriber callback:', error);
        }
      });
    }
  }

  /**
   * Subscribe to real-time updates
   */
  subscribe(eventType, callback) {
    if (!this.subscribers.has(eventType)) {
      this.subscribers.set(eventType, new Set());
    }
    
    this.subscribers.get(eventType).add(callback);
    
    // Return unsubscribe function
    return () => {
      this.subscribers.get(eventType).delete(callback);
    };
  }

  /**
   * Handle WebSocket reconnection
   */
  handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.pow(2, this.reconnectAttempts) * 1000;
      
      setTimeout(() => {
        console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
        this.connect();
      }, delay);
    }
  }

  /**
   * Disconnect WebSocket
   */
  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

// Utility functions
function formatNumber(value) {
  if (typeof value === 'string') return value;
  
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + 'M';
  } else if (value >= 1000) {
    return (value / 1000).toFixed(1) + 'K';
  }
  
  return value.toLocaleString();
}

function formatPercentage(value) {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
}

function formatTimeAgo(timestamp) {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInSeconds = Math.floor((now - time) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  
  return `${Math.floor(diffInSeconds / 86400)} days ago`;
}

function getPriorityColor(priority) {
  const colors = {
    low: 'text-green-400',
    medium: 'text-yellow-400',
    high: 'text-red-400'
  };
  return colors[priority] || 'text-gray-400';
}

function isRecentActivity(timestamp) {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInMinutes = (now - time) / (1000 * 60);
  return diffInMinutes <= 30; // Consider recent if within 30 minutes
}

function generateColor() {
  const colors = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Export singleton instances
export const apiService = new APIService();
export const realTimeManager = new RealTimeManager();

// Data hooks for React components
export const useMetrics = () => {
  const [metrics, setMetrics] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const data = await apiService.getMetrics();
        setMetrics(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();

    // Subscribe to real-time updates
    const unsubscribe = realTimeManager.subscribe('metric_update', (payload) => {
      setMetrics(prev => prev.map(metric => 
        metric.id === payload.id ? { ...metric, ...payload } : metric
      ));
    });

    return unsubscribe;
  }, []);

  return { metrics, loading, error };
};

export default {
  DataTransformers,
  DataValidators,
  APIService,
  RealTimeManager,
  apiService,
  realTimeManager
};
