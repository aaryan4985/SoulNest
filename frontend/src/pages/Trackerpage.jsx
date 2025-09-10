import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, PieChart, Pie, Cell, Legend, ResponsiveContainer,
  AreaChart, Area, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from "recharts";

const COLORS = ["#22c55e", "#a3e635", "#f87171", "#38bdf8", "#fbbf24", "#a855f7", "#ec4899"];

export default function HappinessDashboard() {
  const [moodData, setMoodData] = useState([
    { day: "Mon", mood: 8 },
    { day: "Tue", mood: 6 },
    { day: "Wed", mood: 7 },
    { day: "Thu", mood: 9 },
    { day: "Fri", mood: 5 },
    { day: "Sat", mood: 8 },
    { day: "Sun", mood: 7 }
  ]);

  const [activities, setActivities] = useState([
    { type: "mood", description: "Logged happy mood", time: "Today, 10:30 AM", score: "+8" },
    { type: "meditation", description: "Completed meditation", time: "Yesterday, 7:15 PM", score: "+5" },
    { type: "journal", description: "Journal entry added", time: "Yesterday, 9:45 AM", score: "+3" }
  ]);

  const counts = { happy: 0, neutral: 0, sad: 0 };
  moodData.forEach((d) => {
    if (d.mood >= 7) counts.happy++;
    else if (d.mood >= 4) counts.neutral++;
    else counts.sad++;
  });

  const barData = [
    { name: "18-24", count: 24, emoji: "😀" },
    { name: "25-34", count: 28, emoji: "🙂" },
    { name: "35-44", count: 22, emoji: "😐" },
    { name: "45-54", count: 16.2, emoji: "😕" },
    { name: "55-64", count: 11.7, emoji: "😢" },
    { name: "65+", count: 4.6, emoji: "😴" },
  ];

  const pieData = [
    { name: "Residential", value: 27 },
    { name: "Parking Lots", value: 41 },
    { name: "Transport Hubs", value: 74 },
    { name: "Commercial", value: 53 },
    { name: "Workplace", value: 108 },
  ];

  const radarData = [
    { factor: "Work", value: 7 },
    { factor: "Sleep", value: 5 },
    { factor: "Exercise", value: 8 },
    { factor: "Food", value: 6 },
    { factor: "Social", value: 9 },
  ];

  const addMoodEntry = (moodValue) => {
    const today = new Date();
    const day = today.toLocaleDateString('en-US', { weekday: 'short' });
    
    // Update mood data
    const newMoodData = [...moodData];
    newMoodData.push({ day, mood: moodValue });
    setMoodData(newMoodData);
    
    // Add to activities
    const moodLabel = getMoodLabel(moodValue);
    const newActivity = {
      type: "mood",
      description: `Logged ${moodLabel.toLowerCase()} mood`,
      time: "Just now",
      score: `+${moodValue}`
    };
    
    setActivities([newActivity, ...activities]);
  };

  const getMoodLabel = (moodValue) => {
    if (moodValue >= 8) return "Happy";
    if (moodValue >= 6) return "Good";
    if (moodValue >= 4) return "Neutral";
    if (moodValue >= 2) return "Sad";
    return "Very Sad";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Happiness Analytics Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="bg-white rounded-lg p-2 shadow-sm">
            <span className="text-gray-600">Last updated: Today</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Happiness Score</h3>
              <p className="text-3xl font-bold text-gray-800">7.8</p>
              <div className="flex items-center mt-2">
                <span className="text-green-500 text-sm font-medium">+5 Positive</span>
              </div>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <span className="text-2xl">😊</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Streak</h3>
              <p className="text-3xl font-bold text-gray-800">12 days</p>
              <div className="flex items-center mt-2">
                <span className="text-green-500 text-sm font-medium">+2 days</span>
              </div>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <span className="text-2xl">🔥</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Weekly Average</h3>
              <p className="text-3xl font-bold text-gray-800">7.1</p>
              <div className="flex items-center mt-2">
                <span className="text-green-500 text-sm font-medium">+0.8 from last week</span>
              </div>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <span className="text-2xl">📈</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Age Distribution Chart */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Age Distribution of Happy Users</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e5e7eb" />
                  <XAxis type="number" tick={{ fill: "#4b5563", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    tick={{ fill: "#4b5563", fontSize: 12 }} 
                    axisLine={false} 
                    tickLine={false} 
                    width={80}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      border: '1px solid #e5e7eb'
                    }}
                    formatter={(value) => [`${value}%`, 'Percentage']}
                  />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                    {barData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center mt-4 gap-4 flex-wrap">
              {barData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mood Trend Chart */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Happiness Trend</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={moodData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22c55e" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#22c55e" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis 
                    dataKey="day" 
                    tick={{ fill: "#4b5563", fontSize: 12 }} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    domain={[0, 10]} 
                    tick={{ fill: "#4b5563", fontSize: 12 }} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      border: '1px solid #e5e7eb'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="mood"
                    stroke="url(#lineGradient)"
                    strokeWidth={3}
                    dot={{ fill: '#22c55e', strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 8, fill: '#22c55e' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column - Mood Logging and Activities */}
        <div className="space-y-6">
          {/* Log Today's Mood */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Log Today's Mood</h3>
            <TodayMoodLogger onSaveMood={addMoodEntry} />
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <ActivityItem key={index} activity={activity} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TodayMoodLogger({ onSaveMood }) {
  const [mood, setMood] = useState(5);

  const handleMoodChange = (value) => {
    setMood(value);
  };

  const saveMood = () => {
    onSaveMood(mood);
  };

  const getMoodEmoji = () => {
    if (mood >= 8) return "😊";
    if (mood >= 6) return "🙂";
    if (mood >= 4) return "😐";
    if (mood >= 2) return "😕";
    return "😢";
  };

  const getMoodLabel = () => {
    if (mood >= 8) return "Happy";
    if (mood >= 6) return "Good";
    if (mood >= 4) return "Neutral";
    if (mood >= 2) return "Sad";
    return "Very Sad";
  };

  const getMoodColor = () => {
    if (mood >= 8) return "text-green-600";
    if (mood >= 6) return "text-lime-600";
    if (mood >= 4) return "text-amber-600";
    if (mood >= 2) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-5xl my-4">{getMoodEmoji()}</div>
      <div className={`text-xl font-bold mb-2 ${getMoodColor()}`}>{getMoodLabel()}</div>
      <div className="text-gray-600 mb-6">Score: {mood}/10</div>
      
      <div className="w-full mb-6">
        <input
          type="range"
          min="1"
          max="10"
          value={mood}
          className="w-full accent-green-500 mb-2"
          onChange={(e) => handleMoodChange(Number(e.target.value))}
        />
        
        <div className="flex justify-between w-full text-xs text-gray-500 px-1">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
          <span>8</span>
          <span>9</span>
          <span>10</span>
        </div>
      </div>
      
      <button 
        className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
        onClick={saveMood}
      >
        Save Mood Entry
      </button>
    </div>
  );
}

function ActivityItem({ activity }) {
  const getActivityColor = () => {
    switch(activity.type) {
      case "mood": return "bg-green-100 text-green-600";
      case "meditation": return "bg-blue-100 text-blue-600";
      case "journal": return "bg-purple-100 text-purple-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const getActivityIcon = () => {
    switch(activity.type) {
      case "mood": return "😊";
      case "meditation": return "🧘";
      case "journal": return "📝";
      default: return "✅";
    }
  };

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center">
        <div className={`p-2 rounded-lg mr-3 ${getActivityColor()}`}>
          <span className="text-lg">{getActivityIcon()}</span>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-800">{activity.description}</p>
          <p className="text-xs text-gray-500">{activity.time}</p>
        </div>
      </div>
      <span className="text-green-600 text-sm font-medium">{activity.score}</span>
    </div>
  );
}