export default function Card({ title, right, children }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-soft ring-1 ring-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold tracking-tight text-gray-800">
          {title}
        </h2>
        {right}
      </div>
      {children}
    </div>
  );
}
