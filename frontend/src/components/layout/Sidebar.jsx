import { NavLink } from "react-router-dom";
import { FiHeart, FiImage, FiMessageCircle, FiCalendar, FiClock, FiClipboard, FiBookOpen, FiLogOut, FiX, FiMessageSquare, FiFileText } from "react-icons/fi";
import SoulNestLogo from '../../assets/SOULNEST.svg';

const navItems = [
  { to: "/tracker", label: "Happiness Tracker", icon: FiHeart },
  { to: "/chatbot", label: "AI Therapist", icon: FiMessageCircle },
  { to: "/client/chat", label: "Peer to Peer Chat", icon: FiMessageSquare },
  { to: "/appointment", label: "Book Appointment", icon: FiCalendar },
  { to: "/calendar", label: " Mood Calendar", icon: FiClock },
  { to: "/tos", label: "Wellness Assessment", icon: FiClipboard },
  { to: "/gallery", label: "Happiness Gallery", icon: FiImage },
  { to: "/contentpage", label: "Resource Hub", icon: FiBookOpen },
  { to: "/newspage", label: "News & Articles", icon: FiFileText },
];

export default function Sidebar({ className = "", user, onSignOut, onToggle }) {
  return (
    <aside className={`w-72 h-screen fixed left-0 top-0 flex flex-col backdrop-blur border-r border-gray-200 p-6 transition-transform duration-300 ease-in-out z-30 ${className}`} style={{ backgroundColor: '#f4f8ff' }}>
      <div className="flex items-center justify-between mb-10">
        <img 
          src={SoulNestLogo} 
          alt="SoulNest" 
          className="h-16"
        />
        <button
          onClick={onToggle}
          className="p-2 rounded-xl hover:bg-gray-200 text-gray-700 transition-colors"
          style={{ backgroundColor: '#ff3f74' }}
          aria-label="Close sidebar"
        >
          <FiX className="w-4 h-4 text-white" />
        </button>
      </div>
      
      <nav className="flex flex-col gap-1 flex-grow overflow-hidden">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition ${
                isActive ? "text-white" : "hover:bg-white/20 text-gray-700"
              }`
            }
            style={({ isActive }) => ({
              backgroundColor: isActive ? '#ff3f74' : 'transparent'
            })}
          >
            <Icon className="shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User Profile and Logout at bottom */}
      <div className="mt-auto pt-4 border-t border-white/20">
        <div className="flex items-center gap-3 px-4 py-2 mb-2">
          <img
            src={
              user?.photoURL ||
              `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
                user?.email || "U"
              )}`
            }
            alt="avatar"
            className="w-8 h-8 rounded-full ring-1 ring-white/30 shadow-sm"
          />
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm truncate text-gray-800">{user?.displayName || user?.email?.split("@")[0]}</div>
            <div className="text-xs text-gray-600 truncate">{user?.email}</div>
          </div>
        </div>
        
        <button
          onClick={onSignOut}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition text-white hover:opacity-90"
          style={{ backgroundColor: '#ff3f74' }}
        >
          <FiLogOut className="shrink-0 w-4 h-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}