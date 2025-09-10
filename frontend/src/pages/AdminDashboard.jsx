import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Settings,
  Filter,
  Download,
  CheckCircle,
  Shield,
  Clock,
  BookOpen,
  UserCheck,
  Users,
  Activity,
  AlertTriangle
} from 'lucide-react';
import ProductExplainerSvg from '../assets/undraw_product-explainer_b7ft.svg';
import SidebarAdmin from '../components/layout/SidebarAdmin';
import SOSAlerts from '../components/SOSAlerts';

const AdminDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('This month');

  // Mental health statistics for college students
  const stats = {
    totalStudents: '15,420',
    studentsWithAnxiety: '4,862',
    anxietyPercentage: '31.5%',
    studentsWithDepression: '3,390',
    depressionPercentage: '22%',
    activeSessions: '1,247',
    completedSessions: '8,934',
    sessionGrowth: '+18%',
    supportRequests: '342',
    avgResponseTime: '24 min',
    successRate: '87.3%',
    ruralColleges: '89',
    urbanColleges: '156'
  };

  const mentalHealthTrends = [
    { month: 'Jan', anxiety: 28, depression: 19, stress: 35, sleep: 42 },
    { month: 'Feb', anxiety: 32, depression: 21, stress: 38, sleep: 45 },
    { month: 'Mar', anxiety: 35, depression: 24, stress: 42, sleep: 48 },
    { month: 'Apr', anxiety: 38, depression: 26, stress: 45, sleep: 52 },
    { month: 'May', anxiety: 31, depression: 22, stress: 40, sleep: 46 },
    { month: 'Jun', anxiety: 29, depression: 20, stress: 36, sleep: 43 }
  ];

  const weeklyData = [
    { day: 'Mon', sessions: 85, requests: 65 },
    { day: 'Tue', sessions: 72, requests: 45 },
    { day: 'Wed', sessions: 95, requests: 85 },
    { day: 'Thu', sessions: 88, requests: 70 },
    { day: 'Fri', sessions: 76, requests: 55 },
    { day: 'Sat', sessions: 45, requests: 35 },
    { day: 'Sun', sessions: 38, requests: 28 }
  ];

  const issueDistribution = [
    { name: 'Anxiety', percentage: 31.5, color: '#ff6b6b' },
    { name: 'Depression', percentage: 22, color: '#4ecdc4' },
    { name: 'Academic Stress', percentage: 45, color: '#45b7d1' },
    { name: 'Sleep Disorders', percentage: 28, color: '#96ceb4' },
    { name: 'Social Isolation', percentage: 19, color: '#feca57' },
    { name: 'Burnout', percentage: 16, color: '#ff9ff3' }
  ];

  const StatCard = ({ title, value, subtitle, icon: Icon, growth, status }) => (
    <div 
      className="rounded-xl p-6 shadow-sm border transition-all hover:shadow-md"
      style={{ backgroundColor: 'white', borderColor: '#ff3f74' }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium mb-2" style={{ color: '#000000', opacity: 0.6 }}>
            {title}
          </p>
          <p className="text-3xl font-bold mb-1" style={{ color: '#000000' }}>
            {value}
          </p>
          {subtitle && (
            <p className="text-sm" style={{ color: '#000000', opacity: 0.7 }}>
              {subtitle}
            </p>
          )}
          {growth && (
            <p className="text-sm font-medium mt-2" style={{ color: '#ff3f74' }}>
              {growth} since last month
            </p>
          )}
          {status && (
            <div className="flex items-center gap-2 mt-2">
              <CheckCircle className="w-4 h-4" style={{ color: '#ff3f74' }} />
              <span className="text-sm font-medium" style={{ color: '#ff3f74' }}>
                {status}
              </span>
            </div>
          )}
        </div>
        {Icon && (
          <div 
            className="p-3 rounded-lg"
            style={{ backgroundColor: '#ff3f74' }}
          >
            <Icon className="w-6 h-6" style={{ color: 'white' }} />
          </div>
        )}
      </div>
    </div>
  );

  const ChartCard = ({ title, children, className = "" }) => (
    <div 
      className={`rounded-xl p-6 shadow-sm border ${className}`}
      style={{ backgroundColor: 'white', borderColor: '#ff3f74' }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold" style={{ color: '#000000' }}>
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <button 
            className="p-2 rounded-lg border transition-colors hover:opacity-75"
            style={{ borderColor: '#ff3f74', color: '#ff3f74' }}
          >
            <Filter className="w-4 h-4" />
          </button>
          <button 
            className="p-2 rounded-lg border transition-colors hover:opacity-75"
            style={{ borderColor: '#ff3f74', color: '#ff3f74' }}
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
      {children}
    </div>
  );

  const WeeklyChart = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-end h-48">
        {weeklyData.map((item, index) => (
          <div key={item.day} className="flex flex-col items-center gap-2">
            <div className="flex flex-col justify-end h-40 gap-1">
              <div 
                className="w-6 rounded-t transition-all hover:opacity-75"
                style={{ 
                  height: `${(item.sessions / 100) * 100}%`, 
                  backgroundColor: '#ff3f74'
                }}
              />
              <div 
                className="w-6 rounded-t transition-all hover:opacity-75"
                style={{ 
                  height: `${(item.requests / 100) * 100}%`, 
                  backgroundColor: '#ff8fab'
                }}
              />
            </div>
            <span className="text-sm font-medium" style={{ color: '#000000', opacity: 0.7 }}>
              {item.day}
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#ff3f74' }}></div>
          <span style={{ color: '#000000', opacity: 0.7 }}>Sessions</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#ff8fab' }}></div>
          <span style={{ color: '#000000', opacity: 0.7 }}>Support Requests</span>
        </div>
      </div>
    </div>
  );

  const MentalHealthTrendChart = () => (
    <div className="relative h-64">
      <svg className="w-full h-full" viewBox="0 0 600 250">
        <defs>
          <linearGradient id="anxietyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#ff6b6b', stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: '#ff6b6b', stopOpacity: 0 }} />
          </linearGradient>
          <linearGradient id="depressionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#4ecdc4', stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: '#4ecdc4', stopOpacity: 0 }} />
          </linearGradient>
          <linearGradient id="stressGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#ff3f74', stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: '#ff3f74', stopOpacity: 0 }} />
          </linearGradient>
        </defs>
        
        {/* Anxiety trend line */}
        <path
          d="M 50 180 L 150 160 L 250 140 L 350 120 L 450 150 L 550 170"
          stroke="#ff6b6b"
          strokeWidth="3"
          fill="none"
          className="drop-shadow-sm"
        />
        
        {/* Depression trend line */}
        <path
          d="M 50 190 L 150 180 L 250 160 L 350 150 L 450 170 L 550 180"
          stroke="#4ecdc4"
          strokeWidth="3"
          fill="none"
          className="drop-shadow-sm"
        />
        
        {/* Stress trend line */}
        <path
          d="M 50 150 L 150 130 L 250 110 L 350 100 L 450 120 L 550 140"
          stroke="#ff3f74"
          strokeWidth="3"
          fill="none"
          className="drop-shadow-sm"
        />
      </svg>
      
      {/* Chart labels */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-8 text-xs" style={{ color: '#000000', opacity: 0.6 }}>
        {mentalHealthTrends.map(item => (
          <span key={item.month}>{item.month}</span>
        ))}
      </div>
      
      {/* Legend */}
      <div className="flex justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#ff6b6b' }}></div>
          <span style={{ color: '#000000', opacity: 0.7 }}>Anxiety</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#4ecdc4' }}></div>
          <span style={{ color: '#000000', opacity: 0.7 }}>Depression</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#ff3f74' }}></div>
          <span style={{ color: '#000000', opacity: 0.7 }}>Academic Stress</span>
        </div>
      </div>
    </div>
  );

  const IssueDistributionChart = () => (
    <div className="space-y-4">
      {issueDistribution.map((issue, index) => (
        <div key={issue.name} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium" style={{ color: '#000000' }}>
              {issue.name}
            </span>
            <span className="text-sm font-bold" style={{ color: '#000000' }}>
              {issue.percentage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="h-3 rounded-full transition-all duration-500"
              style={{ 
                width: `${issue.percentage}%`, 
                backgroundColor: issue.color 
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );

  const TrendChart = () => (
    <div className="relative h-48">
      <svg className="w-full h-full" viewBox="0 0 400 200">
        <defs>
          <linearGradient id="sessionsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#ff3f74', stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: '#ff3f74', stopOpacity: 0 }} />
          </linearGradient>
          <linearGradient id="requestsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#ff8fab', stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: '#ff8fab', stopOpacity: 0 }} />
          </linearGradient>
        </defs>
        
        {/* Sessions trend line */}
        <path
          d="M 20 120 Q 80 80 140 100 Q 200 60 260 80 Q 320 40 380 60"
          stroke="#ff3f74"
          strokeWidth="3"
          fill="none"
          className="drop-shadow-sm"
        />
        
        {/* Support requests trend line */}
        <path
          d="M 20 140 Q 80 120 140 130 Q 200 100 260 120 Q 320 80 380 100"
          stroke="#ff8fab"
          strokeWidth="3"
          fill="none"
          className="drop-shadow-sm"
        />
        
        {/* Area fills */}
        <path
          d="M 20 120 Q 80 80 140 100 Q 200 60 260 80 Q 320 40 380 60 L 380 200 L 20 200 Z"
          fill="url(#sessionsGradient)"
        />
        <path
          d="M 20 140 Q 80 120 140 130 Q 200 100 260 120 Q 320 80 380 100 L 380 200 L 20 200 Z"
          fill="url(#requestsGradient)"
        />
      </svg>
      
      {/* Chart labels */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 text-xs" style={{ color: '#000000', opacity: 0.6 }}>
        {['SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB'].map(month => (
          <span key={month}>{month}</span>
        ))}
      </div>
      
      {/* Legend */}
      <div className="flex justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#ff3f74' }}></div>
          <span style={{ color: '#000000', opacity: 0.7 }}>Completed Sessions</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#ff8fab' }}></div>
          <span style={{ color: '#000000', opacity: 0.7 }}>Help Requests</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#f4f8ff' }}>
      <div className="flex-1 flex flex-col p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div className="ml-20">
            <h1 className="text-3xl font-bold" style={{ color: '#ff3f74' }}>
              SoulNest Dashboard
            </h1>
            <p className="text-sm mt-1" style={{ color: '#000000', opacity: 0.7 }}>
              Mental Health Support Analytics for College Students
            </p>
          </div>
          
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: '#000000', opacity: 0.4 }} />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                style={{ 
                  backgroundColor: 'white', 
                  borderColor: '#ff3f74', 
                  color: '#000000'
                }}
              />
            </div>
            <button 
              className="p-2 rounded-lg border transition-colors hover:opacity-75"
              style={{ borderColor: '#ff3f74', color: '#ff3f74' }}
            >
              <Bell className="w-5 h-5" />
            </button>
            <button 
              className="p-2 rounded-lg border transition-colors hover:opacity-75"
              style={{ borderColor: '#ff3f74', color: '#ff3f74' }}
            >
              <Settings className="w-5 h-5" />
            </button>
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: '#ff3f74' }}
            >
              AP
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Students"
            value={stats.totalStudents}
            icon={Users}
          />
          <StatCard
            title="Students with Anxiety"
            value={stats.studentsWithAnxiety}
            subtitle={stats.anxietyPercentage}
            icon={AlertTriangle}
          />
          <StatCard
            title="Active Sessions"
            value={stats.activeSessions}
            growth={stats.sessionGrowth}
            icon={Activity}
          />
          <StatCard
            title="Success Rate"
            value={stats.successRate}
            status="Above target"
            icon={CheckCircle}
          />
        </div>

        {/* SOS Alerts Section */}
        <div className="mb-8">
          <SOSAlerts />
        </div>

        {/* Mental Health Overview with SVG */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div 
              className="rounded-xl p-6 shadow-sm border"
              style={{ backgroundColor: 'white', borderColor: '#ff3f74' }}
            >
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#000000' }}>
                Mental Health Crisis Overview
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm" style={{ color: '#000000', opacity: 0.7 }}>Depression Cases</span>
                    <span className="font-semibold" style={{ color: '#000000' }}>{stats.studentsWithDepression}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm" style={{ color: '#000000', opacity: 0.7 }}>Avg Response Time</span>
                    <span className="font-semibold" style={{ color: '#ff3f74' }}>{stats.avgResponseTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm" style={{ color: '#000000', opacity: 0.7 }}>Rural Colleges</span>
                    <span className="font-semibold" style={{ color: '#000000' }}>{stats.ruralColleges}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm" style={{ color: '#000000', opacity: 0.7 }}>Support Requests</span>
                    <span className="font-semibold" style={{ color: '#000000' }}>{stats.supportRequests}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm" style={{ color: '#000000', opacity: 0.7 }}>Completed Sessions</span>
                    <span className="font-semibold" style={{ color: '#ff3f74' }}>{stats.completedSessions}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm" style={{ color: '#000000', opacity: 0.7 }}>Urban Colleges</span>
                    <span className="font-semibold" style={{ color: '#000000' }}>{stats.urbanColleges}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div 
            className="rounded-xl p-6 shadow-sm border flex flex-col items-center justify-center text-center"
            style={{ backgroundColor: 'white', borderColor: '#ff3f74' }}
          >
            <img 
              src={ProductExplainerSvg} 
              alt="Mental Health Support" 
              className="w-32 h-32 mb-4 object-contain"
            />
            <h4 className="text-lg font-semibold mb-2" style={{ color: '#000000' }}>
              Bridging the Gap
            </h4>
            <p className="text-sm" style={{ color: '#000000', opacity: 0.7 }}>
              Providing accessible mental health support to college students across rural and urban institutions
            </p>
          </div>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Pending Consultations"
            value={stats.supportRequests}
            icon={Clock}
          />
          <StatCard
            title="Therapists Online"
            value="127"
            icon={UserCheck}
          />
          <StatCard
            title="Crisis Interventions"
            value="23"
            icon={Shield}
          />
          <StatCard
            title="Educational Resources"
            value="1,840"
            icon={BookOpen}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartCard title="Mental Health Trends (6 Months)">
            <MentalHealthTrendChart />
          </ChartCard>
          
          <ChartCard title="Weekly Activity">
            <WeeklyChart />
          </ChartCard>
        </div>

        {/* Additional Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Support Metrics Overview">
            <TrendChart />
          </ChartCard>
          
          <ChartCard title="Mental Health Issues Distribution">
            <IssueDistributionChart />
          </ChartCard>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;