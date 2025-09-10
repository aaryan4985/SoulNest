import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { 
  TrendingUp, Users, Heart, Calendar, MessageSquare, 
  Camera, BookOpen, Activity, Target, Brain
} from 'lucide-react';

const AdminAnalytics = () => {
  // Sample data for different tracking metrics
  const happinessData = [
    { month: 'Jan', average: 7.2, sessions: 1200 },
    { month: 'Feb', average: 7.5, sessions: 1350 },
    { month: 'Mar', average: 6.8, sessions: 1180 },
    { month: 'Apr', average: 7.8, sessions: 1420 },
    { month: 'May', average: 8.1, sessions: 1580 },
    { month: 'Jun', average: 7.9, sessions: 1650 },
  ];

  const moodDistribution = [
    { name: 'Happy', value: 35, color: '#10B981' },
    { name: 'Neutral', value: 25, color: '#F59E0B' },
    { name: 'Sad', value: 20, color: '#3B82F6' },
    { name: 'Excited', value: 12, color: '#FF3F74' },
    { name: 'Angry', value: 8, color: '#EF4444' },
  ];

  const appointmentStats = [
    { day: 'Mon', booked: 45, completed: 40, cancelled: 5 },
    { day: 'Tue', booked: 52, completed: 48, cancelled: 4 },
    { day: 'Wed', booked: 38, completed: 35, cancelled: 3 },
    { day: 'Thu', booked: 48, completed: 44, cancelled: 4 },
    { day: 'Fri', booked: 55, completed: 50, cancelled: 5 },
    { day: 'Sat', booked: 32, completed: 30, cancelled: 2 },
    { day: 'Sun', booked: 28, completed: 26, cancelled: 2 },
  ];

  const aiChatbotUsage = [
    { hour: '6 AM', messages: 12 },
    { hour: '9 AM', messages: 45 },
    { hour: '12 PM', messages: 78 },
    { hour: '3 PM', messages: 62 },
    { hour: '6 PM', messages: 89 },
    { hour: '9 PM', messages: 56 },
    { hour: '12 AM', messages: 23 },
  ];

  const resourceUsage = [
    { resource: 'Articles', views: 2450, engagement: 78 },
    { resource: 'Videos', views: 1890, engagement: 85 },
    { resource: 'Exercises', views: 1654, engagement: 92 },
    { resource: 'Meditation', views: 1234, engagement: 88 },
    { resource: 'Journals', views: 987, engagement: 75 },
  ];

  const galleryActivity = [
    { month: 'Jan', uploads: 234, likes: 1456, shares: 89 },
    { month: 'Feb', uploads: 267, likes: 1678, shares: 103 },
    { month: 'Mar', uploads: 198, likes: 1234, shares: 76 },
    { month: 'Apr', uploads: 289, likes: 1789, shares: 134 },
    { month: 'May', uploads: 321, likes: 2001, shares: 156 },
    { month: 'Jun', uploads: 345, likes: 2234, shares: 178 },
  ];

  const wellnessAssessmentScores = [
    { category: 'Anxiety', score: 6.2, change: -0.5 },
    { category: 'Depression', score: 5.8, change: -0.8 },
    { category: 'Stress', score: 7.1, change: -0.3 },
    { category: 'Sleep Quality', score: 7.5, change: +0.4 },
    { category: 'Social Connection', score: 6.9, change: +0.2 },
  ];

  const StatCard = ({ icon: Icon, title, value, subtitle, trend, color = '#ff3f74' }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div 
              className="p-2 rounded-lg"
              style={{ backgroundColor: `${color}20` }}
            >
              <Icon className="w-5 h-5" style={{ color }} />
            </div>
            <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-green-500">{trend}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const ChartCard = ({ title, children, className = "" }) => (
    <div className={`bg-white rounded-xl p-6 shadow-sm border border-gray-200 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f4f8ff' }}>
      <div className="p-6">
        {/* Header */}
        <div className="mb-15 ml-12">
          <h1 className="text-3xl font-bold" style={{ color: '#ff3f74' }}>
            Client Analytics Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Comprehensive insights into client engagement and wellness tracking
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Users}
            title="Active Users"
            value="2,847"
            subtitle="This month"
            trend="+12.5%"
            color="#10B981"
          />
          <StatCard
            icon={Heart}
            title="Avg Happiness Score"
            value="7.9/10"
            subtitle="This week"
            trend="+0.3"
            color="#FF3F74"
          />
          <StatCard
            icon={MessageSquare}
            title="AI Chat Sessions"
            value="1,234"
            subtitle="Today"
            trend="+8.2%"
            color="#3B82F6"
          />
          <StatCard
            icon={Calendar}
            title="Appointments Booked"
            value="456"
            subtitle="This week"
            trend="+15.3%"
            color="#F59E0B"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Happiness Trends */}
          <ChartCard title="Happiness Score Trends">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={happinessData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="average" 
                    stroke="#ff3f74" 
                    fill="#ff3f7420"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          {/* Mood Distribution */}
          <ChartCard title="Mood Distribution">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={moodDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {moodDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              {moodDistribution.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-600">{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        {/* Second Row Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Appointment Statistics */}
          <ChartCard title="Weekly Appointment Statistics">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={appointmentStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" tick={{ fill: "#6b7280", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="completed" fill="#10B981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="cancelled" fill="#EF4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          {/* AI Chatbot Usage */}
          <ChartCard title="AI Chatbot Usage by Hour">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={aiChatbotUsage}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="hour" tick={{ fill: "#6b7280", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="messages" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        {/* Third Row Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Resource Usage */}
          <ChartCard title="Resource Hub Engagement">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={resourceUsage} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis type="number" tick={{ fill: "#6b7280", fontSize: 12 }} />
                  <YAxis type="category" dataKey="resource" tick={{ fill: "#6b7280", fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="views" fill="#ff3f74" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          {/* Gallery Activity */}
          <ChartCard title="Happiness Gallery Activity">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={galleryActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="uploads" stackId="1" stroke="#ff3f74" fill="#ff3f7430" />
                  <Area type="monotone" dataKey="likes" stackId="1" stroke="#10B981" fill="#10B98130" />
                  <Area type="monotone" dataKey="shares" stackId="1" stroke="#3B82F6" fill="#3B82F630" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        {/* Wellness Assessment Scores */}
        <ChartCard title="Wellness Assessment Average Scores" className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {wellnessAssessmentScores.map((item, index) => (
              <div key={index} className="text-center p-4 rounded-lg border border-gray-200">
                <h4 className="text-sm font-medium text-gray-600 mb-2">{item.category}</h4>
                <p className="text-2xl font-bold text-gray-900">{item.score}</p>
                <div className={`text-sm font-medium mt-1 ${item.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {item.change > 0 ? '+' : ''}{item.change}
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon={Camera}
            title="Calendar Mood Entries"
            value="3,421"
            subtitle="This month"
            trend="+23.1%"
            color="#8B5CF6"
          />
          <StatCard
            icon={BookOpen}
            title="Resource Views"
            value="12,456"
            subtitle="This week"
            trend="+18.7%"
            color="#06B6D4"
          />
          <StatCard
            icon={Activity}
            title="Peer Chat Messages"
            value="8,932"
            subtitle="Today"
            trend="+31.4%"
            color="#84CC16"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
