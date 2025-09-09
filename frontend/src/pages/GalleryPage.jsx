import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { useStore } from "../store/userStore";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Upload, X } from "lucide-react";

export default function GalleryPage() {
  const { user } = useStore();
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [memories, setMemories] = useState([]);
  const [zoomImage, setZoomImage] = useState(null);

  const cloudName = "dibdbo9dt";
  const uploadPreset = "memorylane_upload";

  // Fetch user's memories
  const fetchUserMemories = async (uid) => {
    const q = query(collection(db, "memories"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    const result = querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
    setMemories(result);
  };

  useEffect(() => {
    if (user) fetchUserMemories(user.uid);
  }, [user]);

  // Upload handler
  const handleUpload = async () => {
    if (!user) {
      alert("You must be logged in to upload memories.");
      return;
    }
    if (!file || !description) {
      alert("Please select a file and enter a description.");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      formData.append("folder", "memorylane");

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (!res.ok || !data.secure_url) throw new Error("Upload failed");

      await addDoc(collection(db, "memories"), {
        uid: user.uid,
        imageUrl: data.secure_url,
        description,
        createdAt: new Date(),
      });

      setFile(null);
      setDescription("");
      fetchUserMemories(user.uid);
    } catch (err) {
      console.error(err);
      alert("Upload failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete handler
  const handleDelete = async (memoryId) => {
    try {
      await deleteDoc(doc(db, "memories", memoryId));
      fetchUserMemories(user.uid);
    } catch (err) {
      console.error(err);
      alert("Delete failed: " + err.message);
    }
  };

  return (
    <div className="flex flex-col items-center px-4 py-8">
      {/* Header */}
      <h1 className="text-4xl font-extrabold mb-10 text-green-600 text-center">
        🌿 Happiness Gallery
      </h1>

      {/* Upload Box */}
      <motion.div
        className="bg-white p-6 rounded-3xl shadow-xl w-full max-w-lg text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg font-semibold mb-4 text-green-700">
          Upload a Happy Moment
        </h2>

        {/* Drag & Drop Area */}
        <div
          className={`border-2 border-dashed rounded-xl p-6 cursor-pointer mb-4 transition-colors ${
            file
              ? "border-green-500 bg-green-50"
              : "border-gray-300 hover:border-green-400 hover:bg-green-50"
          }`}
          onClick={() => document.getElementById("fileInput").click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            setFile(e.dataTransfer.files[0]);
          }}
        >
          {!file ? (
            <p className="text-gray-500">Drag & drop an image here, or click to select</p>
          ) : (
            <div className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-full h-48 object-cover rounded-xl mb-2"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                }}
                className="absolute top-2 right-2 bg-white text-red-500 p-1 rounded-full shadow hover:bg-red-100"
              >
                <X size={16} />
              </button>
            </div>
          )}
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
          />
        </div>

        {/* Description */}
        <input
          type="text"
          placeholder="Enter a description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
        />

        {/* Upload Button */}
        <motion.button
          onClick={handleUpload}
          disabled={loading}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl shadow hover:bg-green-600 transition disabled:opacity-50 mx-auto"
        >
          <Upload size={20} /> {loading ? "Uploading..." : "Upload"}
        </motion.button>
      </motion.div>

      {/* Memories */}
      <div className="w-full max-w-6xl mt-12 text-center">
        <h2 className="text-2xl font-bold mb-6 text-green-700">
          Your Memories
        </h2>

        {memories.length === 0 ? (
          <p className="text-gray-500">No memories yet. Start adding some!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {memories.map((m) => (
              <motion.div
                key={m.id}
                className="relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition flex flex-col"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={m.imageUrl}
                  alt="Memory"
                  className="w-full h-52 object-cover cursor-pointer"
                  onClick={() => setZoomImage(m.imageUrl)}
                />
                <p className="text-gray-700 p-4">{m.description}</p>

                <motion.button
                  onClick={() => handleDelete(m.id)}
                  whileHover={{ scale: 1.1, rotate: -10 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full shadow hover:bg-red-600"
                >
                  <Trash2 size={18} />
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Zoom Modal */}
      <AnimatePresence>
        {zoomImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomImage(null)} // Click outside closes modal
          >
            <motion.div
              className="relative max-w-4xl w-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
            >
              <img
                src={zoomImage}
                alt="Zoomed Memory"
                className="w-full rounded-lg shadow-lg"
              />
              <button
                onClick={() => setZoomImage(null)}
                className="absolute top-3 right-3 bg-white text-black p-2 rounded-full shadow hover:bg-gray-200"
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
