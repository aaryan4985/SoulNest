import React, { useState, useEffect } from "react";

const LoadingPage = ({ onLoadingComplete }) => {
  const [showPage, setShowPage] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Fade in the entire page first
    setShowPage(true);

    // Then fade in content with slight delay
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 200);

    // Complete loading quickly
    const completeTimer = setTimeout(() => {
      onLoadingComplete();
    }, 1500);

    return () => {
      clearTimeout(contentTimer);
      clearTimeout(completeTimer);
    };
  }, [onLoadingComplete]);

  const letters = "Entering".split("");

  return (
    <div
      className={`w-full h-full bg-black flex flex-col items-center justify-center transition-opacity duration-500 ${
        showPage ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Simple Entering Text */}
      <div
        className={`mb-8 transition-opacity duration-500 ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1
          className="text-6xl md:text-8xl lg:text-9xl font-bold text-center text-white"
          style={{
            fontFamily: "VogueFont, serif",
            textShadow:
              "0 0 10px rgba(255, 255, 255, 0.3), 0 0 20px rgba(255, 255, 255, 0.2)",
          }}
        >
          Entering
        </h1>
      </div>

      {/* Simple Tagline */}
      <div
        className={`text-center transition-opacity duration-500 delay-300 ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      >
        <p
          className="text-xl md:text-2xl lg:text-3xl text-white font-medium"
          style={{
            fontFamily: "VogueFont, serif",
            textShadow:
              "0 0 8px rgba(255, 255, 255, 0.25), 0 0 15px rgba(255, 255, 255, 0.15)",
          }}
        >
          Your one stop destination for peace
        </p>
      </div>

      {/* Simple Loading Dots */}
      <div
        className={`mt-12 transition-opacity duration-500 delay-500 ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex space-x-2">
          <div
            className="w-3 h-3 bg-white rounded-full animate-pulse"
            style={{ boxShadow: "0 0 6px rgba(255, 255, 255, 0.4)" }}
          ></div>
          <div
            className="w-3 h-3 bg-white rounded-full animate-pulse delay-150"
            style={{ boxShadow: "0 0 6px rgba(255, 255, 255, 0.4)" }}
          ></div>
          <div
            className="w-3 h-3 bg-white rounded-full animate-pulse delay-300"
            style={{ boxShadow: "0 0 6px rgba(255, 255, 255, 0.4)" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
