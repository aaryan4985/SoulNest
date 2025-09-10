import { NavLink } from "react-router-dom";
import { FiBarChart2, FiImage, FiCpu, FiSend, FiCalendar, FiAlertTriangle } from "react-icons/fi";

const navItems = [
  { to: "/tracker", label: "Happiness Tracker", icon: FiBarChart2 },
  { to: "/gallery", label: "Happiness Gallery", icon: FiImage },
  { to: "/chatbot", label: "AI Therapist", icon: FiSend },
  { to: "/appointment", label: "Book Appointment  ", icon: FiCalendar },
  { to: "/calendar", label: "Calendar", icon: FiCalendar },
  { to: "/tos", label: "Psychological Assessment", icon: FiCalendar },
  { to: "/contentpage", label: "Resorce Hub", icon: FiCalendar },
];

export default function Sidebar({ className = "" }) {
  const handleSOS = () => {
    // Implement SOS functionality here
    // This could trigger an emergency contact, show resources, etc.
    alert("Emergency support is being contacted. You're not alone.");
  };

  return (
    <aside className={`w-72 flex-col bg-white/90 backdrop-blur border-r border-gray-200 p-6 transition-transform duration-300 ease-in-out ${className}`}>
      <div className="font-extrabold tracking-tight text-xl text-green-600 mb-10">HappyBoard</div>
      <nav className="flex flex-col gap-1 flex-grow">
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
        
        {/* SOS Button */}
        <button
          onClick={handleSOS}
          className="mt-auto flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800"
        >
          <FiAlertTriangle className="shrink-0" />
          SOS
        </button>
      </nav>
    </aside>
  );
}