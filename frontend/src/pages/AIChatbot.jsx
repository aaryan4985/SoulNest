import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  MessageCircle,
  Brain,
  AlertTriangle,
  Smile,
  Frown,
  Meh,
  Heart,
  Shield,
  Clock,
  User
} from "lucide-react";
import GroupProjectSvg from '../assets/undraw_group-project_kow1.svg';
import SoulNestLogo from '../assets/SOULNEST.svg';

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
        return <Smile className="w-4 h-4 text-[#5ea85e]" />;
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
    <div className="min-h-screen bg-[#ffffeb] flex items-center justify-center px-4 py-4">
      <div className="max-w-7xl w-full">
        <div className="grid lg:grid-cols-2 gap-8 items-start h-full">
          
          {/* Left Side - SVG Illustration */}
          <div className="flex flex-col items-center justify-center order-2 lg:order-1 space-y-6">
            <div className="relative w-full max-w-lg">
              <img 
                src={GroupProjectSvg} 
                alt="SoulNest AI Wellness" 
                className="w-full h-auto drop-shadow-sm"
              />
            </div>
            
            {/* Crisis Resources - Moved here */}
            <div className="w-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-6 border border-[#5ea85e]/20">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-3 bg-[#5ea85e]/10 rounded-xl">
                  <AlertTriangle className="w-5 h-5 text-[#5ea85e]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#000000] mb-4 text-base">Crisis Resources</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-red-50 p-3 rounded-lg text-center border border-red-200">
                      <p className="font-semibold text-red-800">Emergency</p>
                      <p className="text-red-700">911</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg text-center border border-blue-200">
                      <p className="font-semibold text-blue-800">Crisis Line</p>
                      <p className="text-blue-700">988</p>
                    </div>
                    <div className="bg-[#5ea85e]/10 p-3 rounded-lg text-center border border-[#5ea85e]/30">
                      <p className="font-semibold text-[#5ea85e]">Text Support</p>
                      <p className="text-[#000000]/70">741741</p>
                    </div>
                    <div className="bg-[#5ea85e]/5 p-3 rounded-lg text-center border border-[#5ea85e]/20">
                      <p className="font-semibold text-[#000000]">Counselor</p>
                      <p className="text-[#000000]/70">School</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Chat Interface */}
          <div className="order-1 lg:order-2 flex flex-col">
            
            {/* Chat Header */}
            <div className="bg-[#5ea85e] rounded-t-3xl p-6 text-white">
              <div className="flex items-center justify-center">
                <img 
                  src={SoulNestLogo} 
                  alt="SoulNest" 
                  className="h-8 w-auto"
                />
              </div>
            </div>

            {/* Chat Messages Area */}
            <div className="bg-white/90 backdrop-blur-sm flex-1 min-h-[400px] max-h-[400px] overflow-y-auto p-6 border-x border-[#5ea85e]/20">
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-sm ${
                        message.sender === "user" ? "order-2" : "order-1"
                      }`}
                    >
                      <div
                        className={`p-5 rounded-2xl shadow-sm ${
                          message.sender === "user"
                            ? "bg-[#5ea85e] text-white rounded-br-lg"
                            : "bg-white/80 backdrop-blur-sm text-[#000000] rounded-bl-lg border border-[#5ea85e]/20"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.text}</p>

                        {/* Sentiment and Risk Indicators */}
                        {message.sender === "bot" && (
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#5ea85e]/20">
                            <div className="flex items-center space-x-2">
                              {getSentimentIcon(message.sentiment)}
                              <span className="text-xs text-[#000000]/70 capitalize">
                                {message.sentiment}
                              </span>
                            </div>

                            {message.riskLevel && message.riskLevel !== "low" && (
                              <div
                                className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getRiskLevelColor(
                                  message.riskLevel
                                )}`}
                              >
                                <AlertTriangle className="w-3 h-3" />
                                <span className="capitalize">
                                  {message.riskLevel} risk
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div
                        className={`text-xs text-gray-500 mt-1 ${
                          message.sender === "user" ? "text-right" : "text-left"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>

                    {/* Avatar */}
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.sender === "user"
                          ? "order-1 ml-2 bg-[#5ea85e]"
                          : "order-2 mr-2 bg-[#4a944a]"
                      }`}
                    >
                      {message.sender === "user" ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Brain className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>
                ))}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm p-5 rounded-2xl rounded-bl-lg border border-[#5ea85e]/20 shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-[#5ea85e] rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-[#5ea85e] rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-[#5ea85e] rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <span className="text-sm text-[#000000]/70 font-light">
                        SoulNest AI is thinking...
                      </span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Chat Input Area */}
            <div className="bg-white/90 backdrop-blur-sm rounded-b-3xl p-6 border-t border-[#5ea85e]/20">
              <div className="flex space-x-3">
                <div className="flex-1 relative">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Share what's on your mind..."
                    className="w-full p-4 bg-white/80 backdrop-blur-sm rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-[#5ea85e]/50 focus:bg-white border border-[#5ea85e]/30 transition-all duration-300 placeholder-[#000000]/40 text-[#000000]"
                    rows="1"
                    style={{ minHeight: "50px", maxHeight: "100px" }}
                  />
                </div>

                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="px-5 py-4 bg-[#5ea85e] text-white rounded-2xl hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] flex items-center space-x-2 border border-transparent hover:border-white/20"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline font-medium text-sm">Send</span>
                </button>
              </div>

              <p className="text-xs text-[#000000]/60 mt-4 text-center font-light">
                💡 SoulNest AI is here to listen without judgment. Be open about your feelings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;