
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AIChatbot from './pages/AIChatbot';
import Appointment from './pages/Appointment';
import Resource from './pages/Resource';
import Social from './pages/Social';
import Tos from './pages/Tos';
import DashboardLayout from "./components/layout/DashboardLayout";
import TrackerPage from "./pages/Trackerpage";
import GalleryPage from "./pages/GalleryPage";
import BotPage from "./pages/BotPage";
import ChatPage from "./pages/ChatPage";
import CalendarPage from "./pages/CalenderPage";
import { Navigate } from 'react-router-dom';
function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student/dashboard" element={<DashboardLayout><StudentDashboard /></DashboardLayout>} />
        <Route path="/admin/dashboard" element={<DashboardLayout><AdminDashboard /></DashboardLayout>} />
        <Route path="/chatbot" element={<DashboardLayout><AIChatbot /></DashboardLayout>} />
        <Route path="/appointment" element={<DashboardLayout><Appointment /></DashboardLayout>} />
        <Route path="/resource" element={<DashboardLayout><Resource /></DashboardLayout>} />
        <Route path="/social" element={<DashboardLayout><Social /></DashboardLayout>} />
        <Route path="/tos" element={<DashboardLayout><Tos /></DashboardLayout>} />
        <Route path="/tracker" element={<DashboardLayout><TrackerPage /></DashboardLayout>} />
        <Route path="/gallery" element={<DashboardLayout><GalleryPage /></DashboardLayout>} />
        <Route path="/bot" element={<DashboardLayout><BotPage /></DashboardLayout>} />
        <Route path="/chat" element={<DashboardLayout><ChatPage /></DashboardLayout>} />
        <Route path="/calendar" element={<DashboardLayout><CalendarPage /></DashboardLayout>} />
        <Route path="*" element={<Navigate to="/tracker" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
