const express = require("express");
const router = express.Router();
const clientChatController = require("../controllers/clientChatController");

// Send message from client to admin
router.post("/send", clientChatController.sendClientMessage);

// Get chat history for a specific client
router.get("/history/:clientId", clientChatController.getClientChatHistory);

// Mark client messages as read (when admin reads them)
router.put(
  "/mark-read/:clientId",
  clientChatController.markClientMessagesAsRead
);

module.exports = router;
