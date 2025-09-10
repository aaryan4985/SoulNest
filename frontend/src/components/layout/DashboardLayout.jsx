
import { useState } from "react";
import Sidebar from "./Sidebar";
import SidebarAdmin from "./SidebarAdmin";
import SOSPopup from "../SOSPopup";
import { useStore } from "../../store/userStore";
import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { FiMenu, FiX, FiPhone } from "react-icons/fi";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Default to true for admin sidebar
  const [sosPopupOpen, setSOSPopupOpen] = useState(false);
  const { user, setUser } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if current route is an admin page
  const isAdminPage = location.pathname.startsWith('/admin');

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
    navigate("/login");
  };

  const handleSOSClick = () => {
    setSOSPopupOpen(true);
  };

  const handleSOSConfirm = async () => {
    try {
      const response = await fetch("http://localhost:5000/sos/alert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          clientId: user?.uid || 'anonymous',
          clientName: user?.displayName || user?.email || 'Anonymous User',
          message: "Emergency assistance required - SOS button activated",
          location: "Web Application",
          timestamp: new Date().toISOString()
        })
      });

      const data = await response.json();
      
      if (data.success) {
        console.log("SOS alert sent successfully:", data.data);
      } else {
        console.error("Failed to send SOS alert:", data.message);
      }
    } catch (error) {
      console.error("Error sending SOS alert:", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Conditional Sidebar - Only show for non-admin pages */}
      {!isAdminPage && (
        <>
          {/* Sidebar for desktop */}
          <Sidebar 
            className={`hidden lg:flex transition-transform duration-500 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`} 
            user={user} 
            onSignOut={handleSignOut}
            onToggle={() => setSidebarOpen(!sidebarOpen)}
          />

          {/* Sidebar for mobile (overlay) */}
          {sidebarOpen && (
            <>
              <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={() => setSidebarOpen(false)} />
              <Sidebar 
                className="fixed inset-y-0 left-0 z-50 flex lg:hidden w-72 transition-transform duration-300 ease-in-out" 
                user={user} 
                onSignOut={handleSignOut}
                onToggle={() => setSidebarOpen(false)}
              />
            </>
          )}

          {/* Always visible toggle button when sidebar is closed */}
          {!sidebarOpen && (
            <div className="fixed top-4 left-4 z-50">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-3 rounded-xl bg-white shadow-lg border border-gray-200 hover:bg-gray-50 text-gray-700 transition-all duration-300 hover:scale-105"
                aria-label="Show sidebar"
              >
                <FiMenu className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}

      {/* Admin Sidebar - Only show for admin pages */}
      {isAdminPage && (
        <>
          {/* Admin Sidebar for desktop */}
          {sidebarOpen && (
            <SidebarAdmin 
              className="hidden lg:flex"
              onClose={() => setSidebarOpen(false)}
            />
          )}

          {/* Admin Sidebar for mobile (overlay) */}
          {sidebarOpen && (
            <>
              <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={() => setSidebarOpen(false)} />
              <SidebarAdmin 
                className="flex lg:hidden"
                onClose={() => setSidebarOpen(false)}
              />
            </>
          )}

          {/* Toggle button for admin pages */}
          {!sidebarOpen && (
            <div className="fixed top-4 left-4 z-50">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-3 rounded-xl bg-white shadow-lg border border-gray-200 hover:bg-gray-50 text-gray-700 transition-all duration-300 hover:scale-105"
                aria-label="Show sidebar"
              >
                <FiMenu className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}

      <div className={`flex-1 flex flex-col transition-all duration-500 ease-in-out h-screen ${
        isAdminPage 
          ? (sidebarOpen ? 'lg:ml-72' : 'lg:ml-0') // Admin pages use fixed sidebar like client pages
          : (sidebarOpen ? 'lg:ml-72' : 'lg:ml-0') // Client pages use overlay sidebar
      }`}>
        <main className="flex-1 h-full">
          {children}
        </main>
      </div>

      {/* Fixed SOS Button - Only show for non-admin pages */}
      {!isAdminPage && (
        <button
          onClick={handleSOSClick}
          className="fixed bottom-6 right-6 w-20 h-20 rounded-full text-white font-bold text-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 z-50 flex items-center justify-center border-4 border-white"
          style={{ 
            backgroundColor: '#ef4444',
            boxShadow: '0 0 0 6px #ef4444, 0 8px 32px rgba(0, 0, 0, 0.8), 0 4px 20px rgba(0, 0, 0, 0.6)'
          }}
          aria-label="Emergency SOS"
          title="Emergency SOS"
        >
          SOS
        </button>
      )}

      {/* SOS Popup */}
      <SOSPopup 
        isOpen={sosPopupOpen}
        onClose={() => setSOSPopupOpen(false)}
        onConfirm={handleSOSConfirm}
      />
    </div>
  );
}
