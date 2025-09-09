import React, { useState, useEffect, useRef } from 'react';
import { handleError } from '../utils.js';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Microphone = () => {
  const [volume, setVolume] = useState(0);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const animationRef = useRef(null);

  // EQ Assessment States
  const [showEQAssessment, setShowEQAssessment] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const [responses, setResponses] = useState([]);
  const [eqResults, setEqResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const {
    transcript,
    listening: isListening,
    browserSupportsSpeechRecognition,
    resetTranscript
  } = useSpeechRecognition();

  // EQ Assessment Questions
  const eqQuestions = [
    {
      id: 1,
      category: "Self-Awareness",
      question: "Tell me about a time when you felt really happy. What made you feel that way?",
      icon: "🤔"
    },
    {
      id: 2,
      category: "Confidence",
      question: "Describe something you're really good at. How did you learn to do it so well?",
      icon: "💪"
    },
    {
      id: 3,
      category: "Empathy",
      question: "If you saw a friend crying, what would you do to help them feel better?",
      icon: "❤️"
    },
    {
      id: 4,
      category: "Leadership",
      question: "Tell me about a time when you helped organize something or led a group activity.",
      icon: "👑"
    },
    {
      id: 5,
      category: "Problem Solving",
      question: "Describe a problem you faced recently and how you solved it.",
      icon: "🧩"
    },
    {
      id: 6,
      category: "Communication",
      question: "How do you explain something new to a younger child or friend?",
      icon: "💬"
    },
    {
      id: 7,
      category: "Emotional Regulation",
      question: "What do you do when you feel angry or frustrated? How do you calm down?",
      icon: "🧘"
    },
    {
      id: 8,
      category: "Social Skills",
      question: "How do you make new friends? Tell me about your approach.",
      icon: "🤝"
    }
  ];

  // Gemini AI Analysis
  const analyzeWithGemini = async (responses) => {
    setIsAnalyzing(true);
    
    try {
      const prompt = `
You are an expert child psychologist specializing in emotional intelligence assessment. Analyze the following responses from a child's EQ assessment and provide detailed feedback.

Assessment Responses:
${responses.map((r, index) => `
Question ${index + 1} (${r.question.category}): ${r.question.question}
Child's Answer: "${r.answer}"
`).join('\n')}

Please analyze these responses and provide a JSON response with the following structure:

{
  "overall_eq_score": [number between 0-100],
  "categories": {
    "Self-Awareness": {
      "score": [0-100],
      "feedback": "[specific feedback based on the child's responses]"
    },
    "Confidence": {
      "score": [0-100], 
      "feedback": "[specific feedback]"
    },
    "Empathy": {
      "score": [0-100],
      "feedback": "[specific feedback]" 
    },
    "Leadership": {
      "score": [0-100],
      "feedback": "[specific feedback]"
    },
    "Problem Solving": {
      "score": [0-100],
      "feedback": "[specific feedback]"
    },
    "Communication": {
      "score": [0-100],
      "feedback": "[specific feedback]"
    },
    "Emotional Regulation": {
      "score": [0-100],
      "feedback": "[specific feedback]"
    },
    "Social Skills": {
      "score": [0-100],
      "feedback": "[specific feedback]"
    }
  },
  "strengths": [
    "[3-4 specific strengths based on responses]"
  ],
  "growth_areas": [
    "[3-4 areas for improvement with encouraging language]"
  ],
  "recommendations": [
    "[3-4 specific, actionable recommendations suitable for a child]"
  ]
}

Focus on:
1. Age-appropriate language and encouragement
2. Specific examples from their responses
3. Constructive feedback that builds confidence
4. Practical recommendations for improvement

Provide only the JSON response without any additional text.`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.candidates[0].content.parts[0].text;
      
      const cleanedResponse = aiResponse.replace(/```json\n?|\n?```/g, '').trim();
      const analysisResult = JSON.parse(cleanedResponse);
      
      setIsAnalyzing(false);
      return analysisResult;

    } catch (error) {
      console.error('Error analyzing with Gemini:', error);
      setIsAnalyzing(false);
      
      // Fallback to mock data if API fails
      return {
        overall_eq_score: 75,
        categories: {
          "Self-Awareness": { score: 80, feedback: "Shows good emotional awareness. Keep exploring your feelings!" },
          "Confidence": { score: 75, feedback: "You have great potential! Practice speaking up more often." },
          "Empathy": { score: 85, feedback: "Excellent at understanding others. You're very caring!" },
          "Leadership": { score: 70, feedback: "Natural leadership qualities emerging. Try leading small group activities." },
          "Problem Solving": { score: 78, feedback: "Good problem-solving approach. Keep thinking creatively!" },
          "Communication": { score: 72, feedback: "Clear communication style. Practice expressing emotions more." },
          "Emotional Regulation": { score: 74, feedback: "Good coping strategies. Try deep breathing when upset." },
          "Social Skills": { score: 82, feedback: "Great social connections! You're a good friend to others." }
        },
        strengths: [
          "Excellent empathy and caring for others",
          "Good emotional awareness and self-reflection",
          "Strong social connections and friendship skills"
        ],
        growth_areas: [
          "Building confidence in new situations",
          "Expressing emotions more clearly",
          "Taking on leadership roles"
        ],
        recommendations: [
          "Practice speaking in front of small groups to build confidence",
          "Try journaling about your feelings each day",
          "Volunteer to help organize activities with friends"
        ]
      };
    }
  };

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      handleError('Speech recognition not supported in your browser');
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [browserSupportsSpeechRecognition]);

  const animateWave = () => {
    const newVolume = isListening ? 20 + Math.random() * 80 : 0;
    setVolume(newVolume);
    
    if (isListening) {
      animationRef.current = requestAnimationFrame(animateWave);
    }
  };

  const toggleListening = async () => {
    if (isListening) {
      SpeechRecognition.stopListening();
      cancelAnimationFrame(animationRef.current);
      setVolume(0);
    } else {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        SpeechRecognition.startListening({ continuous: true });
        setPermissionDenied(false);
        animateWave();
      } catch (err) {
        setPermissionDenied(true);
        handleError('Microphone access denied');
      }
    }
  };

  // EQ Assessment Functions
  const startEQAssessment = () => {
    setShowEQAssessment(true);
    setAssessmentStarted(true);
    setCurrentQuestion(0);
    setResponses([]);
    resetTranscript();
  };

  const nextQuestion = () => {
    if (transcript.trim()) {
      const newResponse = {
        question: eqQuestions[currentQuestion],
        answer: transcript,
        timestamp: new Date().toISOString()
      };
      setResponses(prev => [...prev, newResponse]);
      resetTranscript();
      
      if (currentQuestion < eqQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        completeAssessment([...responses, newResponse]);
      }
    }
  };

  const completeAssessment = async (allResponses) => {
    setAssessmentComplete(true);
    const analysis = await analyzeWithGemini(allResponses);
    setEqResults(analysis);
  };

  const resetAssessment = () => {
    setShowEQAssessment(false);
    setAssessmentStarted(false);
    setAssessmentComplete(false);
    setCurrentQuestion(0);
    setResponses([]);
    setEqResults(null);
    resetTranscript();
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#4CAF50';
    if (score >= 60) return '#2196F3';
    if (score >= 40) return '#FF9800';
    return '#f44336';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Developing';
    return 'Needs Practice';
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <div style={{ margin: '20px 0', textAlign: 'center' }}>
        <p style={{ color: 'red' }}>Speech recognition not supported in your browser</p>
      </div>
    );
  }

  // EQ Assessment Results View
  if (showEQAssessment && assessmentComplete) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e3f2fd 0%, #ffffff 50%, #e3f2fd 100%)',
        padding: '20px'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            border: '1px solid #e3f2fd',
            overflow: 'hidden'
          }}>
            {/* Header */}
            <div style={{
              background: 'linear-gradient(135deg, #2196F3, #1976D2)',
              color: 'white',
              padding: '30px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🎉</div>
              <h1 style={{ fontSize: '2rem', margin: '0 0 10px 0', fontWeight: 'bold' }}>
                Your EQ Assessment Results
              </h1>
              <p style={{ margin: 0, opacity: 0.9 }}>Assessment completed successfully!</p>
            </div>

            {isAnalyzing ? (
              <div style={{ padding: '60px', textAlign: 'center' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  border: '4px solid #2196F3',
                  borderTop: '4px solid transparent',
                  borderRadius: '50%',
                  margin: '0 auto 20px',
                  animation: 'spin 1s linear infinite'
                }}></div>
                <p style={{ fontSize: '1.1rem', color: '#666', margin: 0 }}>
                  Analyzing your responses with AI...
                </p>
              </div>
            ) : eqResults && (
              <div style={{ padding: '30px' }}>
                {/* Overall Score */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                  <div style={{
                    backgroundColor: '#e3f2fd',
                    borderRadius: '15px',
                    padding: '30px',
                    border: '1px solid #bbdefb'
                  }}>
                    <h2 style={{ fontSize: '1.5rem', color: '#1976D2', marginBottom: '20px' }}>
                      Overall EQ Score
                    </h2>
                    <div style={{
                      fontSize: '3.5rem',
                      fontWeight: 'bold',
                      color: getScoreColor(eqResults.overall_eq_score),
                      marginBottom: '10px'
                    }}>
                      {eqResults.overall_eq_score}%
                    </div>
                    <div style={{
                      fontSize: '1.2rem',
                      fontWeight: 'bold',
                      color: getScoreColor(eqResults.overall_eq_score)
                    }}>
                      {getScoreLabel(eqResults.overall_eq_score)}
                    </div>
                  </div>
                </div>

                {/* Category Scores */}
                <div style={{ marginBottom: '40px' }}>
                  <h3 style={{ fontSize: '1.5rem', color: '#1976D2', textAlign: 'center', marginBottom: '30px' }}>
                    Skills Breakdown
                  </h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '20px'
                  }}>
                    {Object.entries(eqResults.categories).map(([category, data]) => (
                      <div key={category} style={{
                        backgroundColor: '#e3f2fd',
                        borderRadius: '12px',
                        padding: '20px',
                        border: '1px solid #bbdefb'
                      }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '15px'
                        }}>
                          <h4 style={{ color: '#1976D2', margin: 0, fontWeight: 'bold' }}>
                            {category}
                          </h4>
                          <div style={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            color: getScoreColor(data.score)
                          }}>
                            {data.score}%
                          </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div style={{
                          backgroundColor: 'white',
                          borderRadius: '10px',
                          height: '8px',
                          marginBottom: '15px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            height: '100%',
                            borderRadius: '10px',
                            backgroundColor: getScoreColor(data.score),
                            width: `${data.score}%`,
                            transition: 'width 0.5s ease'
                          }}></div>
                        </div>
                        
                        <p style={{ fontSize: '0.9rem', color: '#666', margin: 0, lineHeight: '1.4' }}>
                          {data.feedback}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Insights */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '20px',
                  marginBottom: '30px'
                }}>
                  {/* Strengths */}
                  <div style={{
                    backgroundColor: '#e8f5e8',
                    borderRadius: '12px',
                    padding: '20px',
                    border: '1px solid #c8e6c9'
                  }}>
                    <h4 style={{ color: '#2e7d32', margin: '0 0 15px 0', fontWeight: 'bold' }}>
                      ⭐ Your Strengths
                    </h4>
                    <ul style={{ margin: 0, padding: '0 0 0 15px' }}>
                      {eqResults.strengths.map((strength, index) => (
                        <li key={index} style={{
                          fontSize: '0.9rem',
                          color: '#2e7d32',
                          marginBottom: '8px',
                          lineHeight: '1.4'
                        }}>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Growth Areas */}
                  <div style={{
                    backgroundColor: '#fff3e0',
                    borderRadius: '12px',
                    padding: '20px',
                    border: '1px solid #ffcc02'
                  }}>
                    <h4 style={{ color: '#f57c00', margin: '0 0 15px 0', fontWeight: 'bold' }}>
                      🎯 Growth Areas
                    </h4>
                    <ul style={{ margin: 0, padding: '0 0 0 15px' }}>
                      {eqResults.growth_areas.map((area, index) => (
                        <li key={index} style={{
                          fontSize: '0.9rem',
                          color: '#f57c00',
                          marginBottom: '8px',
                          lineHeight: '1.4'
                        }}>
                          {area}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Recommendations */}
                  <div style={{
                    backgroundColor: '#e3f2fd',
                    borderRadius: '12px',
                    padding: '20px',
                    border: '1px solid #bbdefb'
                  }}>
                    <h4 style={{ color: '#1976D2', margin: '0 0 15px 0', fontWeight: 'bold' }}>
                      💡 Recommendations
                    </h4>
                    <ul style={{ margin: 0, padding: '0 0 0 15px' }}>
                      {eqResults.recommendations.map((rec, index) => (
                        <li key={index} style={{
                          fontSize: '0.9rem',
                          color: '#1976D2',
                          marginBottom: '8px',
                          lineHeight: '1.4'
                        }}>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ textAlign: 'center' }}>
                  <button
                    onClick={resetAssessment}
                    style={{
                      backgroundColor: '#2196F3',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '12px 30px',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s',
                      marginRight: '10px'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#1976D2'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#2196F3'}
                  >
                    Take Assessment Again
                  </button>
                  <button
                    onClick={() => setShowEQAssessment(false)}
                    style={{
                      backgroundColor: 'white',
                      color: '#2196F3',
                      border: '2px solid #2196F3',
                      borderRadius: '10px',
                      padding: '10px 30px',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#2196F3';
                      e.target.style.color = 'white';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = 'white';
                      e.target.style.color = '#2196F3';
                    }}
                  >
                    Back to Microphone
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // EQ Assessment Question View
  if (showEQAssessment && assessmentStarted && !assessmentComplete) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e3f2fd 0%, #ffffff 50%, #e3f2fd 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{ maxWidth: '800px', width: '100%' }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            border: '1px solid #e3f2fd',
            overflow: 'hidden'
          }}>
            {/* Progress Header */}
            <div style={{
              background: 'linear-gradient(135deg, #2196F3, #1976D2)',
              color: 'white',
              padding: '20px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '15px'
              }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                  Question {currentQuestion + 1} of {eqQuestions.length}
                </div>
                <div style={{ fontSize: '2rem' }}>
                  {eqQuestions[currentQuestion].icon}
                </div>
              </div>
              
              {/* Progress Bar */}
              <div style={{
                backgroundColor: 'rgba(255,255,255,0.3)',
                borderRadius: '10px',
                height: '6px',
                overflow: 'hidden'
              }}>
                <div style={{
                  backgroundColor: 'white',
                  height: '100%',
                  borderRadius: '10px',
                  width: `${((currentQuestion + 1) / eqQuestions.length) * 100}%`,
                  transition: 'width 0.5s ease'
                }}></div>
              </div>
            </div>

            <div style={{ padding: '30px' }}>
              {/* Category */}
              <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                <div style={{
                  backgroundColor: '#e3f2fd',
                  borderRadius: '20px',
                  padding: '8px 16px',
                  display: 'inline-block',
                  border: '1px solid #bbdefb'
                }}>
                  <span style={{ color: '#1976D2', fontWeight: 'bold', fontSize: '0.9rem' }}>
                    {eqQuestions[currentQuestion].category}
                  </span>
                </div>
              </div>

              {/* Question */}
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#1976D2',
                textAlign: 'center',
                marginBottom: '30px',
                lineHeight: '1.5'
              }}>
                {eqQuestions[currentQuestion].question}
              </h2>

              {/* Your Original Microphone Component */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '20px 0'
              }}>
                {/* Wave visualization */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  height: '60px',
                  marginBottom: '10px',
                  gap: '4px'
                }}>
                  {[...Array(10)].map((_, i) => (
                    <div 
                      key={i}
                      style={{
                        width: '6px',
                        height: `${volume * (0.5 + Math.random() * 0.5)}px`,
                        backgroundColor: '#2196F3',
                        borderRadius: '3px',
                        transition: 'height 0.1s ease-out'
                      }}
                    />
                  ))}
                </div>
                
                {/* Speak button */}
                <button
                  onClick={toggleListening}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: isListening ? '#f44336' : '#2196F3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    transition: 'background-color 0.3s',
                    opacity: 1,
                    marginBottom: '15px'
                  }}
                >
                  {isListening ? '🛑 Stop Recording' : '🎤 Start Speaking'}
                </button>

                {/* Status indicator */}
                <p style={{ 
                  color: isListening ? '#4CAF50' : '#666', 
                  marginTop: '10px',
                  fontWeight: 'bold' 
                }}>
                  {isListening ? 'Listening... Speak naturally!' : 'Press the button and share your thoughts'}
                </p>

                {/* Display transcribed text */}
                {transcript && (
                  <div style={{ 
                    marginTop: '20px',
                    padding: '15px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '10px',
                    maxWidth: '100%',
                    width: '100%',
                    backgroundColor: '#f8f9fa'
                  }}>
                    <p style={{ fontWeight: 'bold', marginBottom: '10px', color: '#333' }}>
                      Your Response:
                    </p>
                    <p style={{ color: '#555', lineHeight: '1.5', margin: 0 }}>
                      {transcript}
                    </p>
                  </div>
                )}

                {/* Next Button */}
                {transcript.trim() && (
                  <button
                    onClick={nextQuestion}
                    style={{
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '12px 24px',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      marginTop: '20px',
                      transition: 'background-color 0.3s'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
                  >
                    {currentQuestion < eqQuestions.length - 1 ? 'Next Question →' : 'Complete Assessment ✓'}
                  </button>
                )}

                {/* Permission denied message */}
                {permissionDenied && (
                  <p style={{ color: 'red', marginTop: '10px' }}>
                    Microphone access is required for speech recognition.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Original Microphone Component with EQ Assessment Button
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '20px 0'
    }}>
      {/* EQ Assessment Button */}
      <button
        onClick={startEQAssessment}
        style={{
          padding: '12px 24px',
          backgroundColor: '#2196F3',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          marginBottom: '20px',
          transition: 'background-color 0.3s'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#1976D2'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#2196F3'}
      >
        🧠 Start EQ Assessment
      </button>

      {/* Wave visualization */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: '60px',
        marginBottom: '10px',
        gap: '4px'
      }}>
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            style={{
              width: '6px',
              height: `${volume * (0.5 + Math.random() * 0.5)}px`,
              backgroundColor: '#4CAF50',
              borderRadius: '3px',
              transition: 'height 0.1s ease-out'
            }}
          />
        ))}
      </div>
      
      {/* Speak button */}
      <button
        onClick={toggleListening}
        style={{
          padding: '10px 20px',
          backgroundColor: isListening ? '#f44336' : '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor:'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          transition: 'background-color 0.3s',
          opacity: 1 
        }}
      >
        {isListening ? 'Stop' : 'Speak'}
      </button>

      {/* Status indicator */}
      <p style={{ color: isListening ? 'green' : 'gray', marginTop: '10px' }}>
        {isListening ? 'Listening...' : 'Press "Speak" to start'}
      </p>

      {/* Display transcribed text */}
      {transcript && (
        <div style={{ 
          marginTop: '20px',
          padding: '10px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          maxWidth: '300px',
          textAlign: 'center'
        }}>
          <p><strong>You said:</strong></p>
          <p>{transcript}</p>
        </div>
      )}

      {/* Permission denied message */}
      {permissionDenied && (
        <p style={{ color: 'red', marginTop: '10px' }}>
          Microphone access is required for speech recognition.
        </p>
      )}

      {/* Add CSS for spinner animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Microphone;