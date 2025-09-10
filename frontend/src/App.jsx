import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoadingPage from "./components/LoadingPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AIChatbot from "./pages/AIChatbot";
import Appointment from "./pages/Appointment";
import Resource from "./pages/Resource";
import Social from "./pages/Social";
import Tos from "./pages/Tos";
import MentalHealthSurvey from "./pages/form";
import DashboardLayout from "./components/layout/DashboardLayout";
import TrackerPage from "./pages/Trackerpage";
import GalleryPage from "./pages/GalleryPage";
import BotPage from "./pages/BotPage";
import ChatPage from "./pages/ChatPage";
import CalendarPage from "./pages/CalenderPage";
import ContentPage from "./pages/ContentPage";
import AdminChat from "./pages/AdminChat";
import ClientChat from "./pages/ClientChat";
import NewsPage from "./pages/NewsPage";
import AdminAnalytics from "./pages/AdminAnalytics";

function App() {
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(location.pathname === "/");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showLanding, setShowLanding] = useState(false);

  const handleLoadingComplete = () => {
    setIsTransitioning(true);
    setShowLanding(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsTransitioning(false);
    }, 800);
  };

  return (
    <div className="relative">
      {/* Loading Page only for "/" */}
      {location.pathname === "/" && isLoading && (
        <div
          className={`fixed inset-0 z-50 ${
            isTransitioning ? "simple-zoom" : ""
          }`}
        >
          <LoadingPage onLoadingComplete={handleLoadingComplete} />
        </div>
      )}

      {/* Pages */}
      {(showLanding || !isLoading) && (
        <div
          className={`w-full transition-opacity duration-800 ${
            showLanding || !isLoading ? "opacity-100" : "opacity-0"
          }`}
        >
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/survey" element={<MentalHealthSurvey />} />
            <Route
              path="/student/dashboard"
              element={
                <DashboardLayout>
                  <StudentDashboard />
                </DashboardLayout>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <DashboardLayout>
                  <AdminDashboard />
                </DashboardLayout>
              }
            />
            <Route
              path="/admin/chat"
              element={
                <DashboardLayout>
                  <AdminChat />
                </DashboardLayout>
              }
            />
            <Route
              path="/admin/analytics"
              element={
                <DashboardLayout>
                  <AdminAnalytics />
                </DashboardLayout>
              }
            />
            <Route
              path="/chatbot"
              element={
                <DashboardLayout>
                  <AIChatbot />
                </DashboardLayout>
              }
            />
            <Route
              path="/appointment"
              element={
                <DashboardLayout>
                  <Appointment />
                </DashboardLayout>
              }
            />
            <Route
              path="/resource"
              element={
                <DashboardLayout>
                  <Resource />
                </DashboardLayout>
              }
            />
            <Route
              path="/social"
              element={
                <DashboardLayout>
                  <Social />
                </DashboardLayout>
              }
            />
            <Route
              path="/tos"
              element={
                <DashboardLayout>
                  <Tos />
                </DashboardLayout>
              }
            />
            <Route
              path="/tracker"
              element={
                <DashboardLayout>
                  <TrackerPage />
                </DashboardLayout>
              }
            />
            <Route
              path="/gallery"
              element={
                <DashboardLayout>
                  <GalleryPage />
                </DashboardLayout>
              }
            />
            <Route
              path="/bot"
              element={
                <DashboardLayout>
                  <BotPage />
                </DashboardLayout>
              }
            />
            <Route
              path="/chat"
              element={
                <DashboardLayout>
                  <ChatPage />
                </DashboardLayout>
              }
            />
            <Route
              path="/client/chat"
              element={
                <DashboardLayout>
                  <ClientChat />
                </DashboardLayout>
              }
            />
            <Route
              path="/calendar"
              element={
                <DashboardLayout>
                  <CalendarPage />
                </DashboardLayout>
              }
            />
            <Route
              path="/contentpage"
              element={
                <DashboardLayout>
                  <ContentPage />
                </DashboardLayout>
              }
            />
            <Route
              path="/newspage"
              element={
                <DashboardLayout>
                  <NewsPage />
                </DashboardLayout>
              }
            />
            <Route
              path="/form"
              element={
                <DashboardLayout>
                  <MentalHealthSurvey />
                </DashboardLayout>
              }
            />
            <Route path="/survey" element={<MentalHealthSurvey />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
