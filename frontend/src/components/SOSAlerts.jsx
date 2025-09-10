import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertTriangle, FiClock, FiUser, FiX, FiCheck, FiEye } from 'react-icons/fi';

const SOSAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCount, setActiveCount] = useState(0);

  // Fetch alerts on component mount and set up polling
  useEffect(() => {
    fetchAlerts();
    fetchActiveCount();
    
    // Poll for new alerts every 3 seconds
    const interval = setInterval(() => {
      fetchAlerts();
      fetchActiveCount();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await fetch("http://localhost:5000/sos/alerts");
      const data = await response.json();
      
      if (data.success) {
        setAlerts(data.data);
      }
    } catch (error) {
      console.error("Error fetching SOS alerts:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchActiveCount = async () => {
    try {
      const response = await fetch("http://localhost:5000/sos/alerts/count");
      const data = await response.json();
      
      if (data.success) {
        setActiveCount(data.data.count);
      }
    } catch (error) {
      console.error("Error fetching active count:", error);
    }
  };

  const updateAlertStatus = async (alertId, status) => {
    try {
      const response = await fetch(`http://localhost:5000/sos/alerts/${alertId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
      });

      const data = await response.json();
      
      if (data.success) {
        // Refresh alerts list
        fetchAlerts();
        fetchActiveCount();
      }
    } catch (error) {
      console.error("Error updating alert status:", error);
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - alertTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'red';
      case 'high': return 'orange';
      case 'medium': return 'yellow';
      default: return 'gray';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-red-600 bg-red-50';
      case 'acknowledged': return 'text-orange-600 bg-orange-50';
      case 'resolved': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  if (loading) {
    return (
      <div className="rounded-xl p-6 shadow-sm border" style={{ backgroundColor: 'white', borderColor: '#ff3f74' }}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl p-6 shadow-sm border" style={{ backgroundColor: 'white', borderColor: '#ff3f74' }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg" style={{ backgroundColor: '#ff3f74' }}>
            <FiAlertTriangle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">SOS Alerts</h3>
            <p className="text-sm text-gray-600">
              {activeCount > 0 ? (
                <span className="text-red-600 font-medium">
                  {activeCount} active alert{activeCount !== 1 ? 's' : ''} requiring attention
                </span>
              ) : (
                "No active alerts"
              )}
            </p>
          </div>
        </div>
        
        {activeCount > 0 && (
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
          >
            <span className="text-white text-xs font-bold">{activeCount}</span>
          </motion.div>
        )}
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {alerts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FiCheck className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No SOS alerts received</p>
            </div>
          ) : (
            alerts.map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`border rounded-lg p-4 ${alert.status === 'active' ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-white'}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`p-2 rounded-lg ${alert.status === 'active' ? 'bg-red-100' : 'bg-gray-100'}`}>
                      <FiUser className={`w-4 h-4 ${alert.status === 'active' ? 'text-red-600' : 'text-gray-600'}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900 truncate">
                          {alert.clientName}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                          {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">{alert.message}</p>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <FiClock className="w-3 h-3" />
                          {formatTimeAgo(alert.timestamp)}
                        </div>
                        <div className="flex items-center gap-1">
                          <FiUser className="w-3 h-3" />
                          ID: {alert.clientId.slice(-6)}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    {alert.status === 'active' && (
                      <>
                        <button
                          onClick={() => updateAlertStatus(alert.id, 'acknowledged')}
                          className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                          title="Acknowledge"
                        >
                          <FiEye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => updateAlertStatus(alert.id, 'resolved')}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Mark as Resolved"
                        >
                          <FiCheck className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    
                    {alert.status === 'acknowledged' && (
                      <button
                        onClick={() => updateAlertStatus(alert.id, 'resolved')}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Mark as Resolved"
                      >
                        <FiCheck className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SOSAlerts;
