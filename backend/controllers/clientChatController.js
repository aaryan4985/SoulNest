// Mock database for storing client-admin conversations
let clientConversations = {};
let allMessages = {};

// Initialize demo conversations
const initializeDemoData = () => {
  const demoClientId = "demo-user";

  if (!clientConversations[demoClientId]) {
    clientConversations[demoClientId] = {
      clientId: demoClientId,
      clientName: "Demo User",
      lastMessage: "Hello, I need some guidance",
      lastSeen: new Date(),
      status: "online",
      unreadCount: 0,
    };

    allMessages[demoClientId] = [
      {
        id: 1,
        senderId: "admin",
        senderType: "admin",
        message:
          "Hello! I'm here to help you with any questions or concerns you might have. How are you feeling today?",
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        status: "read",
      },
    ];
  }
};

// Send message from client to admin
exports.sendClientMessage = (req, res) => {
  try {
    const { clientId, clientName, message } = req.body;

    if (!clientId || !message) {
      return res.status(400).json({
        success: false,
        message: "Client ID and message are required",
      });
    }

    // Initialize demo data if needed
    initializeDemoData();

    // Create new message
    const newMessage = {
      id: Date.now(),
      senderId: clientId,
      senderType: "client",
      message: message.trim(),
      timestamp: new Date(),
      status: "sent",
    };

    // Initialize client conversation if it doesn't exist
    if (!clientConversations[clientId]) {
      clientConversations[clientId] = {
        clientId: clientId,
        clientName: clientName || `Client ${clientId}`,
        lastMessage: message.trim(),
        lastSeen: new Date(),
        status: "online",
        unreadCount: 1,
      };
      allMessages[clientId] = [];
    } else {
      // Update existing conversation
      clientConversations[clientId].lastMessage = message.trim();
      clientConversations[clientId].lastSeen = new Date();
      clientConversations[clientId].unreadCount += 1;
    }

    // Add message to client's conversation
    allMessages[clientId].push(newMessage);

    // Also update the admin's conversation list (for admin dashboard)
    // This ensures the admin sees the new message in their conversation list

    res.status(200).json({
      success: true,
      data: newMessage,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Error sending client message:", error);
    res.status(500).json({
      success: false,
      message: "Error sending message",
      error: error.message,
    });
  }
};

// Get chat history for a specific client
exports.getClientChatHistory = (req, res) => {
  try {
    const { clientId } = req.params;

    // Initialize demo data if needed
    initializeDemoData();

    const messages = allMessages[clientId] || [];

    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching chat history",
      error: error.message,
    });
  }
};

// Mark client messages as read (when admin reads them)
exports.markClientMessagesAsRead = (req, res) => {
  try {
    const { clientId } = req.params;

    if (clientConversations[clientId]) {
      clientConversations[clientId].unreadCount = 0;

      // Mark all client messages as read
      if (allMessages[clientId]) {
        allMessages[clientId] = allMessages[clientId].map((msg) => {
          if (msg.senderType === "client" && msg.status !== "read") {
            return { ...msg, status: "read" };
          }
          return msg;
        });
      }
    }

    res.status(200).json({
      success: true,
      message: "Messages marked as read",
    });
  } catch (error) {
    console.error("Error marking messages as read:", error);
    res.status(500).json({
      success: false,
      message: "Error marking messages as read",
      error: error.message,
    });
  }
};

// Helper function to get all client conversations (for admin)
exports.getAllClientConversations = () => {
  return Object.values(clientConversations).map((conv) => ({
    ...conv,
    lastSeen: getRelativeTime(conv.lastSeen),
  }));
};

// Helper function to get messages for admin view
exports.getMessagesForAdmin = (clientId) => {
  return allMessages[clientId] || [];
};

// Helper function to add admin message to client conversation
exports.addAdminMessage = (clientId, message) => {
  const adminMessage = {
    id: Date.now(),
    senderId: "admin",
    senderType: "admin",
    message: message.trim(),
    timestamp: new Date(),
    status: "sent",
  };

  if (!allMessages[clientId]) {
    allMessages[clientId] = [];
  }

  allMessages[clientId].push(adminMessage);

  // Update conversation
  if (clientConversations[clientId]) {
    clientConversations[clientId].lastMessage = message.trim();
    clientConversations[clientId].lastSeen = new Date();
  }

  return adminMessage;
};

// Helper function to format relative time
function getRelativeTime(timestamp) {
  const now = new Date();
  const diff = now - new Date(timestamp);
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return "now";
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  return `${days} day${days > 1 ? "s" : ""} ago`;
}
