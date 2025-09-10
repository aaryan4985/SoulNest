import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip } from "recharts";

const data = [
  { influencer: "Work", x: 30, y: 50, z: 200 },
  { influencer: "Friends", x: 50, y: 80, z: 300 },
  { influencer: "Health", x: 70, y: 40, z: 250 },
  { influencer: "Sleep", x: 40, y: 20, z: 180 },
  { influencer: "Weather", x: 60, y: 70, z: 220 },
];

export default function MoodBubbleChart() {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">🌐 Top Mood Influencers</h2>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
          <XAxis type="number" dataKey="x" hide />
          <YAxis type="number" dataKey="y" hide />
          <ZAxis type="number" dataKey="z" range={[100, 500]} />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter data={data} fill="#60a5fa" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
