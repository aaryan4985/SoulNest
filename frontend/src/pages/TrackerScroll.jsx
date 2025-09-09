import { useState } from "react";
import { motion } from "framer-motion";
import MoodPieChart from "../components/widgets/MoodPieChart";
import MoodBarChart from "../components/widgets/MoodBarChart";
import MoodLineChart from "../components/widgets/MoodLineChart";

const sections = [
  {
    id: 1,
    title: "Mood Distribution",
    description: "See how your moods are spread across Happy, Neutral, Sad, Stressed, and Excited.",
    component: <MoodPieChart />,
  },
  {
    id: 2,
    title: "Mood Categories",
    description: "Check the count of each mood category for better balance.",
    component: <MoodBarChart />,
  },
  {
    id: 3,
    title: "Weekly Mood Trend",
    description: "Track how your mood changes day by day over the week.",
    component: <MoodLineChart />,
  },
];

export default function TrackerScroll() {
  const [active, setActive] = useState(0);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <div className="sticky top-0 h-screen flex flex-col justify-center items-center">
        <motion.div
          key={sections[active].id}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-4xl"
        >
          <h1 className="text-4xl font-extrabold mb-4 text-center">{sections[active].title}</h1>
          <p className="text-lg text-center mb-8">{sections[active].description}</p>
          {sections[active].component}
        </motion.div>
      </div>

      {/* Invisible scroll steps */}
      <div className="h-[300vh]">
        {sections.map((_, i) => (
          <div
            key={i}
            className="h-screen"
            onMouseEnter={() => setActive(i)}
            onTouchStart={() => setActive(i)}
          />
        ))}
      </div>
    </div>
  );
}
