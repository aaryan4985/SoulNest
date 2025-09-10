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
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import { useStore } from "./store/userStore";

function ProtectedRoute({ user, authLoading, children }) {
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f8ff]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff3f74] mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  const location = useLocation();
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const [authLoading, setAuthLoading] = useState(true);

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, [setUser]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f8ff]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#ff3f74] mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading SoulNest...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {location.pathname === "/" && isLoading && (
        <div
          className={`fixed inset-0 z-50 ${isTransitioning ? "simple-zoom" : ""
            }`}
        >
          <LoadingPage onLoadingComplete={handleLoadingComplete} />
        </div>
      )}

      {(showLanding || !isLoading) && (
        <div
          className={`w-full transition-opacity duration-800 ${showLanding || !isLoading ? "opacity-100" : "opacity-0"
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
                <ProtectedRoute user={user} authLoading={authLoading}>
                  <DashboardLayout>
                    <StudentDashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute user={user} authLoading={authLoading}>
                  <DashboardLayout>
                    <AdminDashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/chatbot"
              element={
                <ProtectedRoute user={user} authLoading={authLoading}>
                  <DashboardLayout>
                    <AIChatbot />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/appointment"
              element={
                <ProtectedRoute user={user} authLoading={authLoading}>
                  <DashboardLayout>
                    <Appointment />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/resource"
              element={
                <ProtectedRoute user={user} authLoading={authLoading}>
                  <DashboardLayout>
                    <Resource />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/social"
              element={
                <ProtectedRoute user={user} authLoading={authLoading}>
                  <DashboardLayout>
                    <Social />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/tos"
              element={
                <ProtectedRoute user={user} authLoading={authLoading}>
                  <DashboardLayout>
                    <Tos />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/tracker"
              element={
                <ProtectedRoute user={user} authLoading={authLoading}>
                  <DashboardLayout>
                    <TrackerPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/gallery"
              element={
                <ProtectedRoute user={user} authLoading={authLoading}>
                  <DashboardLayout>
                    <GalleryPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/bot"
              element={
                <ProtectedRoute user={user} authLoading={authLoading}>
                  <DashboardLayout>
                    <BotPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <ProtectedRoute user={user} authLoading={authLoading}>
                  <DashboardLayout>
                    <ChatPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/calendar"
              element={
                <ProtectedRoute user={user} authLoading={authLoading}>
                  <DashboardLayout>
                    <CalendarPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/contentpage"
              element={
                <ProtectedRoute user={user} authLoading={authLoading}>
                  <DashboardLayout>
                    <ContentPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

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