import { useQuery } from '@tanstack/react-query';
import { healthAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { CheckCircle, XCircle, AlertCircle, Server, Database, Clock } from 'lucide-react';

const HealthCheck = () => {
  const { data: healthData, isLoading: healthLoading, error: healthError } = useQuery({
    queryKey: ['health'],
    queryFn: () => healthAPI.check(),
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const { data: statusData, isLoading: statusLoading } = useQuery({
    queryKey: ['status'],
    queryFn: () => healthAPI.status(),
    refetchInterval: 30000,
  });

  const formatUptime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    }
    return `${minutes}m ${secs}s`;
  };

  const formatBytes = (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'OK':
      case 'operational':
      case 'connected':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'disconnected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  if (healthLoading || statusLoading) {
    return <LoadingSpinner message="Checking system health..." />;
  }

  if (healthError) {
    return (
      <div className="text-center py-8">
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Service Unavailable</h2>
        <p className="text-gray-600">Unable to connect to the backend service</p>
        <div className="mt-4 p-4 bg-red-50 rounded-lg">
          <p className="text-red-700 text-sm">{healthError.message}</p>
        </div>
      </div>
    );
  }

  const health = healthData?.data;
  const status = statusData?.data;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          System Health Dashboard
        </h1>
        <p className="text-gray-600">
          Monitor the health and performance of your MERN application
        </p>
      </div>

      {/* Overall Status */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Overall Status</h2>
          <div className="flex items-center space-x-2">
            {getStatusIcon(health?.status)}
            <span className={`font-medium ${
              health?.status === 'OK' ? 'text-green-600' : 'text-red-600'
            }`}>
              {health?.status === 'OK' ? 'All Systems Operational' : 'System Issues Detected'}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3">
            <Server className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-sm text-gray-600">Server</p>
              <p className="font-medium">{status?.service || 'MERN Backend API'}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Database className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-sm text-gray-600">Database</p>
              <div className="flex items-center space-x-2">
                {getStatusIcon(health?.database)}
                <span className="font-medium capitalize">{health?.database}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Clock className="w-8 h-8 text-purple-500" />
            <div>
              <p className="text-sm text-gray-600">Uptime</p>
              <p className="font-medium">{formatUptime(health?.uptime || 0)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Server Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Server Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Environment:</span>
              <span className="font-medium">{health?.environment}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Platform:</span>
              <span className="font-medium">{status?.server?.platform}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Node Version:</span>
              <span className="font-medium">{status?.server?.node_version}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Version:</span>
              <span className="font-medium">{status?.version}</span>
            </div>
          </div>
        </div>

        {/* Memory Usage */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Memory Usage</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">RSS:</span>
              <span className="font-medium">{formatBytes(health?.memory?.rss || 0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Heap Used:</span>
              <span className="font-medium">{formatBytes(health?.memory?.heapUsed || 0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Heap Total:</span>
              <span className="font-medium">{formatBytes(health?.memory?.heapTotal || 0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">External:</span>
              <span className="font-medium">{formatBytes(health?.memory?.external || 0)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Database Information */}
      {status?.database && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Database Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <div className="flex items-center space-x-2">
                {getStatusIcon(status.database.status)}
                <span className="font-medium capitalize">{status.database.status}</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Host:</span>
              <span className="font-medium">{status.database.host}</span>
            </div>
          </div>
        </div>
      )}

      {/* Timestamps */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="text-center text-sm text-gray-600">
          Last updated: {new Date(health?.timestamp || Date.now()).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default HealthCheck;