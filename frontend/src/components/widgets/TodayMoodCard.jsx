import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useStore } from "../store/userStore";

// Images should be imported or placed in the public folder
const moodImages = {
  happy: "/images/anime_happy.png",
  neutral: "/images/anime_neutral.png",
  sad: "/images/anime_sad.png",
};

export default function TodayMoodCard() {
  const { addMood } = useStore();
  const [mood, setMood] = useState(5);

  const handleMoodChange = (value) => {
    setMood(value);
    addMood(value);
    if (value >= 8) {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    }
  };

  const getMoodImage = () => {
    if (mood >= 7) return moodImages.happy;
    if (mood >= 4) return moodImages.neutral;
    return moodImages.sad;
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📝 Log Today’s Mood</h2>
      
      <motion.input
        type="range"
        min="1"
        max="10"
        value={mood}
        className="w-full accent-green-500"
        onChange={(e) => handleMoodChange(Number(e.target.value))}
      />

      <img
        src={getMoodImage()}
        alt="Anime Mood"
        className="mt-6 w-48 h-48 object-contain rounded"
      />
    </motion.div>
  );
}
