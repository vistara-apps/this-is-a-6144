# API Documentation

## Overview

This document outlines the API structure and data models for the AnalyFlow Analytics Dashboard. The application is designed to work with RESTful APIs and supports real-time data updates.

## Base Configuration

```javascript
// Environment Configuration
const API_CONFIG = {
  baseURL: process.env.VITE_API_URL || 'https://api.analyflow.com',
  version: 'v1',
  timeout: 10000,
  retries: 3
};
```

## Authentication

### JWT Token Authentication
```javascript
// Headers for authenticated requests
{
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json',
  'X-API-Version': 'v1'
}
```

## Data Models

### Metrics Data Model
```typescript
interface MetricData {
  id: string;
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  color: 'blue' | 'green' | 'red' | 'purple';
  timestamp: string;
  period: 'hour' | 'day' | 'week' | 'month';
}
```

### Chart Data Model
```typescript
interface ChartDataPoint {
  name: string;
  value: number;
  timestamp?: string;
  category?: string;
}

interface ChartConfig {
  id: string;
  title: string;
  type: 'area' | 'bar' | 'pie' | 'line';
  timeframe: string;
  data: ChartDataPoint[];
  options?: {
    showGrid?: boolean;
    showLegend?: boolean;
    colors?: string[];
  };
}
```

### Activity Feed Model
```typescript
interface ActivityItem {
  id: string;
  type: 'user' | 'metric' | 'alert' | 'success' | 'warning';
  icon: string;
  title: string;
  description: string;
  timestamp: string;
  color: string;
  bgColor: string;
  priority: 'low' | 'medium' | 'high';
  read: boolean;
}
```

### User Data Model
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user' | 'viewer';
  preferences: {
    theme: 'dark' | 'light';
    notifications: boolean;
    defaultDashboard: string;
  };
}
```

## API Endpoints

### Dashboard Metrics

#### Get All Metrics
```http
GET /api/v1/metrics
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "total-users",
      "title": "Total Users",
      "value": "24,567",
      "change": 12.5,
      "trend": "up",
      "color": "blue",
      "timestamp": "2024-01-15T10:30:00Z",
      "period": "day"
    }
  ],
  "meta": {
    "total": 4,
    "lastUpdated": "2024-01-15T10:30:00Z"
  }
}
```

#### Get Specific Metric
```http
GET /api/v1/metrics/{metricId}
```

**Parameters:**
- `metricId` (string): Unique identifier for the metric
- `period` (query, optional): Time period (hour, day, week, month)

### Chart Data

#### Get Chart Data
```http
GET /api/v1/charts/{chartId}/data
```

**Query Parameters:**
- `startDate` (string): Start date in ISO format
- `endDate` (string): End date in ISO format
- `granularity` (string): Data granularity (hour, day, week)

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "revenue-overview",
    "title": "Revenue Overview",
    "type": "area",
    "timeframe": "Last 7 days",
    "data": [
      {
        "name": "Mon",
        "value": 4000,
        "timestamp": "2024-01-08T00:00:00Z"
      }
    ]
  }
}
```

### Activity Feed

#### Get Activities
```http
GET /api/v1/activities
```

