import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";

const data = [
  { name: "Happy", value: 12 },
  { name: "Neutral", value: 8 },
  { name: "Sad", value: 5 },
  { name: "Stressed", value: 4 },
  { name: "Excited", value: 6 },
];

const COLORS = ["#22c55e", "#3b82f6", "#ef4444", "#f59e0b", "#a855f7"];

export default function MoodBarChart() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📊 Mood Categories</h2>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={40}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" tick={{ fill: "#374151", fontWeight: "bold" }} />
            <YAxis tick={{ fill: "#374151", fontWeight: "bold" }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" radius={[12, 12, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
