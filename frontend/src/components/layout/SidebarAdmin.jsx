import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiUsers, FiBarChart3, FiSettings, FiLogOut, FiMessageSquare, FiX } from "react-icons/fi";
import SoulNestLogo from "../../assets/SOULNEST.svg";

const SidebarAdmin = ({ className = "", onClose }) => {
  return (
    <aside
      className={`w-72 h-screen fixed left-0 top-0 flex flex-col backdrop-blur border-r border-gray-200 p-6 transition-transform duration-300 ease-in-out z-30 ${className}`}
      style={{ backgroundColor: '#f4f8ff' }}
    >
      {/* Header with Logo and Close Button */}
      <div className="flex items-center justify-between mb-10">
        <img 
          src={SoulNestLogo} 
          alt="SoulNest" 
          className="h-20"
        />
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-200 text-gray-700 transition-colors"
            style={{ backgroundColor: '#ff3f74' }}
            aria-label="Close sidebar"
          >
            <FiX className="w-4 h-4 text-white" />
          </button>
        )}
      </div>

      <nav className="flex flex-col gap-1 flex-grow overflow-hidden">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition ${
              isActive ? "text-white" : "hover:bg-white/20 text-gray-700"
            }`
          }
          style={({ isActive }) => ({
            backgroundColor: isActive ? '#ff3f74' : 'transparent'
          })}
        >
          <FiHome className="shrink-0" />
          Home
        </NavLink>
        <NavLink
          to="/admin/chat"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition ${
              isActive ? "text-white" : "hover:bg-white/20 text-gray-700"
            }`
          }
          style={({ isActive }) => ({
            backgroundColor: isActive ? '#ff3f74' : 'transparent'
          })}
        >
          <FiMessageSquare className="shrink-0" />
          Admin Chat
        </NavLink>
      </nav>
    </aside>
  );
};

export default SidebarAdmin;