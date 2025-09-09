import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { name: "Happy", value: 45 },
  { name: "Neutral", value: 25 },
  { name: "Sad", value: 15 },
  { name: "Stressed", value: 10 },
  { name: "Excited", value: 5 },
];

const COLORS = ["#22c55e", "#3b82f6", "#ef4444", "#f59e0b", "#a855f7"];

export default function MoodPieChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </ResponsiveContainer>
  );
}
