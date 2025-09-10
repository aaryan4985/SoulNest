import { useState } from "react";
import Card from "../layout/Card";
import { useStore } from "../../store/userStore";


export default function ChatCard() {
const { messages, sendMessage } = useStore();
const [text, setText] = useState("");


const handleSend = () => {
if (!text.trim()) return;
sendMessage(text);
setText("");
};


return (
<Card title="AI Chatbot">
<div className="flex flex-col h-80">
<div className="flex-1 overflow-y-auto space-y-3 mb-3">
{messages.map((msg, i) => (
<div
key={i}
className={`p-3 rounded-2xl max-w-xs ${msg.role === "user" ? "bg-purple-600 text-white ml-auto" : "bg-gray-100 text-gray-800"}`}
>
{msg.content}
</div>
))}
</div>
<div className="flex gap-2">
<input
value={text}
onChange={(e) => setText(e.target.value)}
placeholder="Type your message..."
className="flex-1 rounded-xl border px-3 py-2"
/>
<button
onClick={handleSend}
className="px-4 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700"
>
Send
</button>
</div>
</div>
</Card>
);
}