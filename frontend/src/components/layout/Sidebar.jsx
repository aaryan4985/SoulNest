import { NavLink } from "react-router-dom";
import { FiBarChart2, FiImage, FiCpu, FiSend, FiCalendar, FiLogOut, FiX } from "react-icons/fi";
import SoulNestLogo from '../../assets/SOULNEST.svg';

const navItems = [
  { to: "/tracker", label: "Happiness Tracker", icon: FiBarChart2 },
  { to: "/gallery", label: "Happiness Gallery", icon: FiImage },
  { to: "/chatbot", label: "AI Therapist", icon: FiSend },
  { to: "/appointment", label: "Book Appointment  ", icon: FiCalendar },
  { to: "/calendar", label: "Calendar", icon: FiCalendar },
  { to: "/tos", label: "Psychological Assessment", icon: FiCalendar },
  { to: "/contentpage", label: "Resorce Hub", icon: FiCalendar },
];

export default function Sidebar({ className = "", user, onSignOut, onToggle }) {
  return (
    <aside className={`w-72 h-screen fixed left-0 top-0 flex flex-col bg-white/95 backdrop-blur border-r border-gray-200 p-6 transition-transform duration-300 ease-in-out z-30 ${className}`}>
      <div className="flex items-center justify-between mb-10">
        <img 
          src={SoulNestLogo} 
          alt="SoulNest" 
          className="h-10"
        />
        <button
          onClick={onToggle}
          className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
          aria-label="Close sidebar"
        >
          <FiX className="w-4 h-4" />
        </button>
      </div>
      
      <nav className="flex flex-col gap-1 flex-grow overflow-y-auto">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition ${
                isActive ? "bg-green-100 text-green-700" : "hover:bg-gray-50 text-gray-700"
              }`
            }
          >
            <Icon className="shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User Profile and Logout at bottom */}
      <div className="mt-auto pt-4 border-t border-gray-200">
        <div className="flex items-center gap-3 px-4 py-2 mb-2">
          <img
            src={
              user?.photoURL ||
              `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
                user?.email || "U"
              )}`
            }
            alt="avatar"
            className="w-8 h-8 rounded-full ring-1 ring-gray-300 shadow-sm"
          />
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm truncate">{user?.displayName || user?.email?.split("@")[0]}</div>
            <div className="text-xs text-gray-500 truncate">{user?.email}</div>
          </div>
        </div>
        
        <button
          onClick={onSignOut}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800"
        >
          <FiLogOut className="shrink-0 w-4 h-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}