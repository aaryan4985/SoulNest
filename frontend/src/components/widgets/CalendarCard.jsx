import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Card from "../layout/Card";
import "./calendar-theme.css";


export default function CalendarCard() {
return (
<Card title="Calendar">
<div className="flex justify-center">
<Calendar className="themed-calendar rounded-2xl border-none shadow-sm" />
</div>
</Card>
);
}