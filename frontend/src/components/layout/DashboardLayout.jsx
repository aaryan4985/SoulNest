
import { useState } from "react";
import Sidebar from "./Sidebar";
import { useStore } from "../../store/userStore";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { FiMenu, FiX } from "react-icons/fi";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, setUser } = useStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
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

      <div className={`flex-1 flex flex-col transition-all duration-500 ease-in-out ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-0'}`}>
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
