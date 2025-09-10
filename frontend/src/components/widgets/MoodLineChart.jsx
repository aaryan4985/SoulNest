import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { day: "Mon", mood: 6 },
  { day: "Tue", mood: 8 },
  { day: "Wed", mood: 7 },
  { day: "Thu", mood: 5 },
  { day: "Fri", mood: 9 },
  { day: "Sat", mood: 8 },
  { day: "Sun", mood: 7 },
];

export default function MoodLineChart() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📈 Weekly Mood Trend</h2>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" tick={{ fill: "#374151", fontWeight: "bold" }} />
            <YAxis domain={[0, 10]} tick={{ fill: "#374151", fontWeight: "bold" }} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="mood"
              stroke="#22c55e"
              strokeWidth={3}
              dot={{ r: 5, fill: "#22c55e" }}
              activeDot={{ r: 8, stroke: "#16a34a", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
