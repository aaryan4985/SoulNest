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
      question: "Think of a problem you solved recently. How did you figure out what to do?",
      icon: "🧩"
    }
  ];

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          setPermissionDenied(false);
          
          const audioContext = new (window.AudioContext || window.webkitAudioContext)();
          const analyser = audioContext.createAnalyser();
          const microphone = audioContext.createMediaStreamSource(stream);
          const dataArray = new Uint8Array(analyser.frequencyBinCount);

          analyser.smoothingTimeConstant = 0.8;
          analyser.fftSize = 1024;
          microphone.connect(analyser);

          const updateVolume = () => {
            analyser.getByteFrequencyData(dataArray);
            const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
            setVolume(average);
            animationRef.current = requestAnimationFrame(updateVolume);
          };

          updateVolume();
        })
        .catch(err => {
          console.error('Error accessing microphone:', err);
          setPermissionDenied(true);
        });
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // EQ Assessment Functions
  const handleStartAssessment = () => {
    setShowEQAssessment(true);
    setAssessmentStarted(true);
    setCurrentQuestion(0);
    setResponses([]);
    setEqResults(null);
    setAssessmentComplete(false);
  };

  const handleAnswer = (answer) => {
    const newResponses = [...responses, {
      question: eqQuestions[currentQuestion].question,
      category: eqQuestions[currentQuestion].category,
      answer: answer
    }];
    setResponses(newResponses);

    if (currentQuestion < eqQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setAssessmentComplete(true);
      analyzeEQResults(newResponses);
    }
  };

  const analyzeEQResults = async (allResponses) => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('http://localhost:5001/api/eq-assessment/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ responses: allResponses }),
      });

      if (response.ok) {
        const results = await response.json();
        setEqResults(results);
      } else {
        console.error('Failed to analyze EQ assessment');
      }
    } catch (error) {
      console.error('Error analyzing EQ assessment:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAssessment = () => {
    setAssessmentStarted(false);
    setAssessmentComplete(false);
    setCurrentQuestion(0);
    setResponses([]);
    setEqResults(null);
  };

  const calculateBarHeight = () => {
    return Math.max(10, Math.min(volume * 2, 200));
  };

  const getVolumeColor = () => {
    if (volume < 50) return '#4CAF50';
    if (volume < 100) return '#FFC107';
    if (volume < 150) return '#FF9800';
    return '#F44336';
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  // EQ Assessment Results View (Compact for inline display)
  if (showEQAssessment && assessmentComplete && eqResults) {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '8px',
        overflow: 'auto'
      }}>
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.95)',
            borderRadius: '8px',
            padding: '8px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto'
          }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '8px' }}>
              <h2 style={{ 
                fontSize: '1rem', 
                color: '#2E7D32', 
                margin: '0 0 4px 0',
                fontWeight: 'bold'
              }}>
                🎯 Your EQ Assessment Results
              </h2>
              <p style={{ 
                fontSize: '0.7rem', 
                color: '#666', 
                margin: '0',
                lineHeight: '1.2'
              }}>
                Great job completing the assessment!
              </p>
            </div>

            {/* Results Content */}
            <div style={{ 
              flex: 1, 
              overflow: 'auto',
              fontSize: '0.7rem'
            }}>
              {/* Summary */}
              {eqResults.summary && (
                <div style={{ 
                  backgroundColor: '#f0f8ff', 
                  borderRadius: '6px', 
                  padding: '6px', 
                  marginBottom: '8px',
                  border: '1px solid #e3f2fd'
                }}>
                  <h3 style={{ fontSize: '0.8rem', color: '#1976D2', marginBottom: '4px', margin: '0 0 4px 0' }}>📊 Summary</h3>
                  <p style={{ fontSize: '0.6rem', margin: '0', lineHeight: '1.3', color: '#333' }}>
                    {eqResults.summary}
                  </p>
                </div>
              )}

              {/* Strengths */}
              {eqResults.strengths && (
                <div style={{ marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '0.8rem', color: '#4CAF50', marginBottom: '4px', margin: '0 0 4px 0' }}>💪 Strengths</h3>
                  <div style={{ backgroundColor: '#e8f5e8', borderRadius: '6px', padding: '6px' }}>
                    {eqResults.strengths.map((strength, index) => (
                      <div key={index} style={{ 
                        fontSize: '0.6rem', 
                        marginBottom: '2px',
                        lineHeight: '1.2'
                      }}>
                        • {strength}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Growth Areas */}
              {eqResults.growth_areas && (
                <div style={{ marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '0.8rem', color: '#FF9800', marginBottom: '4px', margin: '0 0 4px 0' }}>🌱 Growth Areas</h3>
                  <div style={{ backgroundColor: '#fff3e0', borderRadius: '6px', padding: '6px' }}>
                    {eqResults.growth_areas.map((area, index) => (
                      <div key={index} style={{ 
                        fontSize: '0.6rem', 
                        marginBottom: '2px',
                        lineHeight: '1.2'
                      }}>
                        • {area}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {eqResults.recommendations && (
                <div style={{ marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '0.8rem', color: '#2196F3', marginBottom: '4px', margin: '0 0 4px 0' }}>📋 Recommendations</h3>
                  <div style={{ backgroundColor: '#e3f2fd', borderRadius: '6px', padding: '6px' }}>
                    {eqResults.recommendations.map((rec, index) => (
                      <div key={index} style={{ 
                        fontSize: '0.6rem', 
                        marginBottom: '2px',
                        lineHeight: '1.2'
                      }}>
                        • {rec}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Back Button */}
            <div style={{ textAlign: 'center', marginTop: '8px' }}>
              <button
                onClick={() => {
                  setShowEQAssessment(false);
                  setAssessmentStarted(false);
                  setAssessmentComplete(false);
                  setCurrentQuestion(0);
                  setResponses([]);
                  setEqResults(null);
                }}
                style={{
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  fontSize: '0.7rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#5a6268'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#6c757d'}
              >
                Back to Microphone
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // EQ Assessment Question View (Compact for inline display)
  if (showEQAssessment && assessmentStarted && !assessmentComplete) {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '8px'
      }}>
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.95)',
          borderRadius: '8px',
          padding: '8px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Progress */}
          <div style={{ marginBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#2196F3' }}>
                Question {currentQuestion + 1} of {eqQuestions.length}
              </span>
              <span style={{ fontSize: '0.6rem', color: '#666' }}>
                {eqQuestions[currentQuestion].category}
              </span>
            </div>
            <div style={{ 
              width: '100%', 
              height: '4px', 
              backgroundColor: '#e0e0e0', 
              borderRadius: '2px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${((currentQuestion + 1) / eqQuestions.length) * 100}%`,
                height: '100%',
                backgroundColor: '#2196F3',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>

          {/* Question */}
          <div style={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center',
            textAlign: 'center',
            padding: '8px'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>
              {eqQuestions[currentQuestion].icon}
            </div>
            <h3 style={{ 
              fontSize: '0.8rem', 
              color: '#333', 
              marginBottom: '12px',
              lineHeight: '1.3',
              margin: '0 0 12px 0'
            }}>
              {eqQuestions[currentQuestion].question}
            </h3>

            {/* Voice Input */}
            <div style={{ marginBottom: '12px' }}>
              <button
                onClick={() => {
                  if (isListening) {
                    SpeechRecognition.stopListening();
                  } else {
                    resetTranscript();
                    SpeechRecognition.startListening({ continuous: true });
                  }
                }}
                style={{
                  backgroundColor: isListening ? '#f44336' : '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  transition: 'all 0.3s'
                }}
              >
                {isListening ? '⏹️' : '🎤'}
              </button>
            </div>

            {/* Transcript */}
            {transcript && (
              <div style={{
                backgroundColor: '#f5f5f5',
                borderRadius: '6px',
                padding: '8px',
                marginBottom: '8px',
                maxHeight: '60px',
                overflow: 'auto'
              }}>
                <p style={{ 
                  fontSize: '0.7rem', 
                  margin: '0',
                  lineHeight: '1.3',
                  color: '#333'
                }}>
                  {transcript}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              {transcript && (
                <button
                  onClick={() => handleAnswer(transcript)}
                  style={{
                    backgroundColor: '#2196F3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '0.7rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#1976D2'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#2196F3'}
                >
                  Submit Answer
                </button>
              )}
              <button
                onClick={() => setShowEQAssessment(false)}
                style={{
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  fontSize: '0.7rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#5a6268'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#6c757d'}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Microphone Interface
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#1a1a2e',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '500px',
        width: '100%'
      }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          marginBottom: '10px',
          background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold'
        }}>
          🎤 SoulNest Microphone
        </h1>
        
        <p style={{ 
          fontSize: '1.2rem', 
          marginBottom: '40px', 
          opacity: 0.9,
          lineHeight: '1.6'
        }}>
          Express yourself and discover your emotional intelligence
        </p>

        {permissionDenied ? (
          <div style={{
            backgroundColor: 'rgba(244, 67, 54, 0.1)',
            border: '2px solid #f44336',
            borderRadius: '15px',
            padding: '30px',
            marginBottom: '30px'
          }}>
            <h3 style={{ color: '#f44336', marginBottom: '15px' }}>Microphone Access Denied</h3>
            <p style={{ marginBottom: '20px', fontSize: '1rem' }}>
              Please allow microphone access to use this feature. 
              Check your browser settings and refresh the page.
            </p>
            <button 
              onClick={() => window.location.reload()}
              style={{
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                padding: '12px 24px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
            >
              Refresh Page
            </button>
          </div>
        ) : (
          <>
            {/* Volume Visualization */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              height: '200px',
              marginBottom: '40px',
              gap: '3px'
            }}>
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: '4px',
                    height: `${Math.max(10, calculateBarHeight() * Math.random())}px`,
                    backgroundColor: getVolumeColor(),
                    borderRadius: '2px',
                    transition: 'height 0.1s ease',
                    opacity: 0.7 + (volume / 200) * 0.3
                  }}
                />
              ))}
            </div>

            {/* Voice Status */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '15px',
              padding: '20px',
              marginBottom: '30px',
              backdropFilter: 'blur(10px)'
            }}>
              <h3 style={{ marginBottom: '15px', fontSize: '1.3rem' }}>
                Voice Status: {isListening ? '🔴 Listening...' : '⚪ Ready'}
              </h3>
              <p style={{ fontSize: '1rem', opacity: 0.8 }}>
                Volume Level: {Math.round(volume)}
              </p>
            </div>

            {/* Control Buttons */}
            <div style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '30px'
            }}>
              <button
                onClick={() => {
                  if (isListening) {
                    SpeechRecognition.stopListening();
                  } else {
                    SpeechRecognition.startListening();
                  }
                }}
                style={{
                  backgroundColor: isListening ? '#f44336' : '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '15px 30px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  minWidth: '150px'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                {isListening ? '🛑 Stop' : '🎤 Start'}
              </button>

              <button
                onClick={handleStartAssessment}
                style={{
                  backgroundColor: '#2196F3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '15px 30px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  minWidth: '150px'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
                  e.target.style.backgroundColor = '#1976D2';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                  e.target.style.backgroundColor = '#2196F3';
                }}
              >
                🧠 EQ Assessment
              </button>
            </div>

            {/* Transcript Display */}
            {transcript && (
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '15px',
                padding: '20px',
                backdropFilter: 'blur(10px)',
                maxWidth: '100%',
                wordWrap: 'break-word'
              }}>
                <h4 style={{ marginBottom: '15px', color: '#4ecdc4' }}>Your Speech:</h4>
                <p style={{ 
                  fontSize: '1rem', 
                  lineHeight: '1.6',
                  margin: 0 
                }}>
                  {transcript}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Microphone;
