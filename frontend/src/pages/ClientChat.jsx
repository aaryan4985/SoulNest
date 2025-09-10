import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiSend, FiUser, FiClock, FiCheck, FiCheckCircle, FiPhone, FiVideo } from "react-icons/fi";
import { Send } from "lucide-react";
import { useStore } from "../store/userStore";
import MockAvatar from "../assets/mock_avatar.svg";

const ClientChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [adminOnline, setAdminOnline] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { user } = useStore();
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch chat history on component mount
  useEffect(() => {
    fetchChatHistory();
    // Set up polling to refresh chat history every 3 seconds
    const interval = setInterval(fetchChatHistory, 3000);
    return () => clearInterval(interval);
  }, []);

  const fetchChatHistory = async () => {
    try {
      if (!loading) setIsRefreshing(true);
      
      const response = await fetch(`http://localhost:5000/client/chat/history/${user?.uid || 'demo-user'}`);
      const data = await response.json();
      
      if (data.success) {
        // Only update if there are new messages to avoid disrupting user typing
        setMessages(prevMessages => {
          const newMessages = data.data;
          if (newMessages.length !== prevMessages.length) {
            return newMessages;
          }
          // Check if the last message is different
          if (newMessages.length > 0 && prevMessages.length > 0) {
            const lastNew = newMessages[newMessages.length - 1];
            const lastPrev = prevMessages[prevMessages.length - 1];
            if (lastNew.id !== lastPrev.id || lastNew.message !== lastPrev.message) {
              return newMessages;
            }
          }
          return prevMessages;
        });
      } else if (!loading) {
        // Only initialize with welcome message if we're not already loading
        setMessages([
          {
            id: 1,
            senderId: "admin",
            senderType: "admin",
            message: "Hello! I'm here to help you with any questions or concerns you might have. How are you feeling today?",
            timestamp: new Date(),
            status: "read"
          }
        ]);
      }
      if (loading) setLoading(false);
      setIsRefreshing(false);
    } catch (error) {
      console.error("Error fetching chat history:", error);
      // Fallback to welcome message only if we're still loading
      if (loading) {
        setMessages([
          {
            id: 1,
            senderId: "admin",
            senderType: "admin",
            message: "Hello! I'm here to help you with any questions or concerns you might have. How are you feeling today?",
            timestamp: new Date(),
            status: "read"
          }
        ]);
        setLoading(false);
      }
      setIsRefreshing(false);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const tempMessage = {
      id: Date.now(),
      senderId: user?.uid || 'demo-user',
      senderType: "client",
      message: message.trim(),
      timestamp: new Date(),
      status: "sending"
    };

    // Optimistically add message to UI
    setMessages(prev => [...prev, tempMessage]);
    const messageText = message.trim();
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/client/chat/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientId: user?.uid || 'demo-user',
          clientName: user?.displayName || user?.email || 'Anonymous User',
          message: messageText
        })
      });

      const data = await response.json();
      
      if (data.success) {
        // Update the temporary message with the actual one from server
        setMessages(prev => prev.map(msg => 
          msg.id === tempMessage.id ? { ...data.data, status: "sent" } : msg
        ));
      } else {
        // Remove the failed message
        setMessages(prev => prev.filter(msg => msg.id !== tempMessage.id));
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // Remove the failed message
      setMessages(prev => prev.filter(msg => msg.id !== tempMessage.id));
      alert("Failed to send message. Please check your connection.");
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
      case "sending":
        return <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>;
      case "sent":
        return <FiCheck className="w-3 h-3" />;
      case "delivered":
        return <FiCheckCircle className="w-3 h-3" />;
      case "read":
        return <FiCheckCircle className="w-3 h-3 text-blue-300" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff3f74] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading chat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col font-serif" style={{ backgroundColor: '#f4f8ff' }}>
      {/* WhatsApp-like Header */}
      <div className="flex items-center justify-between p-4 shadow-md" style={{ backgroundColor: '#ff3f74' }}>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
            <img src={MockAvatar} alt="Support Chat" className="w-8 h-8 rounded-full" />
          </div>
          <div>
            <h1 className="text-white font-semibold text-xl">Support Chat</h1>
            <p className="text-white/80 text-sm flex items-center">
              {adminOnline ? "Online now" : "Offline"}
              {isRefreshing && (
                <span className="ml-2 flex items-center">
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                  <span className="text-xs">Checking...</span>
                </span>
              )}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            className="p-2 text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/10"
            title="Voice Call"
          >
            <FiPhone className="w-5 h-5" />
          </button>
          <button
            className="p-2 text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/10"
            title="Video Call"
          >
            <FiVideo className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Area - Full Height */}
      <div className="flex-1 overflow-y-auto p-4" style={{ backgroundColor: '#f4f8ff' }}>
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.senderType === "client" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md ${
                  msg.senderType === "client" ? "order-2" : "order-1"
                }`}
              >
                {/* WhatsApp-style Message Bubble */}
                <div
                  className={`p-3 rounded-2xl shadow-sm ${
                    msg.senderType === "client"
                      ? "text-gray-800 rounded-br-md"
                      : "text-gray-800 rounded-bl-md"
                  }`}
                  style={msg.senderType === "client" ? { 
                    backgroundColor: 'rgba(255, 63, 116, 0.1)',
                    boxShadow: '0 2px 8px rgba(255, 63, 116, 0.2)',
                    color: '#333'
                  } : { 
                    backgroundColor: 'transparent',
                    border: 'none',
                    boxShadow: 'none'
                  }}
                >
                  <p className="text-base leading-relaxed">{msg.message}</p>

                  {/* Message Info */}
                  <div className={`flex items-center justify-between mt-2 text-sm ${
                    msg.senderType === "client" ? "text-gray-600" : "text-gray-500"
                  }`}>
                    <span>
                      {formatTime(msg.timestamp)}
                    </span>
                    {msg.senderType === "client" && (
                      <div className="ml-2">
                        {getStatusIcon(msg.status)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-3 p-3 rounded-2xl rounded-bl-md" style={{ backgroundColor: 'transparent' }}>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#ff3f74' }}></div>
                  <div
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{ backgroundColor: '#ff3f74', animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{ backgroundColor: '#ff3f74', animationDelay: "0.2s" }}
                  ></div>
                </div>
                <span className="text-base text-gray-600">Admin is typing...</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* WhatsApp-style Input Area */}
      <div className="border-t p-4 bg-white" style={{ borderColor: 'rgba(255, 63, 116, 0.1)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="w-full p-3 bg-gray-50 rounded-2xl resize-none focus:outline-none focus:ring-2 transition-all duration-300 placeholder-gray-400 text-gray-800 border-0 text-base font-serif"
                rows="1"
                style={{ 
                  minHeight: "44px", 
                  maxHeight: "120px",
                  focusRingColor: 'rgba(255, 63, 116, 0.3)'
                }}
                disabled={!adminOnline && false} // Allow sending even when offline
              />
            </div>

            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="p-3 text-white rounded-full hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 flex items-center justify-center min-w-[44px] min-h-[44px]"
              style={{ 
                backgroundColor: '#ff3f74',
                boxShadow: '0 2px 8px rgba(255, 63, 116, 0.3)'
              }}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          {/* Status text */}
          <div className="flex items-center justify-center mt-2">
            <p className="text-sm text-gray-400 font-medium">
              End-to-end encrypted • Peer to Peer Chat • Anonymous Support
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientChat;
