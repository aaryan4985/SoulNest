// components/CameraModal.js
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CameraModal = ({ isOpen, onClose, onMoodDetected, selectedDate }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [stream, setStream] = useState(null);
    const [error, setError] = useState(null);

    // Emotion mapping for your mood options
    const emotionToMoodMap = {
        'happy': '😊',
        'neutral': '😐',
        'sad': '😢',
        'excited': '🤩',
        'tired': '😴'
    };

    useEffect(() => {
        if (isOpen) {
            startCamera();
        } else {
            stopCamera();
        }

        return () => stopCamera();
    }, [isOpen]);

    const startCamera = async () => {
        try {
            setError(null);
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: 640,
                    height: 480,
                    facingMode: 'user'
                }
            });

            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
        } catch (err) {
            console.error('Error accessing camera:', err);
            setError('Unable to access camera. Please check permissions.');
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    };

    const captureAndAnalyze = async () => {
        if (!videoRef.current || !canvasRef.current) return;

        setIsAnalyzing(true);

        try {
            const canvas = canvasRef.current;
            const video = videoRef.current;
            const ctx = canvas.getContext('2d');

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            ctx.drawImage(video, 0, 0);

            const blob = await new Promise(resolve => {
                canvas.toBlob(resolve, 'image/jpeg', 0.8);
            });

            const formData = new FormData();
            formData.append('image', blob, 'face.jpg');

            const response = await fetch('http://localhost:5000/emotion/analyze', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to analyze emotion');
            }

            const result = await response.json();

            if (result.success) {
                const detectedEmotion = result.data.emotion;
                const mood = emotionToMoodMap[detectedEmotion] || '😐';

                // Call the callback with detected mood
                onMoodDetected(selectedDate, mood);
                onClose();
            } else {
                throw new Error(result.message || 'Analysis failed');
            }

        } catch (error) {
            console.error('Error analyzing face:', error);
            setError('Failed to analyze expression. Please try again.');
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.9 }}
                        className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-xl font-semibold text-center text-gray-800 mb-4">
                            AI Mood Detection
                        </h3>

                        {error ? (
                            <div className="text-center">
                                <p className="text-red-600 mb-4">{error}</p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            setError(null);
                                            startCamera();
                                        }}
                                        className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                                    >
                                        Retry
                                    </button>
                                    <button
                                        onClick={onClose}
                                        className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="relative mb-4 rounded-lg overflow-hidden bg-gray-100">
                                    <video
                                        ref={videoRef}
                                        autoPlay
                                        playsInline
                                        muted
                                        className="w-full h-64 object-cover"
                                    />
                                    <canvas
                                        ref={canvasRef}
                                        style={{ display: 'none' }}
                                    />
                                </div>

                                <p className="text-center text-gray-600 mb-6 text-sm">
                                    Position your face in the camera and click "Analyze Mood"
                                </p>

                                <div className="flex gap-3">
                                    <button
                                        onClick={captureAndAnalyze}
                                        disabled={isAnalyzing}
                                        className="flex-1 py-3 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
                                    >
                                        {isAnalyzing ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Analyzing...
                                            </>
                                        ) : (
                                            '🤖 Analyze Mood'
                                        )}
                                    </button>

                                    <button
                                        onClick={onClose}
                                        className="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors font-medium"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CameraModal;