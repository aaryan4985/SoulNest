import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";

const data = [
  { factor: "Work", value: 6 },
  { factor: "Sleep", value: 8 },
  { factor: "Friends", value: 7 },
  { factor: "Health", value: 5 },
  { factor: "Weather", value: 6 },
];

export default function MoodRadarChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="factor" />
        <Radar name="Mood" dataKey="value" stroke="#16a34a" fill="#16a34a" fillOpacity={0.6} />
      </RadarChart>
    </ResponsiveContainer>
  );
}
