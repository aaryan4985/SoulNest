// Import client chat controller for shared data
const clientChatController = require("./clientChatController");

// Mock data for demonstration - in production, this would connect to a database
let conversations = [
  {
    id: 1,
    clientId: 1,
    clientName: "John Doe",
    avatar: "/api/placeholder/40/40",
    lastMessage: "I need help with anxiety",
    lastSeen: new Date(Date.now() - 1000 * 60 * 2),
    status: "online",
    unreadCount: 2,
  },
  {
    id: 2,
    clientId: 2,
    clientName: "Sarah Smith",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Thank you for the session",
    lastSeen: new Date(Date.now() - 1000 * 60 * 60),
    status: "away",
    unreadCount: 0,
  },
  {
    id: 3,
    clientId: 3,
    clientName: "Mike Johnson",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Can we schedule another meeting?",
    lastSeen: new Date(Date.now() - 1000 * 60 * 180),
    status: "offline",
    unreadCount: 1,
  },
];

let messages = {
  1: [
    {
      id: 1,
      senderId: 1,
      senderType: "client",
      message:
        "Hello, I've been feeling quite anxious lately and would like some guidance.",
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
      status: "read",
    },
    {
      id: 2,
      senderId: "admin",
      senderType: "admin",
      message:
        "Hello John! I'm here to help. Can you tell me more about what's been causing your anxiety?",
      timestamp: new Date(Date.now() - 1000 * 60 * 8),
      status: "read",
    },
    {
      id: 3,
      senderId: 1,
      senderType: "client",
      message: "I need help with anxiety",
      timestamp: new Date(Date.now() - 1000 * 60 * 2),
      status: "delivered",
    },
  ],
  2: [
    {
      id: 1,
      senderId: 2,
      senderType: "client",
      message: "Thank you for the session today. It was really helpful.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      status: "read",
    },
    {
      id: 2,
      senderId: "admin",
      senderType: "admin",
      message:
        "You're very welcome, Sarah! I'm glad you found it helpful. Keep practicing those breathing exercises we discussed.",
      timestamp: new Date(Date.now() - 1000 * 60 * 55),
      status: "read",
    },
  ],
  3: [
    {
      id: 1,
      senderId: 3,
      senderType: "client",
      message: "Can we schedule another meeting?",
      timestamp: new Date(Date.now() - 1000 * 60 * 180),
      status: "sent",
    },
  ],
};

// Get all client conversations for admin
exports.getConversations = (req, res) => {
  try {
    // Get live conversations from client chat controller
    const liveConversations = clientChatController.getAllClientConversations();

    // Include static demo conversations for testing
    const staticConversations = conversations.map((conv) => ({
      ...conv,
      lastSeen: getRelativeTime(conv.lastSeen),
    }));

    // Merge and deduplicate conversations
    const allConversations = [...liveConversations];
    staticConversations.forEach((staticConv) => {
      if (
        !liveConversations.find((live) => live.clientId === staticConv.clientId)
      ) {
        allConversations.push(staticConv);
      }
    });

    res.status(200).json({
      success: true,
      data: allConversations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching conversations",
      error: error.message,
    });
  }
};

// Get messages for a specific client
exports.getClientMessages = (req, res) => {
  try {
    const { clientId } = req.params;

    // Try to get live messages from client chat controller first
    const liveMessages = clientChatController.getMessagesForAdmin(clientId);

    if (liveMessages && liveMessages.length > 0) {
      res.status(200).json({
        success: true,
        data: liveMessages,
      });
    } else {
      // Fallback to static demo data
      const clientMessages = messages[clientId] || [];
      res.status(200).json({
        success: true,
        data: clientMessages,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching messages",
      error: error.message,
    });
  }
};

// Send message from admin to client
exports.sendAdminMessage = (req, res) => {
  try {
    const { clientId, message } = req.body;

    if (!clientId || !message) {
      return res.status(400).json({
        success: false,
        message: "Client ID and message are required",
      });
    }

    // Add message to shared client chat system
    const newMessage = clientChatController.addAdminMessage(clientId, message);

    // Also add to local messages for backward compatibility
    if (!messages[clientId]) {
      messages[clientId] = [];
    }
    messages[clientId].push(newMessage);

    // Update conversation's last message
    const conversationIndex = conversations.findIndex(
      (conv) => conv.clientId == clientId
    );
    if (conversationIndex !== -1) {
      conversations[conversationIndex].lastMessage = message.trim();
      conversations[conversationIndex].lastSeen = new Date();
    }

    res.status(200).json({
      success: true,
      data: newMessage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error sending message",
      error: error.message,
    });
  }
};

// Mark messages as read
exports.markAsRead = (req, res) => {
  try {
    const { messageId } = req.params;

    // Find and update message status
    for (let clientId in messages) {
      const messageIndex = messages[clientId].findIndex(
        (msg) => msg.id == messageId
      );
      if (messageIndex !== -1) {
        messages[clientId][messageIndex].status = "read";
        break;
      }
    }

    res.status(200).json({
      success: true,
      message: "Message marked as read",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error marking message as read",
      error: error.message,
    });
  }
};

// Get online users
exports.getOnlineUsers = (req, res) => {
  try {
    const onlineUsers = conversations.filter(
      (conv) => conv.status === "online"
    );

    res.status(200).json({
      success: true,
      data: onlineUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching online users",
      error: error.message,
    });
  }
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
