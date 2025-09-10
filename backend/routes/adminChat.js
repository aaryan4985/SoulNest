const express = require("express");
const router = express.Router();
const adminChatController = require("../controllers/adminChatController");

// Get all client conversations for admin
router.get("/conversations", adminChatController.getConversations);

// Get messages for a specific client
router.get("/conversation/:clientId", adminChatController.getClientMessages);

// Send message from admin to client
router.post("/send", adminChatController.sendAdminMessage);

// Mark messages as read
router.put("/read/:messageId", adminChatController.markAsRead);

// Get online users
router.get("/online-users", adminChatController.getOnlineUsers);

module.exports = router;
