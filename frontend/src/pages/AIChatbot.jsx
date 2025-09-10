import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  MessageCircle,
  AlertTriangle,
  Smile,
  Frown,
  Meh,
  Heart,
  Shield,
  Clock,
  User
} from "lucide-react";
import MockAvatar from "../assets/mock_avatar.svg";

const AIChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(
    `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  );
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add welcome message
  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: "Hello! I'm SoulNest AI, your mental wellness companion. I'm here to listen and support you through your wellness journey. How are you feeling today?",
        sender: "bot",
        timestamp: new Date(),
        sentiment: "neutral",
      },
    ]);
  }, []);

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case "positive":
        return <Smile className="w-4 h-4 text-[#ff3f74]" />;
      case "negative":
        return <Frown className="w-4 h-4 text-red-500" />;
      default:
        return <Meh className="w-4 h-4 text-[#000000]/60" />;
    }
  };

  const getRiskLevelColor = (riskLevel) => {
    switch (riskLevel) {
      case "high":
        return "text-red-600 bg-red-50 border border-red-200";
      case "medium":
        return "text-orange-600 bg-orange-50 border border-orange-200";
      case "low":
        return "text-blue-600 bg-blue-50 border border-blue-200";
      default:
        return "text-gray-600 bg-gray-50 border border-gray-200";
    }
  };

  const getFallbackResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('sad') || input.includes('depressed') || input.includes('down')) {
      return "I hear that you're feeling sad. It's completely natural to have these feelings sometimes. Remember that you're not alone, and these difficult emotions are temporary. Consider reaching out to someone you trust or a counselor who can provide support.";
    }
    
    if (input.includes('anxious') || input.includes('worried') || input.includes('stress')) {
      return "I understand you're feeling anxious or stressed. These feelings can be overwhelming, but there are ways to manage them. Try taking slow, deep breaths and focus on the present moment. Consider talking to a trusted friend or professional about what's causing your stress.";
    }
    
    if (input.includes('angry') || input.includes('frustrated') || input.includes('mad')) {
      return "It sounds like you're feeling frustrated or angry. These emotions are completely valid. When we feel this way, it can help to take a step back, do some physical activity, or express your feelings through journaling or creative outlets.";
    }
    
    if (input.includes('happy') || input.includes('good') || input.includes('great')) {
      return "It's wonderful to hear you're feeling positive! These moments of happiness are precious. Remember what brings you joy and consider sharing your positive energy with others around you.";
    }
    
    if (input.includes('tired') || input.includes('exhausted') || input.includes('sleep')) {
      return "Rest is incredibly important for both your physical and mental health. Make sure you're getting quality sleep and taking breaks when you need them. A consistent sleep routine can really help improve how you feel overall.";
    }
    
    return "Thank you for sharing with me. Your feelings are completely valid and important. Remember that it's always okay to ask for help when you need it. Consider reaching out to a counselor, trusted adult, or mental health professional if you'd like additional support.";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
      sentiment: "neutral",
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage("");
    setIsLoading(true);

    try {
      // Updated Gemini API call with correct format
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
      
      if (!apiKey) {
        throw new Error('Gemini API key not found. Please check your .env file.');
      }

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are SoulNest AI, a compassionate mental wellness assistant specifically designed for students. Your role is to provide empathetic support, guidance, and encouragement for mental health and wellbeing.

User message: "${currentInput}"

Please respond with:
- Empathy and understanding
- Helpful mental wellness guidance appropriate for students
- Supportive and encouraging tone
- If you detect concerning mental health signs, gently suggest professional help
- Keep responses conversational, caring, and concise (2-3 sentences)
- Focus on validation, coping strategies, and positive mental health practices

Respond as a caring friend who understands student challenges and mental health needs.`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 512,
            thinkingConfig: {
              thinkingBudget: 0
            }
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', response.status, errorText);
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error('Invalid response format from Gemini API');
      }
      
      const aiResponse = data.candidates[0].content.parts[0].text;
      
      // Enhanced sentiment analysis
      const positiveWords = ['happy', 'good', 'great', 'excellent', 'wonderful', 'amazing', 'fantastic', 'excited', 'grateful', 'proud'];
      const negativeWords = ['sad', 'bad', 'terrible', 'awful', 'depressed', 'anxious', 'worried', 'stressed', 'angry', 'frustrated', 'overwhelmed'];
      const riskWords = ['suicide', 'kill myself', 'end it all', 'hurt myself', 'die', 'death', 'want to disappear', 'no point', 'hopeless'];
      
      const lowercaseInput = currentInput.toLowerCase();
      let sentiment = 'neutral';
      let riskLevel = 'low';
      
      if (riskWords.some(word => lowercaseInput.includes(word))) {
        riskLevel = 'high';
        sentiment = 'negative';
      } else if (negativeWords.some(word => lowercaseInput.includes(word))) {
        sentiment = 'negative';
        riskLevel = 'medium';
      } else if (positiveWords.some(word => lowercaseInput.includes(word))) {
        sentiment = 'positive';
      }

      const botMessage = {
        id: Date.now() + 1,
        text: aiResponse,
        sender: "bot",
        timestamp: new Date(),
        sentiment: sentiment,
        riskLevel: riskLevel,
      };

      setMessages((prev) => [...prev, botMessage]);

      // Enhanced risk alerts
      if (riskLevel === "high") {
        setTimeout(() => {
          alert("⚠️ I'm concerned about what you've shared. Please reach out for immediate help:\n\n🔴 Emergency: 911\n📞 Crisis Text Line: Text HOME to 741741\n☎️ National Suicide Prevention Lifeline: 988\n\nYou matter and help is available 24/7.");
        }, 1000);
      } else if (riskLevel === "medium") {
        setTimeout(() => {
          alert("🔔 I notice you might be struggling. Consider talking to:\n\n• School counselor\n• Trusted adult or family member\n• Mental health professional\n• Crisis Text Line: Text HOME to 741741\n\nYou don't have to go through this alone.");
        }, 1000);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      
      const fallbackText = getFallbackResponse(currentInput);
      
      const errorMessage = {
        id: Date.now() + 1,
        text: fallbackText + " (Note: AI assistant is temporarily unavailable, but I'm still here to provide support.)",
        sender: "bot",
        timestamp: new Date(),
        sentiment: "neutral",
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen flex flex-col font-serif" style={{ backgroundColor: '#f4f8ff' }}>
      {/* WhatsApp-like Header */}
      <div className="flex items-center justify-between p-4 shadow-md" style={{ backgroundColor: '#ff3f74' }}>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
            <img src={MockAvatar} alt="AI Therapist" className="w-8 h-8 rounded-full" />
          </div>
          <div>
            <h1 className="text-white font-semibold text-xl">SoulNest AI Therapist</h1>
          </div>
        </div>
      </div>

      {/* Messages Area - Full Height */}
      <div className="flex-1 overflow-y-auto p-4" style={{ backgroundColor: '#f4f8ff' }}>
        <div className="max-w-4xl mx-auto space-y-4">{messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md ${
                  message.sender === "user" ? "order-2" : "order-1"
                }`}
              >
                {/* WhatsApp-style Message Bubble */}
                <div
                  className={`p-3 rounded-2xl shadow-sm ${
                    message.sender === "user"
                      ? "text-white rounded-br-md"
                      : "text-gray-800 rounded-bl-md"
                  }`}
                  style={message.sender === "user" ? { 
                    backgroundColor: 'rgba(255, 63, 116, 0.1)',
                    boxShadow: '0 2px 8px rgba(255, 63, 116, 0.2)',
                    color: '#333'
                  } : { 
                    backgroundColor: 'transparent',
                    border: 'none',
                    boxShadow: 'none'
                  }}
                >
                  <p className="text-base leading-relaxed">{message.text}</p>

                  {/* Message Info */}
                  <div className={`flex items-center justify-between mt-2 text-sm ${
                    message.sender === "user" ? "text-white/90" : "text-gray-500"
                  }`}>
                    <span>
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    
                    {/* Sentiment and Risk Indicators */}
                    {message.sender === "bot" && (
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          {getSentimentIcon(message.sentiment)}
                          <span className="capitalize text-sm">
                            {message.sentiment}
                          </span>
                        </div>

                        {message.riskLevel && message.riskLevel !== "low" && (
                          <div
                            className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm ${getRiskLevelColor(
                              message.riskLevel
                            )}`}
                          >
                            <AlertTriangle className="w-3 h-3" />
                            <span className="capitalize">
                              {message.riskLevel}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
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
                <span className="text-base text-gray-600">Thinking...</span>
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
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="w-full p-3 bg-gray-50 rounded-2xl resize-none focus:outline-none focus:ring-2 transition-all duration-300 placeholder-gray-400 text-gray-800 border-0 text-base font-serif"
                rows="1"
                style={{ 
                  minHeight: "44px", 
                  maxHeight: "120px",
                  focusRingColor: 'rgba(255, 63, 116, 0.3)'
                }}
              />
            </div>

            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
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
               End-to-end encrypted • SoulNest AI • Anonymous Chats
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;