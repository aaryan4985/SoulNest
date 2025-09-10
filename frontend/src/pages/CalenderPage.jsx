import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CameraModal from "../components/CameraModal";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../config/firebase";
import { useStore } from "../store/userStore";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Import mood images
import smileImg from "../assets/smile.png";
import neutralImg from "../assets/neutral.png";
import sadImg from "../assets/sadface.png";
import excitedImg from "../assets/excited.png";
import angryImg from "../assets/angry.png";

const moodOptions = [
  { emoji: smileImg, label: "Happy", color: "from-[#ff3f74]/20 to-[#e73568]/30", isImage: true },
  { emoji: neutralImg, label: "Neutral", color: "from-gray-100 to-gray-200", isImage: true },
  { emoji: sadImg, label: "Sad", color: "from-blue-100 to-blue-200", isImage: true },
  { emoji: excitedImg, label: "Excited", color: "from-[#ff3f74]/30 to-[#e73568]/40", isImage: true },
  { emoji: angryImg, label: "Angry", color: "from-red-100 to-red-200", isImage: true },
];

export default function CalendarCard() {
  const [moods, setMoods] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCamera, setShowCamera] = useState(false);
  const { user } = useStore();

  useEffect(() => {
    const fetchMoods = async () => {
      if (!user) return;
      setIsLoading(true);
      try {
        const docRef = doc(db, "moods", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setMoods(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching moods:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMoods();
  }, [user]);

  useEffect(() => {
    const saveMoods = async () => {
      if (!user) return;
      try {
        const docRef = doc(db, "moods", user.uid);
        await setDoc(docRef, moods, { merge: true });
      } catch (error) {
        console.error("Error saving moods:", error);
      }
    };
    if (user) saveMoods();
  }, [moods, user]);

  const setMoodForDay = (date, mood) => {
    const key = date.toISOString().split("T")[0];
    setMoods((prev) => ({ ...prev, [key]: mood }));
    setSelectedDate(null);
  };

  const handleCameraDetection = (date, detectedMood) => {
    setMoodForDay(date, detectedMood);
    setShowCamera(false);
  };

  const openCameraModal = () => {
    setShowCamera(true);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowCamera(true);
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const key = date.toISOString().split("T")[0];
      const mood = moods[key];
      
      if (mood) {
        // Check if mood is an image path or find the corresponding mood data
        let moodData;
        if (typeof mood === 'string' && mood.includes('.png')) {
          // If it's an image path, find the mood data by image
          moodData = moodOptions.find(option => option.emoji === mood);
        } else {
          // For backwards compatibility with emoji strings
          moodData = moodOptions.find(option => option.label.toLowerCase() === mood.toLowerCase()) || 
                     moodOptions.find(option => option.emoji === mood);
        }
        
        const bgGradient = moodData ? moodData.color : "from-green-100 to-green-200";
        
        return (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`flex justify-center items-center w-8 h-8 mx-auto mt-1 rounded-full bg-gradient-to-br ${bgGradient} shadow-sm`}
          >
            {typeof mood === 'string' && mood.includes('.png') ? (
              <img src={mood} alt="mood" className="w-6 h-6 rounded-full object-cover" />
            ) : moodData && moodData.isImage ? (
              <img src={moodData.emoji} alt={moodData.label} className="w-6 h-6 rounded-full object-cover" />
            ) : (
              mood
            )}
          </motion.div>
        );
      }
    }
    return null;
  };

  const calendarClassNames = {
    calendar: "rounded-3xl shadow-2xl p-6 lg:p-12 w-full max-w-6xl border-2 border-[#ff3f74]/10 bg-white/90 backdrop-blur-sm",
    navigation: "flex justify-between items-center mb-8",
    navigationButton: "text-gray-600 hover:text-[#ff3f74] transition-all duration-200 hover:scale-110 text-xl lg:text-2xl",
    navigationLabel: "text-2xl lg:text-4xl font-bold text-[#ff3f74] tracking-wide",
    weekdays: "text-gray-500 font-semibold text-lg lg:text-xl",
    weekday: "py-4 lg:py-6",
    days: "grid grid-cols-7 gap-3 lg:gap-4",
    day: "h-16 lg:h-20 flex items-center justify-center relative transition-all duration-200 hover:scale-105 text-lg lg:text-xl",
    dayNeighboringMonth: "text-gray-300",
    daySelected: "bg-gradient-to-br from-[#ff3f74] to-[#e73568] text-white rounded-xl shadow-lg",
    dayToday: "bg-gradient-to-br from-[#ff3f74]/20 to-[#e73568]/20 font-bold rounded-xl border-2 border-[#ff3f74] text-[#ff3f74]"
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f4f8ff] via-white to-[#ff3f74]/5 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#ff3f74] mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-[#ff3f74] mb-2">Loading Mood Calendar</h2>
          <p className="text-gray-600">Preparing your wellness journey...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f8ff] via-white to-[#ff3f74]/5 p-4 lg:p-8">
      {/* Beautiful Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6 lg:mb-8"
      >
        <h1 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-[#ff3f74] to-[#e73568] bg-clip-text text-transparent mb-2">
          Mood Calendar
        </h1>
        <p className="text-gray-600 text-base lg:text-xl">Track your daily emotions and discover patterns in your wellness journey</p>
        <div className="w-24 h-1 bg-gradient-to-r from-[#ff3f74] to-[#e73568] mx-auto mt-4 rounded-full"></div>
      </motion.div>

      {/* Full Screen Calendar Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-1 flex flex-col"
      >
        <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-3xl border-0 overflow-hidden flex-1 flex flex-col">
          <div className="flex flex-col items-center p-4 lg:p-8 flex-1">
            <Calendar
              onClickDay={(date) => handleDateClick(date)}
              tileContent={tileContent}
              className={calendarClassNames.calendar}
              formatShortWeekday={(locale, date) => ["S", "M", "T", "W", "T", "F", "S"][date.getDay()]}
              showNeighboringMonth={false}
            />

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 mb-6 w-full max-w-2xl"
            >
              <div className="bg-gradient-to-r from-[#ff3f74]/10 to-[#e73568]/10 rounded-2xl p-6 border border-[#ff3f74]/20">
                <h3 className="text-center text-[#ff3f74] font-semibold text-xl mb-4 flex items-center justify-center gap-2">
                  <span>🎨</span> Mood Legend
                </h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {moodOptions.map((mood, index) => (
                    <motion.div 
                      key={index} 
                      className="flex flex-col items-center p-3 rounded-xl hover:scale-105 transition-transform duration-200"
                      whileHover={{ y: -2 }}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${mood.color} shadow-lg overflow-hidden`}>
                        {mood.isImage ? (
                          <img src={mood.emoji} alt={mood.label} className="w-10 h-10 object-cover rounded-full" />
                        ) : (
                          <span className="text-lg">{mood.emoji}</span>
                        )}
                      </div>
                      <span className="text-sm text-gray-700 mt-2 font-medium">{mood.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

        <AnimatePresence>
          {selectedDate && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedDate(null)}
            >
              <motion.div 
                className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full border border-[#ff3f74]/20"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#ff3f74] to-[#e73568] rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-2xl">📅</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#ff3f74] mb-2">
                    How did you feel?
                  </h3>
                  <p className="text-gray-600 font-medium">
                    {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </p>
                </div>
                
                <div className="mb-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={openCameraModal}
                    className="w-full py-4 bg-gradient-to-r from-[#ff3f74] to-[#e73568] hover:from-[#e73568] hover:to-[#ff3f74] text-white rounded-xl transition-all duration-300 font-semibold flex items-center justify-center gap-3 shadow-lg"
                  >
                    <span>📸</span> AI Mood Detection
                  </motion.button>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    Let AI analyze your facial expression
                  </p>
                </div>

                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">or choose manually</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {moodOptions.map((mood, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setMoodForDay(selectedDate, mood.emoji)}
                      className={`flex flex-col items-center p-4 rounded-xl bg-gradient-to-br ${mood.color} transition-all hover:shadow-lg border border-white/50`}
                    >
                      <div className="w-12 h-12 mb-2 rounded-full flex items-center justify-center overflow-hidden">
                        {mood.isImage ? (
                          <img src={mood.emoji} alt={mood.label} className="w-10 h-10 object-cover rounded-full" />
                        ) : (
                          <span className="text-3xl">{mood.emoji}</span>
                        )}
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{mood.label}</span>
                    </motion.button>
                  ))}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedDate(null)}
                  className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors font-medium"
                >
                  Cancel
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <CameraModal
          isOpen={showCamera}
          onClose={() => setShowCamera(false)}
          onMoodDetected={handleCameraDetection}
          selectedDate={selectedDate}
        />
      </div>
    );
  }