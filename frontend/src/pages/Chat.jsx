import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Send, ArrowLeft, MessageSquare } from "lucide-react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  serverTimestamp,
  getDoc,
  doc,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import toast from "react-hot-toast";

const Chat = () => {
  const { projectId } = useParams();
  const { currentUser, userProfile } = useAuth();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  // Fetch project details
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectRef = doc(db, "projects", projectId);
        const snap = await getDoc(projectRef);
        if (snap.exists()) {
          setProject({ id: snap.id, ...snap.data() });
        } else {
          toast.error("Project not found");
        }
      } catch (error) {
        console.error("Error fetching project:", error);
        toast.error("Failed to load project details");
      }
    };

    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  // Listen to chat messages
  useEffect(() => {
    if (!projectId) return;

    const chatRef = collection(db, "chats");
    const chatQuery = query(
      chatRef,
      where("projectId", "==", projectId),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(
      chatQuery,
      (snapshot) => {
        const msgs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(msgs);
        setLoading(false);
      },
      (error) => {
        console.error("Error listening to chat:", error);
        toast.error("Failed to fetch messages");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [projectId]);

  // Auto-scroll when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !projectId) return;

    setSending(true);
    try {
      // Determine sender role
      const senderRole = userProfile?.role || (
        currentUser.email?.includes("admin") ? "admin" : "client"
      );

      await addDoc(collection(db, "chats"), {
        projectId,
        senderId: currentUser.uid,
        senderName: userProfile?.name || currentUser.displayName || currentUser.email,
        senderRole: senderRole,
        text: newMessage.trim(),
        createdAt: serverTimestamp(),
      });
      
      setNewMessage("");
      toast.success("Message sent");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Message failed to send. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isOwnMessage = (msg) => msg.senderId === currentUser?.uid;

  const isAdminMessage = (msg) => msg.senderRole === "admin";

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading chat...</span>
      </div>
    );
  }

  return (
    <div className="h-[100vh] lg:h-[calc(100vh-2rem)] max-h-[900px] flex flex-col bg-gray-50 lg:rounded-2xl lg:shadow-2xl lg:border lg:border-gray-200 lg:m-4 overflow-hidden">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link
              to={`/project/${projectId}`}
              className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 hover:scale-105"
            >
              <ArrowLeft className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Back</span>
            </Link>
            <div className="min-w-0 flex-1">
              <h1 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                {project?.title || "Project Chat"}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">
                Chat with the development team
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 px-3 py-1.5 rounded-full">
            <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
            <span className="text-xs sm:text-sm font-medium text-gray-700">
              {messages.length}
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 px-4 py-4 sm:px-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <MessageSquare className="h-16 w-16 sm:h-20 sm:w-20 text-gray-400 mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              No messages yet
            </h3>
            <p className="text-sm sm:text-base text-gray-500 max-w-sm">
              Start the conversation by sending a message below.
            </p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  isOwnMessage(msg) ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm transition-all duration-200 ${
                    isOwnMessage(msg)
                      ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                      : isAdminMessage(msg)
                      ? "bg-gradient-to-br from-green-500 to-green-600 text-white"
                      : "bg-white text-gray-900 border border-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1.5">
                    <div
                      className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
                        isOwnMessage(msg)
                          ? "bg-blue-700/50 text-white"
                          : isAdminMessage(msg)
                          ? "bg-green-700/50 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {msg.senderName?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <span
                      className={`text-xs sm:text-sm font-medium ${
                        isOwnMessage(msg)
                          ? "text-blue-100"
                          : isAdminMessage(msg)
                          ? "text-green-100"
                          : "text-gray-600"
                      }`}
                    >
                      {msg.senderName} {isAdminMessage(msg) && "(Admin)"}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base whitespace-pre-wrap break-words">
                    {msg.text}
                  </p>
                  <p
                    className={`text-xs mt-2 ${
                      isOwnMessage(msg)
                        ? "text-blue-200"
                        : isAdminMessage(msg)
                        ? "text-green-200"
                        : "text-gray-400"
                    }`}
                  >
                    {formatTime(msg.createdAt)}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 px-4 py-3 sm:px-6 sm:py-4 shadow-lg">
        <form onSubmit={sendMessage} className="flex space-x-2 sm:space-x-4">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 text-sm sm:text-base"
            rows="1"
            disabled={sending}
            style={{ minHeight: "44px", maxHeight: "120px" }}
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height =
                Math.min(e.target.scrollHeight, 120) + "px";
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage(e);
              }
            }}
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || sending}
            className="px-4 sm:px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {sending ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
            ) : (
              <Send className="h-4 w-4" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;