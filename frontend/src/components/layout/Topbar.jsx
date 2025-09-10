import { FiLogOut, FiMenu, FiX } from "react-icons/fi";

export default function Topbar({ user, onSignOut, onToggleSidebar, sidebarOpen }) {
  return (
    <div className="flex items-center justify-between gap-4 mb-4 bg-white/90 backdrop-blur border-b border-gray-200 p-4">
      {/* Sidebar toggle button - now visible on all screen sizes */}
      <button
        onClick={onToggleSidebar}
        className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
        aria-label={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
      >
        {sidebarOpen ? <FiX /> : <FiMenu />}
      </button>

      <div className="flex items-center gap-4">
        {/* User info */}
        <div className="text-right hidden sm:block">
          <div className="font-semibold">{user?.displayName || user?.email?.split("@")[0]}</div>
          <div className="text-xs text-gray-500">{user?.email}</div>
        </div>

        {/* Avatar */}
        <img
          src={
            user?.photoURL ||
            `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
              user?.email || "U"
            )}`
          }
          alt="avatar"
          className="w-10 h-10 rounded-full ring-2 ring-white shadow"
        />

        {/* Logout */}
        <button
          onClick={onSignOut}
          className="inline-flex items-center gap-2 rounded-xl px-3 py-2 bg-green-600 text-white hover:bg-red-600 transition"
        >
          <FiLogOut /> <span className="hidden sm:inline">Sign out</span>
        </button>
      </div>
    </div>
  );
}
