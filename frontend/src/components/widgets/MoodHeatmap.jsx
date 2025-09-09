export default function MoodHeatmap() {
  const days = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    mood: Math.floor(Math.random() * 10),
  }));

  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((d) => (
        <div
          key={d.day}
          className={`w-10 h-10 flex items-center justify-center rounded-md text-xs font-bold
            ${d.mood > 7 ? "bg-green-400 text-white" :
              d.mood > 4 ? "bg-yellow-400 text-black" :
              "bg-red-400 text-white"}`}
        >
          {d.day}
        </div>
      ))}
    </div>
  );
}
