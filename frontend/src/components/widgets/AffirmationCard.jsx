export default function AffirmationCard() {
  return (
    <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 rounded-2xl shadow p-6">
      <h2 className="text-xl font-semibold mb-3">🌟 Daily Affirmation</h2>
      <p className="text-gray-700 italic mb-4">
        "I am in control of my emotions, and today I choose positivity."
      </p>
      <textarea
        placeholder="Write a quick mood note..."
        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
        rows={3}
      ></textarea>
    </div>
  );
}
