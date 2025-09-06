import React, { useState } from 'react';
import { Download, FileText, FileSpreadsheet, Database, Check } from 'lucide-react';

const ExportButton = ({ data, filename = 'dashboard-export', onExport }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const exportFormats = [
    {
      id: 'csv',
      name: 'CSV',
      icon: FileSpreadsheet,
      description: 'Comma-separated values',
      mimeType: 'text/csv'
    },
    {
      id: 'json',
      name: 'JSON',
      icon: Database,
      description: 'JavaScript Object Notation',
      mimeType: 'application/json'
    },
    {
      id: 'txt',
      name: 'Text',
      icon: FileText,
      description: 'Plain text format',
      mimeType: 'text/plain'
    }
  ];

  const handleExport = async (format) => {
    setIsExporting(true);
    
    try {
      let exportData;
      let fileExtension = format.id;
      
      switch (format.id) {
        case 'csv':
          exportData = convertToCSV(data);
          break;
        case 'json':
          exportData = JSON.stringify(data, null, 2);
          break;
        case 'txt':
          exportData = convertToText(data);
          break;
        default:
          throw new Error('Unsupported format');
      }

      // Create and download file
      const blob = new Blob([exportData], { type: format.mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${filename}.${fileExtension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Call custom export handler if provided
      if (onExport) {
        await onExport(format.id, exportData);
      }

      setExportSuccess(true);
      setTimeout(() => {
        setExportSuccess(false);
        setIsOpen(false);
      }, 2000);

    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const convertToCSV = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      return 'No data available';
    }

    const headers = Object.keys(data[0]);
    const csvHeaders = headers.join(',');
    
    const csvRows = data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Escape commas and quotes in CSV
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    );

    return [csvHeaders, ...csvRows].join('\n');
  };

  const convertToText = (data) => {
    if (Array.isArray(data)) {
      return data.map(item => 
        Object.entries(item)
          .map(([key, value]) => `${key}: ${value}`)
          .join('\n')
      ).join('\n\n');
    }
    
    return JSON.stringify(data, null, 2);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
        disabled={isExporting}
      >
        {exportSuccess ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Download className="w-4 h-4" />
        )}
        <span>
          {isExporting ? 'Exporting...' : exportSuccess ? 'Exported!' : 'Export'}
        </span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
            <div className="p-3 border-b border-gray-700">
              <h3 className="text-white font-medium">Export Data</h3>
              <p className="text-gray-400 text-sm">Choose your preferred format</p>
            </div>
            
            <div className="p-2">
              {exportFormats.map((format) => (
                <button
                  key={format.id}
                  onClick={() => handleExport(format)}
                  disabled={isExporting}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors text-left disabled:opacity-50"
                >
                  <div className="p-2 bg-gray-700 rounded-lg">
                    <format.icon className="w-4 h-4 text-gray-300" />
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium">{format.name}</div>
                    <div className="text-gray-400 text-xs">{format.description}</div>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="p-3 border-t border-gray-700 text-xs text-gray-500">
              File will be saved as: {filename}.{'{format}'}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ExportButton;
