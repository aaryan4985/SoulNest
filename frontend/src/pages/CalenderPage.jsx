import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Card from "../components/layout/Card";
import CameraModal from "../components/CameraModal";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../config/firebase";
import { useStore } from "../store/userStore";
import { doc, getDoc, setDoc } from "firebase/firestore";

const moodOptions = [
  { emoji: "😊", label: "Happy", color: "from-yellow-100 to-yellow-200" },
  { emoji: "😐", label: "Neutral", color: "from-gray-100 to-gray-200" },
  { emoji: "😢", label: "Sad", color: "from-blue-100 to-blue-200" },
  { emoji: "🤩", label: "Excited", color: "from-pink-100 to-pink-200" },
  { emoji: "😴", label: "Tired", color: "from-purple-100 to-purple-200" },
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

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const key = date.toISOString().split("T")[0];
      const mood = moods[key];
      
      if (mood) {
        const moodData = moodOptions.find(option => option.emoji === mood);
        const bgGradient = moodData ? moodData.color : "from-green-100 to-green-200";
        
        return (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`flex justify-center items-center w-7 h-7 mx-auto mt-1 rounded-full bg-gradient-to-br ${bgGradient} shadow-sm`}
          >
            {mood}
          </motion.div>
        );
      }
    }
    return null;
  };

  const calendarClassNames = {
    calendar: "rounded-2xl shadow-lg p-4 w-full sm:w-[90%] md:w-[80%] lg:w-[70%] border border-gray-200 bg-white",
    navigation: "flex justify-between items-center mb-4",
    navigationButton: "text-gray-600 hover:text-green-600 transition-colors",
    navigationLabel: "text-lg font-semibold text-gray-800",
    weekdays: "text-gray-500 font-medium text-sm",
    weekday: "py-2",
    days: "grid grid-cols-7 gap-1",
    day: "h-12 flex items-center justify-center relative",
    dayNeighboringMonth: "text-gray-300",
    daySelected: "bg-green-100 rounded-full",
    dayToday: "bg-green-50 font-bold rounded-full"
  };

  if (isLoading) {
    return (
      <Card title="📅 Mood Calendar">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card title="📅 Mood Calendar" className="bg-gradient-to-br from-white to-green-50">
      <div className="flex flex-col items-center p-2">
        <Calendar
          onClickDay={(date) => setSelectedDate(date)}
          tileContent={tileContent}
          className={calendarClassNames.calendar}
          formatShortWeekday={(locale, date) => ["S", "M", "T", "W", "T", "F", "S"][date.getDay()]}
          showNeighboringMonth={false}
        />

        <div className="mt-6 mb-4">
          <h3 className="text-center text-gray-700 font-medium mb-2">Mood Legend</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {moodOptions.map((mood) => (
              <div key={mood.emoji} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br ${mood.color} shadow-sm`}>
                  {mood.emoji}
                </div>
                <span className="text-xs text-gray-600 mt-1">{mood.label}</span>
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {selectedDate && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedDate(null)}
            >
              <motion.div 
                className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
              >
                <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">
                  How did you feel on {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}?
                </h3>
                <p className="text-center text-gray-600 mb-6">Select your mood manually or use AI detection</p>
                
                <div className="mb-6">
                  <button
                    onClick={openCameraModal}
                    className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    Detect Mood with Camera
                  </button>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    AI will analyze your facial expression
                  </p>
                </div>

                <div className="text-center text-gray-500 mb-4 text-sm">
                  or choose manually
                </div>
                
                <div className="grid grid-cols-4 gap-4">
                  {moodOptions.map((mood, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setMoodForDay(selectedDate, mood.emoji)}
                      className={`flex flex-col items-center p-3 rounded-xl bg-gradient-to-br ${mood.color} transition-all hover:shadow-md`}
                    >
                      <span className="text-3xl mb-1">{mood.emoji}</span>
                      <span className="text-xs font-medium text-gray-700">{mood.label}</span>
                    </motion.button>
                  ))}
                </div>
                
                <button
                  onClick={() => setSelectedDate(null)}
                  className="mt-6 w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
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
    </Card>
  );
}