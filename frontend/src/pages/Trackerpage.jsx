import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, PieChart, Pie, Cell, Legend, ResponsiveContainer,
  AreaChart, Area, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from "recharts";

const COLORS = ["#ff3f74", "#e73568", "#d12d5b", "#bb254e", "#a51d41", "#8f1534", "#790d27"];
const VIBRANT_COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FECA57", "#FF9FF3", "#54A0FF", "#5F27CD"];
const MOOD_COLORS = ["#E74C3C", "#F39C12", "#F1C40F", "#2ECC71", "#3498DB", "#9B59B6", "#1ABC9C", "#E67E22"];

export default function HappinessDashboard() {
  const navigate = useNavigate();
  
  const [moodData, setMoodData] = useState([
    { day: "Mon", mood: 8, sleep: 7, exercise: 6, meditation: 5 },
    { day: "Tue", mood: 6, sleep: 6, exercise: 4, meditation: 3 },
    { day: "Wed", mood: 7, sleep: 8, exercise: 7, meditation: 6 },
    { day: "Thu", mood: 9, sleep: 7, exercise: 8, meditation: 7 },
    { day: "Fri", mood: 5, sleep: 5, exercise: 3, meditation: 4 },
    { day: "Sat", mood: 8, sleep: 9, exercise: 9, meditation: 8 },
    { day: "Sun", mood: 7, sleep: 8, exercise: 6, meditation: 7 }
  ]);

  const [activities, setActivities] = useState([
    { type: "mood", description: "Logged happy mood", time: "Today, 10:30 AM", score: "+8" },
    { type: "meditation", description: "Completed meditation", time: "Yesterday, 7:15 PM", score: "+5" },
    { type: "journal", description: "Journal entry added", time: "Yesterday, 9:45 AM", score: "+3" },
    { type: "exercise", description: "Finished 30-min workout", time: "Yesterday, 6:00 AM", score: "+6" }
  ]);

  const counts = { happy: 0, neutral: 0, sad: 0 };
  moodData.forEach((d) => {
    if (d.mood >= 7) counts.happy++;
    else if (d.mood >= 4) counts.neutral++;
    else counts.sad++;
  });

  const barData = [
    { name: "Morning", count: 32, emoji: "🌅" },
    { name: "Afternoon", count: 28, emoji: "☀️" },
    { name: "Evening", count: 25, emoji: "🌆" },
    { name: "Night", count: 18, emoji: "🌙" },
    { name: "Late Night", count: 12, emoji: "🌃" },
    { name: "Early Dawn", count: 8, emoji: "🌄" },
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

  const weeklyProgressData = [
    { week: "Week 1", happiness: 6.2, stress: 7.1, energy: 5.8 },
    { week: "Week 2", happiness: 6.8, stress: 6.5, energy: 6.2 },
    { week: "Week 3", happiness: 7.1, stress: 6.0, energy: 6.8 },
    { week: "Week 4", happiness: 7.5, stress: 5.2, energy: 7.1 },
  ];

  const activityDistribution = [
    { name: "Meditation", value: 25, color: "#FF6B6B" },
    { name: "Exercise", value: 20, color: "#4ECDC4" },
    { name: "Reading", value: 15, color: "#45B7D1" },
    { name: "Social Time", value: 20, color: "#96CEB4" },
    { name: "Work", value: 20, color: "#FECA57" },
  ];

  const moodTrendsData = [
    { month: "Jan", happy: 65, neutral: 25, sad: 10 },
    { month: "Feb", happy: 70, neutral: 22, sad: 8 },
    { month: "Mar", happy: 75, neutral: 20, sad: 5 },
    { month: "Apr", happy: 78, neutral: 18, sad: 4 },
    { month: "May", happy: 82, neutral: 15, sad: 3 },
    { month: "Jun", happy: 85, neutral: 12, sad: 3 },
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
    <div className="min-h-screen bg-[#f4f8ff] p-6 font-['Roboto',sans-serif]">
      {/* Header */}
      <div className="relative flex justify-center items-center mb-8">
        <div className="bg-white border-2 border-[#ff3f74] rounded-lg px-8 py-4 shadow-lg border-b-4 border-b-[#e73568]">
          <h1 className="text-2xl font-bold text-[#ff3f74]">Happiness Analytics Dashboard</h1>
        </div>
        
        {/* Survey Button */}
        <button
          onClick={() => navigate('/form')}
          className="absolute right-0 bg-[#ff3f74] hover:bg-[#e73568] text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Take Survey
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-md border border-[#ff3f74]/20">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold text-black mb-2">Happiness Score</h3>
              <p className="text-4xl font-bold text-black">7.8</p>
              <div className="flex items-center mt-2">
                <span className="text-black text-sm font-medium">+5 Positive</span>
              </div>
            </div>
            <div className="bg-[#ff3f74]/10 p-3 rounded-lg">
              <span className="text-2xl">😊</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-[#ff3f74]/20">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold text-black mb-2">Streak</h3>
              <p className="text-4xl font-bold text-black">12 days</p>
              <div className="flex items-center mt-2">
                <span className="text-black text-sm font-medium">+2 days</span>
              </div>
            </div>
            <div className="bg-[#ff3f74]/10 p-3 rounded-lg">
              <span className="text-2xl">🔥</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-[#ff3f74]/20">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold text-black mb-2">Weekly Average</h3>
              <p className="text-4xl font-bold text-black">7.1</p>
              <div className="flex items-center mt-2">
                <span className="text-black text-sm font-medium">+0.8 from last week</span>
              </div>
            </div>
            <div className="bg-[#ff3f74]/10 p-3 rounded-lg">
              <span className="text-2xl">📈</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-[#ff3f74]/20">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold text-black mb-2">Wellness Score</h3>
              <p className="text-4xl font-bold text-black">8.3</p>
              <div className="flex items-center mt-2">
                <span className="text-black text-sm font-medium">Excellent</span>
              </div>
            </div>
            <div className="bg-[#ff3f74]/10 p-3 rounded-lg">
              <span className="text-2xl">🌟</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Charts */}
        <div className="lg:col-span-3 space-y-6">
          {/* Time Distribution Bar Chart */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-[#ff3f74]/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#ff3f74]">Time Distribution of Happiness</h3>
              <div className="w-8 h-8 bg-gradient-to-br from-[#ff3f74]/20 to-[#ff3f74]/10 rounded-full flex items-center justify-center">
                <span className="text-lg">📊</span>
              </div>
            </div>
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
                        fill={VIBRANT_COLORS[index % VIBRANT_COLORS.length]} 
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
                    style={{ backgroundColor: VIBRANT_COLORS[index % VIBRANT_COLORS.length] }}
                  ></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Happiness Trend - Moved to second position */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-[#ff3f74]/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#ff3f74]">Weekly Happiness Trend</h3>
              <div className="w-8 h-8 bg-gradient-to-br from-[#ff3f74]/20 to-[#ff3f74]/10 rounded-full flex items-center justify-center">
                <span className="text-lg">💕</span>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={moodData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ff3f74" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#ff3f74" stopOpacity={0.1} />
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
                    dot={{ fill: '#ff3f74', strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 8, fill: '#ff3f74' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Wellness Metrics Overview */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-[#ff3f74]/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#ff3f74]">Wellness Metrics Overview</h3>
              <div className="w-16 h-16 bg-gradient-to-br from-[#ff3f74]/20 to-[#ff3f74]/10 rounded-full flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 100 100" className="text-[#ff3f74]">
                  <defs>
                    <linearGradient id="svgGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ff3f74" stopOpacity="1" />
                      <stop offset="100%" stopColor="#e73568" stopOpacity="1" />
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="45" fill="url(#svgGradient1)" opacity="0.1"/>
                  <path d="M50,75 C50,75 20,50 20,35 C20,20 35,20 50,35 C65,20 80,20 80,35 C80,50 50,75 50,75 Z" 
                        fill="url(#svgGradient1)" stroke="#ff3f74" strokeWidth="2"/>
                  <circle cx="30" cy="25" r="2" fill="#ff3f74"/>
                  <circle cx="70" cy="25" r="2" fill="#ff3f74"/>
                  <circle cx="25" cy="50" r="1.5" fill="#e73568"/>
                  <circle cx="75" cy="50" r="1.5" fill="#e73568"/>
                  <path d="M35,15 L37,20 L42,20 L38,23 L40,28 L35,25 L30,28 L32,23 L28,20 L33,20 Z" fill="#ff3f74"/>
                  <path d="M85,35 L86,38 L89,38 L87,40 L88,43 L85,41 L82,43 L83,40 L81,38 L84,38 Z" fill="#e73568"/>
                </svg>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={moodData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF6B6B" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#FF6B6B" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="sleepGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4ECDC4" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#4ECDC4" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="exerciseGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#45B7D1" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#45B7D1" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="day" tick={{ fill: "#4b5563", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 10]} tick={{ fill: "#4b5563", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb' }} />
                  <Area type="monotone" dataKey="mood" stackId="1" stroke="#FF6B6B" fill="url(#moodGradient)" strokeWidth={2} />
                  <Area type="monotone" dataKey="sleep" stackId="2" stroke="#4ECDC4" fill="url(#sleepGradient)" strokeWidth={2} />
                  <Area type="monotone" dataKey="exercise" stackId="3" stroke="#45B7D1" fill="url(#exerciseGradient)" strokeWidth={2} />
                  <Legend />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Progress Trends - Moved to bottom */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-[#ff3f74]/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#ff3f74]">Monthly Progress Trends</h3>
              <div className="w-8 h-8 bg-gradient-to-br from-[#ff3f74]/20 to-[#ff3f74]/10 rounded-full flex items-center justify-center">
                <span className="text-lg">📈</span>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyProgressData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="week" tick={{ fill: "#4b5563", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 10]} tick={{ fill: "#4b5563", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb' }} />
                  <Line type="monotone" dataKey="happiness" stroke="#96CEB4" strokeWidth={3} dot={{ fill: '#96CEB4', strokeWidth: 2, r: 5 }} />
                  <Line type="monotone" dataKey="stress" stroke="#FECA57" strokeWidth={3} dot={{ fill: '#FECA57', strokeWidth: 2, r: 5 }} />
                  <Line type="monotone" dataKey="energy" stroke="#FF9FF3" strokeWidth={3} dot={{ fill: '#FF9FF3', strokeWidth: 2, r: 5 }} />
                  <Legend />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column - Mood Logging, Activities, and Insights */}
        <div className="space-y-6">
          {/* Log Today's Mood */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-[#ff3f74]/20">
            <h3 className="text-lg font-semibold text-[#ff3f74] mb-4">Log Today's Mood</h3>
            <TodayMoodLogger onSaveMood={addMoodEntry} />
          </div>

          {/* SVG Illustration */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-[#ff3f74]/20">
            <div className="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="280" height="300" viewBox="0 0 741.366 800.257" className="w-full h-auto max-w-xs">
                <g transform="translate(-889.765 -73.35)">
                  <path d="M391.365,594.337c.154,0,.251,0,.284-.006l18.417,0v-2.715H391.582c-.428.015-9.159.262-17.2-9.5-11.988-14.548-21.833-50.561-.654-139.514,28.478-119.61,4.726-225.278-6.808-265.158a13.241,13.241,0,0,1,12.74-16.906H654.7A13.3,13.3,0,0,1,665.425,166c4.886,6.721,11.591,19.633,15.787,42.979l2.672-.48c-4.287-23.854-11.21-37.145-16.263-44.1a16.023,16.023,0,0,0-12.922-6.578H379.657A15.957,15.957,0,0,0,364.309,178.2c11.474,39.672,35.1,144.793,6.774,263.775-21.477,90.2-11.152,127,1.291,141.98C380.581,593.837,389.624,594.337,391.365,594.337Z" transform="translate(531.112 -84.476)" fill="#e6e6e6"/>
                  <path d="M354.864,630.837c.154,0,.251,0,.284-.006l18.417,0v-2.715H355.082c-.43.013-9.159.262-17.2-9.5-11.988-14.548-21.833-50.561-.654-139.514,28.478-119.61,4.726-225.278-6.808-265.158a13.241,13.241,0,0,1,12.74-16.906H618.2a13.3,13.3,0,0,1,10.726,5.459c4.886,6.721,11.591,19.633,15.787,42.979l2.673-.48c-4.287-23.854-11.21-37.145-16.263-44.1a16.023,16.023,0,0,0-12.922-6.578H343.157A15.957,15.957,0,0,0,327.809,214.7c11.474,39.672,35.1,144.793,6.774,263.775-21.477,90.2-11.152,127,1.291,141.98C344.081,630.337,353.124,630.837,354.864,630.837Z" transform="translate(617.169 -71.419)" fill="#ccc"/>
                  <path d="M315.518,667.337c.154,0,.251,0,.284-.006l270.8,0a15.953,15.953,0,0,0,14.838-21.862c-9.826-24.549-23.055-83.445-1.265-202.083,25.731-140.09,2.695-190.719-8.4-205.985a16.023,16.023,0,0,0-12.922-6.578H303.811A15.957,15.957,0,0,0,288.463,251.2c11.474,39.672,35.1,144.793,6.774,263.775-21.477,90.2-11.153,127,1.291,141.98C304.735,666.837,313.778,667.337,315.518,667.337Zm263.334-433.8A13.3,13.3,0,0,1,589.579,239c10.893,14.982,33.47,64.841,7.929,203.9-20.817,113.334-10.721,173.265,1.415,203.583a13.017,13.017,0,0,1-1.327,12.307,13.256,13.256,0,0,1-10.99,5.831H315.736c-.428.021-9.159.263-17.2-9.5-11.988-14.548-21.833-50.561-.654-139.514,28.478-119.61,4.726-225.278-6.808-265.158a13.241,13.241,0,0,1,12.74-16.906Z" transform="translate(706.072 -58.361)" fill="#3f3d56"/>
                  <path d="M535.008,326.549H319.129a10.862,10.862,0,1,1,0-21.724H535.008a10.862,10.862,0,1,1,0,21.724Z" transform="translate(722.968 -31.89)" fill="#ff3f74"/>
                  <path d="M535.008,360.549H319.129a10.862,10.862,0,1,1,0-21.724H535.008a10.862,10.862,0,1,1,0,21.724Z" transform="translate(722.968 -19.727)" fill="#ccc"/>
                  <path d="M535.008,394.549H319.129a10.862,10.862,0,1,1,0-21.724H535.008a10.862,10.862,0,1,1,0,21.724Z" transform="translate(722.968 -7.564)" fill="#ccc"/>
                  <path d="M547.008,428.549H331.129a10.862,10.862,0,1,1,0-21.724H547.008a10.862,10.862,0,1,1,0,21.724Z" transform="translate(727.26 4.598)" fill="#ccc"/>
                  <path d="M547.008,462.549H331.129a10.862,10.862,0,1,1,0-21.724H547.008a10.862,10.862,0,1,1,0,21.724Z" transform="translate(727.26 16.761)" fill="#ccc"/>
                  <path d="M420.959,292.549H319.129a10.862,10.862,0,1,1,0-21.724h101.83a10.862,10.862,0,0,1,0,21.724Z" transform="translate(722.968 -44.053)" fill="#ff3f74"/>
                  <path d="M382.634,520.686c2.192-9.28,12.488-12.322,20.907-11.982a89.24,89.24,0,0,1,15.764,2.495c5.409,1.21,10.766,2.643,16.1,4.163,9.774,2.787,19.446,6.158,29.381,8.337,8.271,1.814,17.258,2.878,25.506.374,7.928-2.408,14.654-8.318,16.812-16.489,2.033-7.7-.758-16.12-8.22-19.639-6.8-3.209-15.4-1.577-18.773,5.68-3.8,8.183,0,17.106,6.018,23.028a67.434,67.434,0,0,0,11.185,8.5,41.648,41.648,0,0,0,13.392,6c7.854,1.678,17.211-.794,21.261-8.3a14.025,14.025,0,0,0,1.591-5.481c.24-2.609-3.835-2.593-4.073,0-.687,7.472-9.437,10.971-15.981,10.152a32.483,32.483,0,0,1-12.39-4.809,72.6,72.6,0,0,1-10.262-7.241c-5.55-4.8-10.753-12.707-7.025-20.2,3.035-6.1,10.948-6.042,15.76-2.106,5.828,4.767,4.789,13.418.945,19.078-4.256,6.268-11.971,8.9-19.245,9.178-7.9.308-15.741-1.506-23.294-3.651-9.385-2.665-18.677-5.648-28.108-8.157-5.354-1.424-10.749-2.71-16.2-3.71a53.463,53.463,0,0,0-15.708-1.087c-8.5.982-17.175,5.929-19.268,14.791-.6,2.549,3.325,3.637,3.928,1.083Z" transform="translate(748.143 33.056)" fill="#3f3d56"/>
                  <path d="M492.133,514a3.394,3.394,0,0,1,1.849-5.987,56.058,56.058,0,0,1,21.985,2.253l72.388,22.356a7.467,7.467,0,0,1-4.407,14.27L511.561,524.54A56.065,56.065,0,0,1,492.133,514Z" transform="translate(788.304 40.704)" fill="#3f3d56"/>
                  <g transform="translate(1363.219 262.788)">
                    <path d="M748.5,335.588s14.391,30.509,12.089,39.719A25.214,25.214,0,0,0,762.316,392l26.479-1.152,24.753-23.6s-37.415-25.9-35.114-38.568S748.5,335.588,748.5,335.588Z" transform="translate(-668.635 -261.563)" fill="#ed9da0"/>
                    <path d="M807.862,376.12,819.374,447.5s0,64.471-3.454,65.623-18.42,0-18.42,0v-72.53l4.606-63.321Z" transform="translate(-661.223 -253.742)" fill="#ff3f74"/>
                    <path d="M807.862,376.12,819.374,447.5s0,64.471-3.454,65.623-18.42,0-18.42,0v-72.53l4.606-63.321Z" transform="translate(-661.223 -253.742)" opacity="0.1"/>
                    <path d="M706,644.026l9.21,35.69,13.815-10.362,12.664-28.782L725.572,621Z" transform="translate(-490.285 -102.581)" fill="#ed9da0"/>
                    <path d="M903.722,733.12s-14.966,11.512-14.966,23.026c0,0-8.058,12.664-17.269,11.512v24.177s-28.782,14.966-6.908,18.42,37.992-24.177,37.992-24.177,20.723-33.387,17.269-37.992S903.722,733.12,903.722,733.12Z" transform="translate(-652.317 -199.735)" fill="#090814"/>
                    <path d="M810.5,490.435s21.963,23.862,11.6,60.7c0,0-11.513,82.892,25.328,113.976s61.017,99.01,61.017,99.01l-27.631,25.328s-29.932-67.925-61.017-94.4-34.538-56.413-34.538-56.413V533.872L779.5,490.12Z" transform="translate(-663.945 -236.496)" fill="#090814"/>
                    <path d="M810.5,490.435s21.963,23.862,11.6,60.7c0,0-11.513,82.892,25.328,113.976s61.017,99.01,61.017,99.01l-27.631,25.328s-29.932-67.925-61.017-94.4-34.538-56.413-34.538-56.413V533.872L779.5,490.12Z" transform="translate(-663.945 -236.496)" fill="#6f6f6f" opacity="0.1"/>
                    <path d="M622.512,664,611,676.664l4.606,10.362,13.816,4.606,24.177-9.21-3.454-13.816Z" transform="translate(-504.656 -96.076)" fill="#ed9da0"/>
                    <path d="M820.694,774.789s-26.639,13.816-33.3,8.059a18.679,18.679,0,0,1-6.641-13.146s-13.338,1.634-22.218,7.386-19.808,7.752-26.639,12.664-6.66,13.815,14.43,14.966,74.367-1.152,74.367-6.908Z" transform="translate(-671.753 -194.202)" fill="#090814"/>
                    <path d="M744.054,504.028S729.088,570.8,755.566,646.79c0,0,12.664,42.6,18.42,55.261S785.5,804.515,783.2,807.969c0,0,18.42,14.966,34.538,4.605,0,0-1.152-52.959,1.152-57.563s4.606-44.9-9.21-78.287-2.3-113.976-2.3-113.976S835,521.3,814.281,497.12Z" transform="translate(-669.946 -235.437)" fill="#090814"/>
                    <ellipse cx="32.236" cy="32.236" rx="32.236" ry="32.236" transform="translate(59.142 17.613)" fill="#ed9da0"/>
                    <path d="M823.19,518.661s-9.21,13.816-16.118,6.908c-4.87-4.87-36.046,5.71-54.034,12.376-7.53,2.786-12.745,4.893-12.745,4.893s-.495-15.956-1.957-36.162c-1.681-23.187-4.628-51.993-9.556-68.6-9.21-31.085,13.816-43.749,13.816-43.749s19.573-23.024,18.425-26.479,51.807-20.723,51.807-20.723c5.756,1.152,10.362,52.959,10.362,52.959s-10.362,41.446-16.118,66.775S823.19,518.661,823.19,518.661Z" transform="translate(-671.946 -258.129)" fill="#ff3f74"/>
                    <path d="M731.364,497.12s-25.328,25.328-37.992,32.236-19.572,29.932-9.21,34.538,33.387-25.328,33.387-25.328l33.387-27.631Z" transform="translate(-679.13 -235.437)" fill="#ed9da0"/>
                    <path d="M729.176,300.413c-2.945.262-4.628,3.971-3.677,6.771s3.682,4.631,6.472,5.609,5.773,1.314,8.566,2.284a25.211,25.211,0,0,1,7.614,4.422c7.957,6.517,12.67,16.447,14.169,26.623s0,20.6-2.823,30.493c-1.5,5.239-3.946,10.982-9.066,12.842a101.856,101.856,0,0,0,16.351-5.545c3.872-1.824,7.506-4.132,11.42-5.865a71.6,71.6,0,0,1,18.076-4.741c4.358-.68,8.965-1.2,13.058.448a26.249,26.249,0,0,1,6.844,4.615l13.168,11.063q.344-7.214.454-14.437c.064-4.185.048-8.491-1.495-12.381-1.523-3.842-4.414-6.973-6.348-10.624-4.787-9.038-3.227-19.917-3.138-30.14.092-10.585-1.611-21.374-6.511-30.757s-13.268-17.24-23.475-20.05c-13.756-3.79-28.259,1.846-40.9,8.455a37.1,37.1,0,0,0-8.248,5.369,40.087,40.087,0,0,0-6.706,9.143L726.718,304.5" transform="translate(-672.155 -269.821)" fill="#090814"/>
                    <path d="M808.985,408.717s-21.874,82.892-24.176,88.649c-1.658,4.133-21.161,26.123-33.306,37.707-7.53,2.783-12.745,4.888-12.745,4.888S738.263,524,736.8,503.8c9.371-10.4,19.227-20.251,19.227-20.251s10.362-63.321,9.21-87.5,23.026-29.932,23.026-29.932C815.892,369.574,808.985,408.717,808.985,408.717Z" transform="translate(-670.405 -255.255)" opacity="0.1"/>
                    <path d="M787.454,362.12s-24.177,5.756-23.026,29.932-9.21,87.5-9.21,87.5-39.143,39.143-35.69,43.749,18.252,13.658,21.79,14.888S781.7,499.119,784,493.365s24.177-88.648,24.177-88.648S815.084,365.574,787.454,362.12Z" transform="translate(-673.051 -255.86)" fill="#ff3f74"/>
                  </g>
                </g>
              </svg>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-[#ff3f74]/20">
            <h3 className="text-lg font-semibold text-[#ff3f74] mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <ActivityItem key={index} activity={activity} />
              ))}
            </div>
          </div>

          {/* Insights Box */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-[#ff3f74]/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#ff3f74]">Insights</h3>
              <div className="w-8 h-8 bg-gradient-to-br from-[#ff3f74]/20 to-[#ff3f74]/10 rounded-full flex items-center justify-center">
                <span className="text-lg">💡</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-[#ff3f74]/10 to-[#ff3f74]/5 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">🎯</span>
                  <h4 className="font-semibold text-gray-800">Weekly Goal</h4>
                </div>
                <p className="text-sm text-gray-600">Maintain happiness above 7.0</p>
                <div className="mt-2 bg-white rounded-full h-2">
                  <div className="bg-[#ff3f74] h-2 rounded-full" style={{width: '78%'}}></div>
                </div>
                <p className="text-xs text-[#ff3f74] mt-1">78% achieved</p>
              </div>
              
              <div className="bg-gradient-to-r from-green-100 to-green-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">📈</span>
                  <h4 className="font-semibold text-gray-800">Best Day</h4>
                </div>
                <p className="text-sm text-gray-600">Thursday: 9.0 happiness score</p>
                <p className="text-xs text-green-600 mt-1">+12% from average</p>
              </div>

              <div className="bg-gradient-to-r from-purple-100 to-purple-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">🏃‍♀️</span>
                  <h4 className="font-semibold text-gray-800">Activity Impact</h4>
                </div>
                <p className="text-sm text-gray-600">Exercise boosts mood by +15%</p>
                <p className="text-xs text-purple-600 mt-1">Consider 3x weekly workouts</p>
              </div>
              
              <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">💭</span>
                  <h4 className="font-semibold text-gray-800">Tip</h4>
                </div>
                <p className="text-sm text-gray-600">Try meditation on Friday to boost your weekend mood!</p>
              </div>
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
    if (mood >= 8) return "text-[#ff3f74]";
    if (mood >= 6) return "text-[#e73568]";
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
          className="w-full accent-[#ff3f74] mb-2"
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
        className="w-full bg-[#ff3f74] hover:bg-[#e73568] text-white font-medium py-3 px-6 rounded-lg transition-colors"
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
      case "mood": return "bg-[#ff3f74]/20 text-[#ff3f74]";
      case "meditation": return "bg-[#ff3f74]/15 text-[#e73568]";
      case "journal": return "bg-[#ff3f74]/10 text-[#d12d5b]";
      case "exercise": return "bg-[#ff3f74]/25 text-[#bb254e]";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const getActivityIcon = () => {
    switch(activity.type) {
      case "mood": return "😊";
      case "meditation": return "🧘";
      case "journal": return "📝";
      case "exercise": return "💪";
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
      <span className="text-[#ff3f74] text-sm font-medium">{activity.score}</span>
    </div>
  );
}