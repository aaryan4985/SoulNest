import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiSend, FiUser, FiClock, FiCheck, FiCheckCircle } from "react-icons/fi";

const AdminChat = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedUser]);

  // Fetch conversations on component mount
  useEffect(() => {
    fetchConversations();
    // Set up polling to refresh conversations every 5 seconds
    const interval = setInterval(fetchConversations, 5000);
    return () => clearInterval(interval);
  }, []);

  // Fetch messages when a user is selected
  useEffect(() => {
    if (selectedUser) {
      fetchMessages(selectedUser.clientId);
      // Set up polling to refresh messages every 3 seconds when chat is active
      const interval = setInterval(() => {
        fetchMessages(selectedUser.clientId);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [selectedUser]);

  const fetchConversations = async () => {
    try {
      const response = await fetch("http://localhost:5000/admin/chat/conversations");
      const data = await response.json();
      
      if (data.success) {
        setUsers(data.data.map(conv => ({
          id: conv.clientId,
          clientId: conv.clientId, // Keep both for compatibility
          name: conv.clientName,
          avatar: conv.avatar,
          lastMessage: conv.lastMessage,
          lastSeen: conv.lastSeen,
          status: conv.status,
          unread: conv.unreadCount
        })));
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      setLoading(false);
    }
  };

  const fetchMessages = async (clientId) => {
    try {
      const response = await fetch(`http://localhost:5000/admin/chat/conversation/${clientId}`);
      const data = await response.json();
      
      if (data.success) {
        setMessages(prev => ({
          ...prev,
          [clientId]: data.data
        }));
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedUser) return;

    const tempMessage = {
      id: Date.now(),
      senderId: "admin",
      senderType: "admin",
      message: message.trim(),
      timestamp: new Date(),
      status: "sending"
    };

    // Optimistically add message to UI
    setMessages(prev => ({
      ...prev,
      [selectedUser.clientId || selectedUser.id]: [...(prev[selectedUser.clientId || selectedUser.id] || []), tempMessage]
    }));

    const messageText = message.trim();
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/admin/chat/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientId: selectedUser.clientId || selectedUser.id,
          message: messageText
        })
      });

      const data = await response.json();
      
      if (data.success) {
        // Update the temporary message with the actual one from server
        setMessages(prev => ({
          ...prev,
          [selectedUser.clientId || selectedUser.id]: prev[selectedUser.clientId || selectedUser.id].map(msg => 
            msg.id === tempMessage.id ? data.data : msg
          )
        }));

        // Update user's last message in the sidebar
        setUsers(prev => prev.map(user => 
          user.id === selectedUser.id 
            ? { ...user, lastMessage: messageText, lastSeen: "now" }
            : user
        ));
      } else {
        // Remove the failed message
        setMessages(prev => ({
          ...prev,
          [selectedUser.clientId || selectedUser.id]: prev[selectedUser.clientId || selectedUser.id].filter(msg => msg.id !== tempMessage.id)
        }));
        alert("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // Remove the failed message
      setMessages(prev => ({
        ...prev,
        [selectedUser.clientId || selectedUser.id]: prev[selectedUser.clientId || selectedUser.id].filter(msg => msg.id !== tempMessage.id)
      }));
      alert("Failed to send message");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "sent":
        return <FiCheck className="w-3 h-3" />;
      case "delivered":
        return <FiCheckCircle className="w-3 h-3" />;
      case "read":
        return <FiCheckCircle className="w-3 h-3 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "offline":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="h-full flex bg-gray-50">
      {/* Users List */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Admin Chat</h1>
          <p className="text-gray-600 text-sm mt-1">Support your clients</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ff3f74]"></div>
            </div>
          ) : users.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p>No conversations yet</p>
            </div>
          ) : (
            users.map((user) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedUser?.id === user.id ? "bg-blue-50 border-blue-200" : ""
                }`}
                onClick={() => setSelectedUser(user)}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#ff3f74] to-[#e73568] rounded-full flex items-center justify-center">
                      <FiUser className="w-6 h-6 text-white" />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(user.status)} rounded-full border-2 border-white`}></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 truncate">{user.name}</h3>
                      <span className="text-xs text-gray-500">{user.lastSeen}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate mt-1">{user.lastMessage}</p>
                  </div>
                  {user.unread > 0 && (
                    <div className="w-5 h-5 bg-[#ff3f74] rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-medium">{user.unread}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4 flex items-center space-x-4">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-[#ff3f74] to-[#e73568] rounded-full flex items-center justify-center">
                  <FiUser className="w-5 h-5 text-white" />
                </div>
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(selectedUser.status)} rounded-full border-2 border-white`}></div>
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">{selectedUser.name}</h2>
                <p className="text-sm text-gray-500 flex items-center">
                  <FiClock className="w-3 h-3 mr-1" />
                  Last seen {selectedUser.lastSeen}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {(messages[selectedUser.clientId || selectedUser.id] || []).map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.senderType === "admin" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-xs lg:max-w-md ${
                    msg.senderType === "admin" 
                      ? "bg-gradient-to-r from-[#ff3f74] to-[#e73568] text-white" 
                      : "bg-white border border-gray-200 text-gray-900"
                  } rounded-2xl px-4 py-3 shadow-sm`}>
                    <p className="text-sm">{msg.message}</p>
                    <div className={`flex items-center justify-between mt-2 text-xs ${
                      msg.senderType === "admin" ? "text-white/70" : "text-gray-500"
                    }`}>
                      <span>{formatTime(msg.timestamp)}</span>
                      {msg.senderType === "admin" && (
                        <div className="ml-2">
                          {getStatusIcon(msg.status)}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="w-full resize-none border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#ff3f74] focus:border-transparent transition-colors"
                    rows="2"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-[#ff3f74] to-[#e73568] text-white rounded-lg hover:from-[#e73568] hover:to-[#ff3f74] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <FiSend className="w-4 h-4" />
                  <span>Send</span>
                </motion.button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-[#ff3f74] to-[#e73568] rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUser className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a conversation</h3>
              <p className="text-gray-600">Choose a client from the sidebar to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChat;
