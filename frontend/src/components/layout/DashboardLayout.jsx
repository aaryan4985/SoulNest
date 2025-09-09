
import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useStore } from "../../store/userStore";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, setUser } = useStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      <Sidebar className={`hidden lg:flex ${sidebarOpen ? '' : 'lg:hidden'}`} />

      {/* Sidebar for mobile (overlay) */}
      {sidebarOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={() => setSidebarOpen(false)} />
          <Sidebar className="fixed inset-y-0 left-0 z-50 flex lg:hidden w-72" />
        </>
      )}

      <div className="flex-1 flex flex-col">
        <Topbar user={user} onSignOut={handleSignOut} onToggleSidebar={() => setSidebarOpen((v) => !v)} sidebarOpen={sidebarOpen} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
