import HappinessCard from "../components/widgets/HappinessCard";
import TodayMoodCard from "../components/widgets/TodayMoodCard";
import UploaderCard from "../components/widgets/UploaderCard";
import QuickBotCard from "../components/widgets/Quickbot";
import CalendarCard from "../components/widgets/CalendarCard";
import ChatCard from "../components/widgets/ChatCard";
import MoodPieChart from "../components/widgets/MoodPieChart";
import MoodLineChart from "../components/widgets/MoodLineChart";
import MoodBarChart from "../components/widgets/MoodBarChart";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white text-gray-900 p-6 font-sans">
      {/* Top header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold">Mood Analytics</h1>
        <div className="flex gap-6">
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl shadow">
            😊 Happiness Score: <span className="font-bold">7.8</span>
          </div>
          <div className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-xl shadow">
            📊 Balance: <span className="font-bold">+5 Positive</span>
          </div>
          <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl shadow">
            🔥 Streak: <span className="font-bold">12 days</span>
          </div>
        </div>
      </header>

      {/* Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left section */}
        <div className="lg:col-span-2 space-y-6">
          <HappinessCard />
          <MoodLineChart /> {/* Replaces boring chart with smooth trend line */}
          <MoodBarChart />  {/* Comparative moods per activity */}
          <UploaderCard />
          <ChatCard />
        </div>

        {/* Right section */}
        <div className="space-y-6">
          <TodayMoodCard />
          <MoodPieChart /> {/* Distribution chart */}
          <QuickBotCard />
          <CalendarCard />
        </div>
      </div>
    </div>
  );
}
