import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Card from "../layout/Card";
import { useStore } from "../../store/userStore";


export default function HappinessCard() {
const { moodData } = useStore();


return (
<Card title="Happiness Tracker">
<div className="h-64">
<ResponsiveContainer width="100%" height="100%">
<LineChart data={moodData}>
<CartesianGrid strokeDasharray="3 3" stroke="#eee" />
<XAxis dataKey="day" />
<YAxis domain={[0, 10]} />
<Tooltip />
<Line type="monotone" dataKey="mood" stroke="#7C3AED" strokeWidth={3} dot={{ r: 5 }} />
</LineChart>
</ResponsiveContainer>
</div>
</Card>
);
}