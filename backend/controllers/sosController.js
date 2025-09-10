// In-memory storage for SOS alerts (in production, use a database)
let sosAlerts = [];
let alertIdCounter = 1;

// Create SOS alert
const createSOSAlert = (req, res) => {
  try {
    const { clientId, clientName, message, location } = req.body;
    
    const alert = {
      id: alertIdCounter++,
      clientId,
      clientName: clientName || `User ${clientId}`,
      message: message || "Emergency assistance required",
      location: location || "Unknown",
      timestamp: new Date().toISOString(),
      status: "active", // active, acknowledged, resolved
      priority: "critical"
    };
    
    sosAlerts.unshift(alert); // Add to beginning of array
    
    // Keep only last 100 alerts
    if (sosAlerts.length > 100) {
      sosAlerts = sosAlerts.slice(0, 100);
    }
    
    console.log(`🚨 SOS Alert created for ${alert.clientName}`);
    
    res.json({
      success: true,
      message: "SOS alert created successfully",
      data: alert
    });
  } catch (error) {
    console.error("Error creating SOS alert:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create SOS alert"
    });
  }
};

// Get all SOS alerts for admin
const getSOSAlerts = (req, res) => {
  try {
    const { status } = req.query;
    
    let filteredAlerts = sosAlerts;
    if (status) {
      filteredAlerts = sosAlerts.filter(alert => alert.status === status);
    }
    
    res.json({
      success: true,
      data: filteredAlerts,
      total: filteredAlerts.length
    });
  } catch (error) {
    console.error("Error fetching SOS alerts:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch SOS alerts"
    });
  }
};

// Update SOS alert status
const updateSOSAlert = (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const alertIndex = sosAlerts.findIndex(alert => alert.id === parseInt(id));
    
    if (alertIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "SOS alert not found"
      });
    }
    
    sosAlerts[alertIndex].status = status;
    sosAlerts[alertIndex].updatedAt = new Date().toISOString();
    
    res.json({
      success: true,
      message: "SOS alert updated successfully",
      data: sosAlerts[alertIndex]
    });
  } catch (error) {
    console.error("Error updating SOS alert:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update SOS alert"
    });
  }
};

// Get active alerts count
const getActiveAlertsCount = (req, res) => {
  try {
    const activeCount = sosAlerts.filter(alert => alert.status === "active").length;
    
    res.json({
      success: true,
      data: { count: activeCount }
    });
  } catch (error) {
    console.error("Error getting active alerts count:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get active alerts count"
    });
  }
};

module.exports = {
  createSOSAlert,
  getSOSAlerts,
  updateSOSAlert,
  getActiveAlertsCount
};
