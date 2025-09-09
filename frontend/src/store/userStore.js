import { create } from "zustand";

export const useStore = create((set, get) => ({
  // Auth
  user: null,
  setUser: (user) => set({ user }),

  // Mood data
  moodData: [
    { day: "Mon", mood: 6 },
    { day: "Tue", mood: 7 },
    { day: "Wed", mood: 5 },
    { day: "Thu", mood: 8 },
    { day: "Fri", mood: 7 },
    { day: "Sat", mood: 9 },
    { day: "Sun", mood: 6 },
  ],
  addMood: (value) => {
    const arr = get().moodData.slice(1);
    const day = new Date().toLocaleString(undefined, { weekday: "short" });
    arr.push({ day, mood: value });
    set({ moodData: arr });
  },

  // Images
  images: [],
  addImages: (files) =>
    set({
      images: [
        ...get().images,
        ...files.map((f) =>
          Object.assign(f, { preview: URL.createObjectURL(f) })
        ),
      ],
    }),
  removeImage: (i) =>
    set({
      images: get().images.filter((_, idx) => idx !== i),
    }),

  // Chatbot
  messages: [
    { role: "assistant", content: "Hey! I'm your mood buddy. Tell me how you're feeling today." },
  ],
  sendMessage: (text) => {
    const userMsg = { role: "user", content: text };
    const replies = [
      "I hear you. What do you think might help a little today?",
      "Thanks for sharing. Want to try a 2-minute breathing break?",
      "Noted. What went well lately, even if small?",
      "I'm with you. A short walk can lift the graph too!",
    ];
    const reply = replies[Math.floor(Math.random() * replies.length)];
    set({
      messages: [...get().messages, userMsg, { role: "assistant", content: reply }],
    });
  },
}));