**Query Parameters:**
- `limit` (number): Number of activities to return (default: 20)
- `offset` (number): Pagination offset
- `type` (string): Filter by activity type
- `unread` (boolean): Show only unread activities

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "act-001",
      "type": "user",
      "title": "New user registered",
      "description": "Sarah Johnson joined the platform",
      "timestamp": "2024-01-15T10:28:00Z",
      "color": "text-blue-400",
      "bgColor": "bg-blue-400/10",
      "priority": "medium",
      "read": false
    }
  ],
  "meta": {
    "total": 156,
    "unread": 12,
    "hasMore": true
  }
}
```

#### Mark Activity as Read
```http
PATCH /api/v1/activities/{activityId}/read
```

### Data Tables

#### Get Table Data
```http
GET /api/v1/tables/{tableId}
```

**Query Parameters:**
- `page` (number): Page number for pagination
- `limit` (number): Items per page
- `sort` (string): Sort field
- `order` (string): Sort order (asc, desc)
- `filter` (string): Filter criteria

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "top-pages",
    "title": "Top Pages",
    "columns": [
      {
        "key": "page",
        "label": "Page",
        "sortable": true
      },
      {
        "key": "visitors",
        "label": "Visitors",
        "sortable": true,
        "type": "number"
      }
    ],
    "rows": [
      {
        "id": "1",
        "page": "/dashboard",
        "visitors": 2847,
        "change": 12.5,
        "trend": "up",
        "bounce": "32%"
      }
    ]
  },
  "meta": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

## Real-time Updates

### WebSocket Connection
```javascript
// WebSocket connection for real-time updates
const ws = new WebSocket('wss://api.analyflow.com/ws');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  
  switch (data.type) {
    case 'metric_update':
      updateMetric(data.payload);
      break;
    case 'new_activity':
      addActivity(data.payload);
      break;
    case 'chart_data':
      updateChart(data.payload);
      break;
  }
};
```

### Event Types
- `metric_update`: Real-time metric value changes
- `new_activity`: New activity feed items
- `chart_data`: Updated chart data points
- `user_action`: User interaction events
- `system_alert`: System-wide notifications

## Error Handling

### Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": {
      "field": "startDate",
      "reason": "Invalid date format"
    }
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Common Error Codes
- `AUTHENTICATION_REQUIRED`: Missing or invalid authentication
- `AUTHORIZATION_DENIED`: Insufficient permissions
- `VALIDATION_ERROR`: Invalid request parameters
- `RESOURCE_NOT_FOUND`: Requested resource doesn't exist
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `INTERNAL_SERVER_ERROR`: Server-side error

## Rate Limiting

```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1642248000
```

- **Standard**: 1000 requests per hour
- **Premium**: 5000 requests per hour
- **Enterprise**: Unlimited

## Data Export

### Export Dashboard Data
```http
POST /api/v1/export
```

**Request Body:**
```json
{
  "format": "csv" | "json" | "xlsx",
  "dateRange": {
    "start": "2024-01-01T00:00:00Z",
    "end": "2024-01-15T23:59:59Z"
  },
  "metrics": ["total-users", "revenue"],
  "charts": ["revenue-overview"],
  "includeActivities": true
}
```

## Webhooks

### Webhook Configuration
```json
{
  "url": "https://your-app.com/webhooks/analyflow",
  "events": ["metric.updated", "activity.created"],
  "secret": "your-webhook-secret"
}
```

### Webhook Payload
```json
{
  "event": "metric.updated",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "metricId": "total-users",
    "oldValue": "24,500",
    "newValue": "24,567",
    "change": 67
  }
}
```

## SDK Integration

### JavaScript SDK
```javascript
import { AnalyFlowSDK } from '@analyflow/sdk';

const client = new AnalyFlowSDK({
  apiKey: 'your-api-key',
  baseURL: 'https://api.analyflow.com'
});

// Get metrics
const metrics = await client.metrics.getAll();

// Subscribe to real-time updates
client.subscribe('metrics', (data) => {
  console.log('Metric updated:', data);
});
```

## Testing

### Mock API Server
```bash
# Start mock server for development
npm run mock-api

# Available at http://localhost:3001
```

### API Testing
```javascript
// Jest test example
describe('Metrics API', () => {
  test('should fetch all metrics', async () => {
    const response = await fetch('/api/v1/metrics');
    const data = await response.json();
    
    expect(data.success).toBe(true);
    expect(data.data).toHaveLength(4);
  });
});
```

## Performance Considerations

### Caching Strategy
- **Metrics**: Cache for 1 minute
- **Chart Data**: Cache for 5 minutes
- **Activities**: No caching (real-time)
- **Static Data**: Cache for 1 hour

### Optimization Tips
- Use pagination for large datasets
- Implement data compression
- Utilize CDN for static assets
- Enable HTTP/2 for better performance
- Implement proper database indexing

---

This API documentation provides a comprehensive guide for integrating with the AnalyFlow dashboard. For additional support, please refer to the main README or create an issue on GitHub.
