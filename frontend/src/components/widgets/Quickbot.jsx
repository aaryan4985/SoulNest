import Card from "../layout/Card";
import toast from "react-hot-toast";
import { useStore } from "../../store/userStore";


export default function QuickBotCard() {
const { addMood } = useStore();


return (
<Card title="AI Bot Quick Actions">
<div className="flex flex-col gap-3">
<button
onClick={() => { addMood(10); toast.success("Boosted mood to the max!"); }}
className="px-4 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition"
>
Cheer Me Up 🎉
</button>
<button
onClick={() => { addMood(7); toast("Mood nudged to 7 😌"); }}
className="px-4 py-2 rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition"
>
Nudge Me 🙂
</button>
</div>
</Card>
);
}