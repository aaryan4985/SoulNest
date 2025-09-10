import { useRef, useState } from "react";
import { Upload, File, X } from "lucide-react";

export default function CoolUploader() {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleRemove = () => {
    setFile(null);
    fileInputRef.current.value = ""; // reset input
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center w-full max-w-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        📂 Upload Your Memory
      </h2>

      {/* Hidden input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Drag & Drop Zone */}
      <div
        onClick={handleClick}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition ${
          dragOver
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-gray-50 hover:bg-gray-100"
        }`}
      >
        <Upload className="w-8 h-8 text-gray-500 mb-2" />
        <p className="text-gray-700 font-medium">
          Drag & Drop or <span className="text-blue-500">Choose File</span>
        </p>
        <p className="text-xs text-gray-500">JPG, PNG, MP4 up to 20MB</p>
      </div>

      {/* Preview Section */}
      {file && (
        <div className="mt-4 flex items-center gap-3 bg-gray-100 p-3 rounded-lg w-full">
          <File className="w-6 h-6 text-gray-600" />
          <span className="flex-1 text-gray-800 text-sm truncate">
            {file.name}
          </span>
          <button
            onClick={handleRemove}
            className="p-1 hover:bg-red-100 rounded-full transition"
          >
            <X className="w-5 h-5 text-red-500" />
          </button>
        </div>
      )}
    </div>
  );
}

