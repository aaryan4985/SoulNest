import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PreviewVideo from "../assets/Previewvideo.mp4";
import starIcon from "../assets/star.png";
import fastIcon from "../assets/fast.png";
import secureIcon from "../assets/secure.png";
import trustIcon from "../assets/trust.png";
import targetIcon from "../assets/target.png";
import styled from "styled-components";
import talkIcon from "../assets/talk.png";
import loveIcon from "../assets/love.png";
import growthIcon from "../assets/growth.png";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";
import { Pie, Bar, Doughnut, Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);



// Chart Data
const stressLevelsData = {
  labels: ["Low Stress", "Moderate Stress", "High Stress"],
  datasets: [
    {
      data: [28, 45, 27],
      backgroundColor: ["#00FF87", "#FF6B35", "#FF006E"],
      borderColor: ["#00D966", "#E85A2B", "#D4005A"],
      borderWidth: 3,
    },
  ],
};

const commonIssuesData = {
  labels: [
    "Anxiety",
    "Academic Pressure",
    "Sleep Issues",
    "Depression",
    "Social Isolation",
  ],
  datasets: [
    {
      label: "Percentage of Students",
      data: [32, 29, 18, 12, 9],
      backgroundColor: "#8A2BE2",
      borderColor: "#6A1B9A",
      borderWidth: 2,
    },
  ],
};

const helpSeekingData = {
  labels: [
    "Peer Support",
    "Counsellor",
    "Online Resources",
    "Family/Friends",
    "Would Not Seek Help",
  ],
  datasets: [
    {
      data: [30, 25, 20, 15, 10],
      backgroundColor: ["#FF006E", "#FB8500", "#8ECAE6", "#219EBC", "#023047"],
      borderColor: ["#D4005A", "#D16900", "#6FB8D9", "#1A7A96", "#012733"],
      borderWidth: 3,
    },
  ],
};

const weeklyMoodData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  datasets: [
    {
      label: "Happy",
      data: [20, 25, 22, 30],
      borderColor: "#00FF87",
      backgroundColor: "rgba(0, 255, 135, 0.3)",
      tension: 0.4,
      borderWidth: 4,
    },
    {
      label: "Neutral",
      data: [50, 48, 52, 45],
      borderColor: "#FFD60A",
      backgroundColor: "rgba(255, 214, 10, 0.3)",
      tension: 0.4,
      borderWidth: 4,
    },
    {
      label: "Sad/Anxious",
      data: [30, 27, 26, 25],
      borderColor: "#FF006E",
      backgroundColor: "rgba(255, 0, 110, 0.3)",
      tension: 0.4,
      borderWidth: 4,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  onHover: (event, chartElement) => {
    event.native.target.style.cursor = chartElement.length
      ? "pointer"
      : "default";
  },
  plugins: {
    legend: {
      labels: {
        color: "#000000",
        font: {
          family: "Poppins",
          size: 16, // Increased from 12
        },
        padding: 20, // More spacing around legend items
      },
    },
    tooltip: {
      titleFont: {
        family: "Poppins",
        size: 16, // Increased tooltip title size
      },
      bodyFont: {
        family: "Poppins",
        size: 14, // Increased tooltip body size
      },
    },
  },
  animation: {
    duration: 2000, // 2 seconds animation
    easing: "easeInOutQuart",
    delay: (context) => context.dataIndex * 200, // Stagger animation by 200ms per data point
  },
  scales: {
    y: {
      ticks: {
        color: "#000000",
        font: {
          family: "Poppins",
          size: 14, // Increased from default
        },
      },
      grid: {
        color: "rgba(0, 0, 0, 0.1)",
      },
    },
    x: {
      ticks: {
        color: "#000000",
        font: {
          family: "Poppins",
          size: 14, // Increased from default
        },
      },
      grid: {
        color: "rgba(0, 0, 0, 0.1)",
      },
    },
  },
};

const pieChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  onHover: (event, chartElement) => {
    event.native.target.style.cursor = chartElement.length
      ? "pointer"
      : "default";
  },
  plugins: {
    legend: {
      labels: {
        color: "#000000",
        font: {
          family: "Poppins",
          size: 16, // Increased from 12
        },
        padding: 20, // More spacing around legend items
      },
    },
    tooltip: {
      titleFont: {
        family: "Poppins",
        size: 16, // Increased tooltip title size
      },
      bodyFont: {
        family: "Poppins",
        size: 14, // Increased tooltip body size
      },
    },
  },
  animation: {
    duration: 2000, // 2 seconds animation
    easing: "easeInOutQuart",
    animateRotate: true, // Specific to pie charts - animates the rotation
    animateScale: true, // Specific to pie charts - animates the scaling
  },
};

// Styled component for new action buttons
const ActionButtonWrapper = styled.div`
  .button {
    text-decoration: none;
    line-height: 1;
    border-radius: 50px;
    overflow: hidden;
    position: relative;
    background-color: var(--clr);
    color: #000; /* dark text for light backgrounds */
    border: 1px solid rgba(0, 0, 0, 0.12);
    box-sizing: border-box;
    cursor: pointer;
    width: 100%;
    min-height: 80px;
    transition: transform 0.28s ease, border-width 0.2s ease,
      border-color 0.2s ease, box-shadow 0.28s ease, border-radius 0.28s ease;
  }

  .button-decor {
    position: absolute;
    inset: 0;
    background-color: #f4f8ff;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 0;
    border-radius: 50px;
    mix-blend-mode: overlay;
    opacity: 0.9;
  }

  .button-content {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    position: relative;
    overflow: hidden;
    padding: 1rem 1.5rem;
    z-index: 1;
  }

  .button__icon {
    width: 44px;
    height: 44px;
    display: grid;
    place-items: center;
    border-radius: 9999px; /* fully circular */
    margin-right: 1rem;
    overflow: hidden;
    transition: transform 0.28s ease, border-radius 0.28s ease;
  }
  .button__text-container {
    position: relative;
    overflow: hidden;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .button__text {
    display: block;
    font-size: 1.5rem;
    font-family: "VogueFont", serif;
    font-weight: 700;
    color: #000;
    letter-spacing: 1px;
    text-transform: uppercase;
    position: absolute;
    transition: all 0.3s ease;
    white-space: nowrap;
    top: 50%;
    left: 50%;
    transform-origin: center;
  }

  .button__text--default {
    transform: translate(-50%, -50%) translateY(0);
    opacity: 1;
  }

  .button__text--hover {
    transform: translate(-50%, -50%) translateY(100%);
    opacity: 0;
  }

  .button:hover {
    border-color: #000;
    border-width: 2px;
  }
  .button:hover {
    background-color: var(--hover-clr, var(--clr));
  }

  .button:hover .button__text {
    color: #000;
  }

  .button:hover .button__text--default {
    transform: translate(-50%, -50%) translateY(-100%);
    opacity: 0;
  }

  .button:hover .button__text--hover {
    transform: translate(-50%, -50%) translateY(0);
    opacity: 1;
  }

  .button:hover .button-decor {
    transform: translate(0);
  }

  .button:hover .button__icon {
    transform: scale(1.05);
  }
`;

const ActionButton = ({ text, hoverText, icon, color }) => {
  return (
    <ActionButtonWrapper>
      <button className="button" style={{ "--clr": color }}>
        <span className="button-decor" />
        <div className="button-content">
          <div className="button__icon">{icon}</div>
          <div className="button__text-container">
            <span className="button__text button__text--default">{text}</span>
            <span className="button__text button__text--hover">
              {hoverText}
            </span>
          </div>
        </div>
      </button>
    </ActionButtonWrapper>
  );
};

// Styled component for 3D flip buttons
const FlipButtonWrapper = styled.div`
  .scene {
    width: 100%;
    justify-content: center;
    align-items: center;
    margin: 0;
  }

  .cube {
    color: #ccc;
    cursor: pointer;
    font-family: "VogueFont", serif;
    transition: all 0.85s cubic-bezier(0.17, 0.67, 0.14, 0.93);
    transform-style: preserve-3d;
    transform-origin: 100% 50%;
    width: 100%;
    height: 6em;
  }

  .cube:hover {
    transform: rotateX(-90deg);
  }

  .side {
    box-sizing: border-box;
    position: absolute;
    display: inline-block;
    height: 6em;
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    padding-top: 2.2em;
    font-weight: bold;
    font-size: 1.8rem;
  }

  .top {
    background: #ff3f74;
    color: #f4f8ff;
    transform: rotateX(90deg) translate3d(0, 0, 3em);
    box-shadow: inset 0 0 0 2px #4a904a;
  }

  .front {
    background: #4a904a;
    color: #f4f8ff;
    box-shadow: inset 0 0 0 2px #ff3f74;
    transform: translate3d(0, 0, 3em);
  }
`;

const FlipButton = ({ frontText, backText }) => {
  return (
    <FlipButtonWrapper>
      <div className="scene">
        <div className="cube">
          <span className="side top">{backText}</span>
          <span className="side front">{frontText}</span>
        </div>
      </div>
    </FlipButtonWrapper>
  );
};

// Styled component for scroll-to-top button
const StyledWrapper = styled.div`
  .button {
    position: relative;
    border: none;
    background: transparent;
    padding: 0;
    outline: none;
    cursor: pointer;
    font-family: monospace;
    font-weight: 300;
    text-transform: uppercase;
    font-size: 16px;
  }

  .button-shadow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.25);
    transform: translateY(2px);
    transition: all 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
  }

  .button:hover .button-shadow {
    transform: translateY(4px);
    transition-duration: 250ms;
  }

  .button:active .button-shadow {
    transform: translateY(1px);
  }

  .button-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to left, #000000, #2a2a2a, #000000);
  }

  .button-content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 24px;
    font-size: 18px;
    color: white;
    transform: translateY(-4px);
    background: linear-gradient(to right, #000000, #1a1a1a, #000000);
    gap: 12px;
    transition: all 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
    filter: brightness(100%);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.3),
      0 0 40px rgba(255, 255, 255, 0.1);
  }

  .button:hover .button-content {
    transform: translateY(-6px);
    transition-duration: 250ms;
    filter: brightness(110%);
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.5),
      0 0 60px rgba(255, 255, 255, 0.2);
  }

  .button:active .button-content {
    transform: translateY(-2px);
  }

  .button-text {
    user-select: none;
  }

  .button-icon {
    width: 20px;
    height: 20px;
    margin-left: 8px;
    margin-right: -4px;
    transition: transform 250ms;
  }

  .button:hover .button-icon {
    transform: translateX(4px);
  }
`;

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Optimized scroll detection for button visibility
  useEffect(() => {
    let ticking = false;

    const toggleVisibility = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (window.pageYOffset > 300) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    // Enhanced smooth scroll with custom animation
    const startY = window.pageYOffset;
    const duration = 1000; // 1 second for smooth scroll
    const startTime = performance.now();

    const animateScroll = (currentTime) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      // Easing function for smoother animation
      const easeInOutCubic = (t) => {
        return t < 0.5
          ? 4 * t * t * t
          : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      };

      const easedProgress = easeInOutCubic(progress);
      const currentY = startY * (1 - easedProgress);

      window.scrollTo(0, currentY);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  return (
    <>
      {isVisible && (
        <div
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            zIndex: 1000,
          }}
        >
          <StyledWrapper>
            <button className="button" onClick={scrollToTop}>
              <span className="button-shadow" />
              <span className="button-background" />
              <div className="button-content">
                <span className="button-text">Back to Top</span>
                <svg
                  className="button-icon"
                  viewBox="0 0 384 512"
                  fill="currentColor"
                >
                  <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
              </div>
            </button>
          </StyledWrapper>
        </div>
      )}
    </>
  );
};

const LandingPage = ({ isTransitioning }) => {
  const [showTitle, setShowTitle] = useState(false);
  const [removeBlur, setRemoveBlur] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [quoteFade, setQuoteFade] = useState(true);
  const [showCharts, setShowCharts] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [chartKey, setChartKey] = useState(0);// Key to force chart re-render for animations
  const [chartsAnimated, setChartsAnimated] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [servicesAnimated, setServicesAnimated] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [trustBadgesAnimated, setTrustBadgesAnimated] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [showTrustBadges, setShowTrustBadges] = useState(false);
  const [showSignInButton, setShowSignInButton] = useState(false);

  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  // Enable perfect smooth scrolling globally
  useEffect(() => {
    // Add smooth scrolling to html element for global effect
    const htmlElement = document.documentElement;
    const bodyElement = document.body;

    // Apply CSS for smooth scrolling
    htmlElement.style.scrollBehavior = "smooth";
    bodyElement.style.scrollBehavior = "smooth";

    // Optimize scroll performance
    htmlElement.style.overflowY = "scroll";
    htmlElement.style.scrollbarWidth = "none";
    htmlElement.style.msOverflowStyle = "none";

    // Add webkit scrollbar hiding
    const style = document.createElement("style");
    style.textContent = `
      html::-webkit-scrollbar {
        display: none;
      }
      body::-webkit-scrollbar {
        display: none;
      }
      * {
        scroll-behavior: smooth !important;
      }
    `;
    document.head.appendChild(style);

    // Cleanup on unmount
    return () => {
      htmlElement.style.scrollBehavior = "";
      bodyElement.style.scrollBehavior = "";
      htmlElement.style.overflowY = "";
      htmlElement.style.scrollbarWidth = "";
      htmlElement.style.msOverflowStyle = "";
      document.head.removeChild(style);
    };
  }, []);

  // Sign In button fade-in animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSignInButton(true);
    }, 2000); // Show sign in button after 2 seconds

    return () => clearTimeout(timer);
  }, []);

  const wellnessQuotes = [
    "Your go-to place for peace",
    "Where healing begins",
    "Mental wellness made accessible",
    "Your journey to inner strength",
    "Confidential care, always",
    "Breaking the stigma together",
    "Empowering minds, nurturing souls",
    "Safe space, real support",
    "Transforming student mental health",
  ];

  useEffect(() => {
    const titleTimer = setTimeout(() => {
      setShowTitle(true);
    }, 100);

    // Remove blur after a short delay for focus effect
    const blurTimer = setTimeout(() => {
      setRemoveBlur(true);
    }, 300);

    // Wellness quotes rotation timer
    const quoteTimer = setInterval(() => {
      setQuoteFade(false); // Fade out
      setTimeout(() => {
        setCurrentQuoteIndex(
          (prevIndex) => (prevIndex + 1) % wellnessQuotes.length
        );
        setQuoteFade(true); // Fade in
      }, 200); // Fast transition - 200ms fade out before changing
    }, 5000); // Change quote every 5 seconds

    // Optimized scroll event listener with throttling for smooth performance
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;
          const windowHeight = window.innerHeight;

          // Get the charts section position
          const chartsSection = document.getElementById("charts-section");
          let progress = 0;

          if (chartsSection) {
            const chartsSectionTop = chartsSection.offsetTop;
            const triggerPoint = chartsSectionTop - windowHeight * 0.5; // Start transition when charts section is 50% up the viewport

            if (scrollTop >= triggerPoint) {
              const transitionDistance = windowHeight * 0.5; // Transition happens over 50% of viewport height
              progress = Math.min(
                (scrollTop - triggerPoint) / transitionDistance,
                1
              );
            }
          }

          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Add passive event listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === "charts-section") {
            if (entry.isIntersecting) {
              setShowCharts(true);
              setChartKey((prev) => prev + 1); // Force chart re-render to trigger animations
              // Animate charts one by one with delay
              setTimeout(
                () => setChartsAnimated((prev) => [true, ...prev.slice(1)]),
                100
              );
              setTimeout(
                () =>
                  setChartsAnimated((prev) => [
                    prev[0],
                    true,
                    ...prev.slice(2),
                  ]),
                300
              );
              setTimeout(
                () =>
                  setChartsAnimated((prev) => [
                    ...prev.slice(0, 2),
                    true,
                    prev[3],
                  ]),
                500
              );
              setTimeout(
                () => setChartsAnimated((prev) => [...prev.slice(0, 3), true]),
                700
              );
            } else {
              // When charts section is not intersecting (scrolled away)
              setShowCharts(false);
              // Reset chart animations
              setChartsAnimated([false, false, false, false]);
            }
          }
          if (entry.target.id === "services-section") {
            if (entry.isIntersecting) {
              setShowServices(true);
              // Animate service cards one by one with delay
              setTimeout(
                () => setServicesAnimated((prev) => [true, ...prev.slice(1)]),
                200
              );
              setTimeout(
                () =>
                  setServicesAnimated((prev) => [
                    prev[0],
                    true,
                    ...prev.slice(2),
                  ]),
                400
              );
              setTimeout(
                () =>
                  setServicesAnimated((prev) => [
                    ...prev.slice(0, 2),
                    true,
                    prev[3],
                  ]),
                600
              );
              setTimeout(
                () =>
                  setServicesAnimated((prev) => [...prev.slice(0, 3), true]),
                800
              );
            } else {
              // When services section is not intersecting (scrolled away)
              setShowServices(false);
              // Reset service animations
              setServicesAnimated([false, false, false, false]);
            }
          }
          if (entry.target.id === "trust-badges-section") {
            if (entry.isIntersecting) {
              setShowTrustBadges(true);
              // Animate trust badges one by one with delay
              setTimeout(
                () =>
                  setTrustBadgesAnimated((prev) => [true, ...prev.slice(1)]),
                100
              );
              setTimeout(
                () =>
                  setTrustBadgesAnimated((prev) => [
                    prev[0],
                    true,
                    ...prev.slice(2),
                  ]),
                250
              );
              setTimeout(
                () =>
                  setTrustBadgesAnimated((prev) => [
                    ...prev.slice(0, 2),
                    true,
                    prev[3],
                  ]),
                400
              );
              setTimeout(
                () =>
                  setTrustBadgesAnimated((prev) => [...prev.slice(0, 3), true]),
                550
              );
            } else {
              // When trust badges section is not intersecting (scrolled away)
              setShowTrustBadges(false);
              // Reset trust badge animations
              setTrustBadgesAnimated([false, false, false, false]);
            }
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of the element is visible
        rootMargin: "-50px", // Trigger animation when element is 50px into viewport
      }
    );

    // Observe sections after component mounts
    setTimeout(() => {
      const chartsSection = document.getElementById("charts-section");
      const servicesSection = document.getElementById("services-section");
      const trustBadgesSection = document.getElementById(
        "trust-badges-section"
      );

      if (chartsSection) observer.observe(chartsSection);
      if (servicesSection) observer.observe(servicesSection);
      if (trustBadgesSection) observer.observe(trustBadgesSection);
    }, 100);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(blurTimer);
      clearInterval(quoteTimer);
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  // Interpolate colors based on scroll progress
  const interpolateColor = (color1, color2, progress) => {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);

    const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * progress);
    const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * progress);
    const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * progress);

    return `rgb(${r}, ${g}, ${b})`;
  };

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
      : null;
  };

  const backgroundColor = interpolateColor(
    "#ff3f74", // Start with pink at the top
    "#f4f8ff", // Transition to light blue when scrolling to charts
    scrollProgress
  );
  const titleColor = interpolateColor("#f4f8ff", "#ff3f74", scrollProgress);

  // Banner background should contrast with main background
  const bannerBackgroundColor = interpolateColor(
    "#4a7c59", // Darker green when page is green
    "#ff3f74", // Pink when page is light blue
    scrollProgress
  );

  // Service card colors that transition from green to light
  const cardBackgroundColor = interpolateColor(
    "#ff3f74", // Pink background initially
    "#f8f8f8", // Light gray background when scrolled
    scrollProgress
  );
  const cardTextColor = interpolateColor("#f4f8ff", "#000000", scrollProgress);

  // Tagline color that changes from cream to black when scrolling
  const taglineColor = interpolateColor("#f4f8ff", "#000000", scrollProgress);

  return (
    <div
      className={`w-full relative transition-all duration-300`}
      style={{
        backgroundColor: backgroundColor, // Dynamic background color based on scroll
        minHeight: "100vh",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        transition: "background-color 0.8s ease-out", // Smooth transition
        scrollBehavior: "smooth", // Enable smooth scrolling
      }}
    >
      {/* Text Ticker */}
      <div className="absolute top-12 left-0 w-full overflow-hidden z-20">
        <div className="bg-black py-2 relative">
          <div className="flex whitespace-nowrap text-white font-mono font-bold text-sm uppercase">
            <div className="animate-scroll-left flex">
              <span className="pr-8">
                1 IN 3 STUDENTS FACE ANXIETY OR DEPRESSION • CONFIDENTIAL
                SUPPORT IS JUST A CLICK AWAY • TALK. HEAL. GROW. • 1 IN 3
                STUDENTS FACE ANXIETY OR DEPRESSION • CONFIDENTIAL SUPPORT IS
                JUST A CLICK AWAY • TALK. HEAL. GROW. • 1 IN 3 STUDENTS FACE
                ANXIETY OR DEPRESSION • CONFIDENTIAL SUPPORT IS JUST A CLICK
                AWAY • TALK. HEAL. GROW. • 1 IN 3 STUDENTS FACE ANXIETY OR
                DEPRESSION • CONFIDENTIAL SUPPORT IS JUST A CLICK AWAY • TALK.
                HEAL. GROW. • 1 IN 3 STUDENTS FACE ANXIETY OR DEPRESSION •
                CONFIDENTIAL SUPPORT IS JUST A CLICK AWAY • TALK. HEAL. GROW. •
                1 IN 3 STUDENTS FACE ANXIETY OR DEPRESSION • CONFIDENTIAL
                SUPPORT IS JUST A CLICK AWAY • TALK. HEAL. GROW. • 1 IN 3
                STUDENTS FACE ANXIETY OR DEPRESSION • CONFIDENTIAL SUPPORT IS
                JUST A CLICK AWAY • TALK. HEAL. GROW.
              </span>
              <span className="pr-8">
                1 IN 3 STUDENTS FACE ANXIETY OR DEPRESSION • CONFIDENTIAL
                SUPPORT IS JUST A CLICK AWAY • TALK. HEAL. GROW. • 1 IN 3
                STUDENTS FACE ANXIETY OR DEPRESSION • CONFIDENTIAL SUPPORT IS
                JUST A CLICK AWAY • TALK. HEAL. GROW. • 1 IN 3 STUDENTS FACE
                ANXIETY OR DEPRESSION • CONFIDENTIAL SUPPORT IS JUST A CLICK
                AWAY • TALK. HEAL. GROW. • 1 IN 3 STUDENTS FACE ANXIETY OR
                DEPRESSION • CONFIDENTIAL SUPPORT IS JUST A CLICK AWAY • TALK.
                HEAL. GROW. • 1 IN 3 STUDENTS FACE ANXIETY OR DEPRESSION •
                CONFIDENTIAL SUPPORT IS JUST A CLICK AWAY • TALK. HEAL. GROW. •
                1 IN 3 STUDENTS FACE ANXIETY OR DEPRESSION • CONFIDENTIAL
                SUPPORT IS JUST A CLICK AWAY • TALK. HEAL. GROW. • 1 IN 3
                STUDENTS FACE ANXIETY OR DEPRESSION • CONFIDENTIAL SUPPORT IS
                JUST A CLICK AWAY • TALK. HEAL. GROW.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full flex flex-col items-center pt-32 pb-16 relative z-10">
        <div className="text-center px-4">
          {/* SoulNest Title */}
          <h1
            className="font-bold leading-none select-none text-center"
            style={{
              fontFamily: "VogueFont, serif",
              fontSize: "clamp(6rem, 20vw, 28rem)",
              color: titleColor, // Dynamic title color based on scroll
              margin: 0,
              padding: 0,
            }}
          >
            {"SoulNest".split("").map((letter, index) => (
              <span
                key={index}
                className={`inline-block transition-all duration-700 ease-out ${showTitle
                    ? "opacity-100 transform translate-y-0 scale-100"
                    : "opacity-0 transform translate-y-12 scale-95"
                  }`}
                style={{
                  transitionDelay: showTitle ? `${index * 0.1}s` : "0s",
                }}
              >
                {letter}
              </span>
            ))}
          </h1>

          {/* Wellness Quotes Ticker */}
          <div
            className={`mt-8 transition-opacity duration-700 delay-200 ${showTitle ? "opacity-100" : "opacity-0"
              }`}
          >
            <div
              className="relative overflow-visible mx-auto max-w-2xl"
              style={{
                minHeight: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 1rem",
              }}
            >
              <div
                className="text-center transition-opacity duration-200 ease-in-out flex items-center justify-center"
                style={{
                  fontFamily: "VogueFont, serif",
                  fontSize: "clamp(1.4rem, 3vw, 2rem)",
                  color: taglineColor, // Dynamic color that changes from cream to black
                  fontWeight: "700", // Bold text
                  padding: "0 1rem",
                  opacity: quoteFade ? 1 : 0,
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  textAlign: "center",
                  lineHeight: 1.05,
                }}
              >
                <img
                  src={starIcon}
                  alt="star"
                  className="w-6 h-6 mr-2 flex-shrink-0"
                />
                {wellnessQuotes[currentQuoteIndex]}
                <img
                  src={starIcon}
                  alt="star"
                  className="w-6 h-6 ml-2 flex-shrink-0"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div
            className={`mt-12 mb-16 transition-opacity duration-700 delay-300 w-full flex justify-center ${showTitle ? "opacity-100" : "opacity-0"
              }`}
          >
            <div className="flex w-full max-w-3xl mx-auto gap-4 justify-center">
              <div className="flex-1 max-w-[300px]">
                <ActionButton
                  text="Talk"
                  hoverText="Chat"
                  color="#DBEAFE"
                  icon={
                    <img
                      src={talkIcon}
                      alt="talk"
                      style={{
                        width: 44,
                        height: 44,
                        objectFit: "contain",
                      }}
                    />
                  }
                  style={{ "--hover-clr": "#D1FAE5" }}
                />
              </div>
              <div className="flex-1 max-w-[300px]">
                <ActionButton
                  text="Heal"
                  hoverText="Care"
                  color="#D1FAE5"
                  icon={
                    <img
                      src={loveIcon}
                      alt="heal"
                      style={{
                        width: 44,
                        height: 44,
                        objectFit: "contain",
                      }}
                    />
                  }
                  style={{ "--hover-clr": "#FEF9C3" }}
                />
              </div>
              <div className="flex-1 max-w-[300px]">
                <ActionButton
                  text="Grow"
                  hoverText="Join"
                  color="#FEF9C3"
                  icon={
                    <img
                      src={growthIcon}
                      alt="grow"
                      style={{
                        width: 44,
                        height: 44,
                        objectFit: "contain",
                      }}
                    />
                  }
                  style={{ "--hover-clr": "#DBEAFE" }}
                />
              </div>
            </div>
          </div>

          {/* Video Background Container - covers charts and services */}
          <div className="relative">
            {/* Video Background - with fade transition */}
            <video
              autoPlay
              loop
              muted
              className="fixed top-0 left-0 w-screen h-screen object-fill transition-opacity duration-1000 ease-in-out"
              style={{
                filter: "blur(8px)",
                width: "100vw",
                height: "100vh",
                minWidth: "100%",
                minHeight: "100%",
                opacity: showCharts ? 1 : 0,
                zIndex: showCharts ? 0 : -1, // Move behind everything when faded out
              }}
            >
              <source src={PreviewVideo} type="video/mp4" />
            </video>
            {/* Overlay to maintain color transition */}
            <div
              className="fixed top-0 left-0 w-screen h-screen transition-opacity duration-1000 ease-in-out"
              style={{
                background: `rgba(244, 248, 255, ${0.1 + scrollProgress * 0.2
                  })`, // More translucent light blue overlay with transition
                opacity: showCharts ? 1 : 0,
                zIndex: showCharts ? 10 : -1, // Move behind everything when faded out
              }}
            ></div>
            {/* Mental Health Statistics Section */}
            <div
              id="charts-section"
              className={`mt-16 transition-all duration-1000 relative z-20 ${showCharts
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-10"
                }`}
            >
              {/* Enhanced Blur Background */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: "rgba(244, 248, 255, 0.2)",
                  backdropFilter: "blur(20px)",
                  border: "none",
                  borderRadius: "10px",
                  boxShadow:
                    "0 8px 32px rgba(244, 248, 255, 0.3), inset 0 0 60px rgba(244, 248, 255, 0.15)",
                  zIndex: -1,
                }}
              ></div>
              <div className="relative z-10 p-8">
                <h2
                  className={`text-6xl font-bold mb-8 text-center transition-all duration-800 relative z-10 px-8 py-4 ${showCharts
                      ? "opacity-100 transform translate-y-0"
                      : "opacity-0 transform translate-y-5"
                    }`}
                  style={{
                    fontFamily: "VogueFont, serif",
                    color: "#000000",
                    textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  Student Mental Health Insights
                </h2>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 max-w-7xl mx-auto px-4 sm:px-6">
                  {/* Stress Levels Pie Chart */}
                  <div
                    className={`p-4 sm:p-6 md:p-8 border cursor-pointer transition-all duration-700 transform ${chartsAnimated[0]
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-8 scale-95"
                      }`}
                    style={{
                      backgroundColor: "#f4f8ff",
                      borderColor: "#000000",
                      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
                    }}
                  >
                    <h3
                      className="text-lg sm:text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center"
                      style={{
                        fontFamily: "VogueFont, serif",
                        color: "#000000",
                      }}
                    >
                      Stress Levels (500 Students)
                    </h3>
                    <div className="h-64 sm:h-80 md:h-96 lg:h-80 xl:h-96">
                      <Pie
                        key={`pie-${chartKey}`}
                        data={stressLevelsData}
                        options={pieChartOptions}
                      />
                    </div>
                  </div>

                  {/* Common Issues Bar Chart */}
                  <div
                    className={`p-4 sm:p-6 md:p-8 border cursor-pointer transition-all duration-700 transform ${chartsAnimated[1]
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-8 scale-95"
                      }`}
                    style={{
                      backgroundColor: "#f4f8ff",
                      borderColor: "#000000",
                      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
                    }}
                  >
                    <h3
                      className="text-lg sm:text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center"
                      style={{
                        fontFamily: "VogueFont, serif",
                        color: "#000000",
                      }}
                    >
                      Common Mental Health Issues
                    </h3>
                    <div className="h-64 sm:h-80 md:h-96 lg:h-80 xl:h-96">
                      <Bar
                        key={`bar-${chartKey}`}
                        data={commonIssuesData}
                        options={chartOptions}
                      />
                    </div>
                  </div>

                  {/* Help-Seeking Preferences Doughnut Chart */}
                  <div
                    className={`p-4 sm:p-6 md:p-8 border cursor-pointer transition-all duration-700 transform ${chartsAnimated[2]
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-8 scale-95"
                      }`}
                    style={{
                      backgroundColor: "#f4f8ff",
                      borderColor: "#000000",
                      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
                    }}
                  >
                    <h3
                      className="text-lg sm:text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center"
                      style={{
                        fontFamily: "VogueFont, serif",
                        color: "#000000",
                      }}
                    >
                      Help-Seeking Preferences
                    </h3>
                    <div className="h-64 sm:h-80 md:h-96 lg:h-80 xl:h-96">
                      <Doughnut
                        key={`doughnut-${chartKey}`}
                        data={helpSeekingData}
                        options={pieChartOptions}
                      />
                    </div>
                  </div>

                  {/* Weekly Mood Trend Line Chart */}
                  <div
                    className={`p-4 sm:p-6 md:p-8 border cursor-pointer transition-all duration-700 transform ${chartsAnimated[3]
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-8 scale-95"
                      }`}
                    style={{
                      backgroundColor: "#f4f8ff",
                      borderColor: "#000000",
                      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
                    }}
                  >
                    <h3
                      className="text-lg sm:text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center"
                      style={{
                        fontFamily: "VogueFont, serif",
                        color: "#000000",
                      }}
                    >
                      Weekly Mood Trends
                    </h3>
                    <div className="h-64 sm:h-80 md:h-96 lg:h-80 xl:h-96">
                      <Line
                        key={`line-${chartKey}`}
                        data={weeklyMoodData}
                        options={chartOptions}
                      />
                    </div>
                  </div>
                </div>

                {/* Key Insights */}
                <div className="mt-12 text-center max-w-6xl mx-auto">
                  <div
                    className="backdrop-blur-lg p-10 cursor-pointer"
                    style={{
                      backgroundColor: "#E91E63", // Pinkish red background
                      border: "none",
                      borderRadius: "10px",
                      boxShadow: "0 8px 25px rgba(233, 30, 99, 0.3)",
                    }}
                  >
                    <h4
                      className="text-4xl font-bold mb-8"
                      style={{
                        fontFamily: "VogueFont, serif",
                        color: "#f4f8ff", // Light blue color
                      }}
                    >
                      Key Insights
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xl">
                      <div
                        style={{
                          color: "#f4f8ff", // Light blue color
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "1.5rem",
                          lineHeight: "1.7",
                          fontWeight: "500",
                        }}
                      >
                        <strong style={{ fontSize: "2rem", fontWeight: "700" }}>
                          72%
                        </strong>
                        <br />
                        of students experience moderate to high stress levels
                      </div>
                      <div
                        style={{
                          color: "#f4f8ff", // Light blue color
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "1.5rem",
                          lineHeight: "1.7",
                          fontWeight: "500",
                        }}
                      >
                        <strong style={{ fontSize: "2rem", fontWeight: "700" }}>
                          58%
                        </strong>
                        <br />
                        are unaware of available counselling services
                      </div>
                      <div
                        style={{
                          color: "#f4f8ff", // Light blue color
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "1.5rem",
                          lineHeight: "1.7",
                          fontWeight: "500",
                        }}
                      >
                        <strong style={{ fontSize: "2rem", fontWeight: "700" }}>
                          30%
                        </strong>
                        <br />
                        prefer peer support as their first choice for help
                      </div>
                    </div>
                  </div>
                </div>
              </div>{" "}
              {/* Close relative z-10 p-8 wrapper */}
            </div>{" "}
            {/* Close content container */}
          </div>

          {/* Services Section */}
          <div
            id="services-section"
            className={`mt-16 p-8 transition-all duration-1000 transform relative z-20 ${showServices
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-10 scale-95"
              }`}
            style={{
              backgroundColor: "#ff3f74",
              border: "none",
              borderRadius: "10px",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2
              className="text-6xl font-bold mb-8 text-center"
              style={{
                fontFamily: "VogueFont, serif",
                color: "#f4f8ff",
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
              }}
            >
              Our Services
            </h2>

            {/* Services Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto px-4">
              {/* AI Support Card */}
              <div
                className={`backdrop-blur-lg p-6 border hover:scale-105 transition-all duration-700 transform ${servicesAnimated[0]
                    ? "opacity-100 translate-x-0 rotate-0"
                    : "opacity-0 -translate-x-10 -rotate-3"
                  }`}
                style={{
                  backgroundColor: "rgba(244, 248, 255, 0.9)",
                  borderColor: "#000000",
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
                }}
              >
                <div>
                  <h3
                    className="text-3xl font-semibold mb-4"
                    style={{
                      fontFamily: "VogueFont, serif",
                      color: "#ff3f74",
                      textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    AI-Guided First-Aid Support
                  </h3>
                  <p
                    className="text-lg leading-relaxed opacity-90"
                    style={{
                      fontFamily: "Coolvetica, sans-serif",
                      color: "#333333",
                      textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    Get instant emotional support through our intelligent
                    chatbot. It offers coping strategies, relaxation techniques,
                    and early detection of stress, anxiety, or depression.
                  </p>
                </div>
              </div>

              {/* Counselling Card */}
              <div
                className={`backdrop-blur-lg p-6 border hover:scale-105 transition-all duration-700 transform ${servicesAnimated[1]
                    ? "opacity-100 translate-x-0 rotate-0"
                    : "opacity-0 translate-x-10 rotate-3"
                  }`}
                style={{
                  backgroundColor: "rgba(244, 248, 255, 0.9)",
                  borderColor: "#000000",
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
                }}
              >
                <div>
                  <h3
                    className="text-3xl font-semibold mb-4"
                    style={{
                      fontFamily: "VogueFont, serif",
                      color: "#ff3f74",
                      textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    Confidential Counselling Booking
                  </h3>
                  <p
                    className="text-lg leading-relaxed opacity-90"
                    style={{
                      fontFamily: "Coolvetica, sans-serif",
                      color: "#333333",
                      textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    Book private one-on-one sessions with trained counsellors
                    without fear of stigma. Choose in-person, video, or
                    chat-based sessions securely.
                  </p>
                </div>
              </div>

              {/* Resource Hub Card */}
              <div
                className={`backdrop-blur-lg p-6 border hover:scale-105 transition-all duration-700 transform ${servicesAnimated[2]
                    ? "opacity-100 translate-x-0 rotate-0"
                    : "opacity-0 -translate-x-10 -rotate-3"
                  }`}
                style={{
                  backgroundColor: "rgba(244, 248, 255, 0.9)",
                  borderColor: "#000000",
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
                }}
              >
                <div>
                  <h3
                    className="text-3xl font-semibold mb-4"
                    style={{
                      fontFamily: "VogueFont, serif",
                      color: "#ff3f74",
                      textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    Psychoeducational Resource Hub
                  </h3>
                  <p
                    className="text-lg leading-relaxed opacity-90"
                    style={{
                      fontFamily: "Coolvetica, sans-serif",
                      color: "#333333",
                      textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    Access curated mental wellness resources including
                    relaxation audios, guided meditation, videos, and self-help
                    guides in multiple regional languages.
                  </p>
                </div>
              </div>

              {/* Peer Support Card */}
              <div
                className={`backdrop-blur-lg p-6 border hover:scale-105 transition-all duration-700 transform ${servicesAnimated[3]
                    ? "opacity-100 translate-x-0 rotate-0"
                    : "opacity-0 translate-x-10 rotate-3"
                  }`}
                style={{
                  backgroundColor: "rgba(244, 248, 255, 0.9)",
                  borderColor: "#000000",
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
                }}
              >
                <div>
                  <h3
                    className="text-3xl font-semibold mb-4"
                    style={{
                      fontFamily: "VogueFont, serif",
                      color: "#ff3f74",
                      textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    Peer Support Community
                  </h3>
                  <p
                    className="text-lg leading-relaxed opacity-90"
                    style={{
                      fontFamily: "Coolvetica, sans-serif",
                      color: "#333333",
                      textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    Connect anonymously with trained student volunteers who
                    understand your struggles. Share, listen, and heal together
                    in a safe digital space.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Badges Section */}
          <div
            id="trust-badges-section"
            className={`mt-20 py-16 transition-all duration-1000 relative z-20 ${showTrustBadges
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-10"
              }`}
          >
            <div className="max-w-6xl mx-auto px-4">
              <h2
                className="text-5xl font-bold mb-12 text-center"
                style={{
                  fontFamily: "VogueFont, serif",
                  color: "#ff3f74",
                  textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                Why Students Trust SoulNest
              </h2>

              {/* Trust Badges Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Secure & Private Badge */}
                <div
                  className={`text-center p-12 transition-all duration-700 transform hover:scale-105 ${trustBadgesAnimated[0]
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-8 scale-95"
                    }`}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(10px)",
                    border: "2px solid #000000",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div
                    className="mb-6 flex justify-center"
                    style={{
                      filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
                    }}
                  >
                    <img src={secureIcon} alt="secure" className="w-20 h-20" />
                  </div>
                  <h3
                    className="text-2xl font-bold mb-4"
                    style={{
                      fontFamily: "VogueFont, serif",
                      color: "#ff3f74",
                    }}
                  >
                    Secure & Private
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      color: "#666666",
                    }}
                  >
                    End-to-end encryption ensures your conversations stay
                    completely confidential
                  </p>
                </div>

                {/* Fast Support Badge */}
                <div
                  className={`text-center p-12 transition-all duration-700 transform hover:scale-105 ${trustBadgesAnimated[1]
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-8 scale-95"
                    }`}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(10px)",
                    border: "2px solid #000000",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div
                    className="mb-6 flex justify-center"
                    style={{
                      filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
                    }}
                  >
                    <img src={fastIcon} alt="fast" className="w-20 h-20" />
                  </div>
                  <h3
                    className="text-2xl font-bold mb-4"
                    style={{
                      fontFamily: "VogueFont, serif",
                      color: "#ff3f74",
                    }}
                  >
                    Fast Support
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      color: "#666666",
                    }}
                  >
                    Get instant help 24/7 with our AI-powered support system and
                    quick response times
                  </p>
                </div>

                {/* Student-Centered Badge */}
                <div
                  className={`text-center p-12 transition-all duration-700 transform hover:scale-105 ${trustBadgesAnimated[2]
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-8 scale-95"
                    }`}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(10px)",
                    border: "2px solid #000000",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div
                    className="mb-6 flex justify-center"
                    style={{
                      filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
                    }}
                  >
                    <img src={targetIcon} alt="target" className="w-20 h-20" />
                  </div>
                  <h3
                    className="text-2xl font-bold mb-4"
                    style={{
                      fontFamily: "VogueFont, serif",
                      color: "#ff3f74",
                    }}
                  >
                    Student-Centered
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      color: "#666666",
                    }}
                  >
                    Designed specifically for students by understanding unique
                    academic pressures
                  </p>
                </div>

                {/* Reliable & Transparent Badge */}
                <div
                  className={`text-center p-12 transition-all duration-700 transform hover:scale-105 ${trustBadgesAnimated[3]
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-8 scale-95"
                    }`}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(10px)",
                    border: "2px solid #000000",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div
                    className="mb-6 flex justify-center"
                    style={{
                      filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
                    }}
                  >
                    <img src={trustIcon} alt="trust" className="w-20 h-20" />
                  </div>
                  <h3
                    className="text-2xl font-bold mb-4"
                    style={{
                      fontFamily: "VogueFont, serif",
                      color: "#ff3f74",
                    }}
                  >
                    Reliable & Transparent
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      color: "#666666",
                    }}
                  >
                    Clear processes, honest communication, and proven track
                    record of helping students
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
        {/* Close video background container */}
      </div>

      <div
        className={`fixed bottom-6 left-6 z-50 transition-all duration-1000 ease-out ${showSignInButton
            ? "opacity-100 transform translate-y-0 scale-100"
            : "opacity-0 transform translate-y-8 scale-95"
          }`}
      >
        <button
          onClick={handleSignUpClick}
          className="relative group border-none bg-transparent p-0 outline-none cursor-pointer font-mono font-light uppercase text-base"
        >
          <span className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-25 transform translate-y-0.5 transition duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:translate-y-1 group-hover:duration-[250ms] group-active:translate-y-px" />
          <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-l from-[#000000] via-[#2a2a2a] to-[#000000]" />
          <div className="relative flex items-center justify-between py-3 px-6 text-lg text-white transform -translate-y-1 bg-gradient-to-r from-[#000000] via-[#1a1a1a] to-[#000000] gap-3 transition duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:-translate-y-1.5 group-hover:duration-[250ms] group-active:-translate-y-0.5 brightness-100 group-hover:brightness-110">
            <span className="select-none">Sign Up</span>
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 ml-2 -mr-1 transition duration-250 group-hover:translate-x-1"
            >
              <path
                clipRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                fillRule="evenodd"
              />
            </svg>
          </div>
        </button>
      </div>

      <ScrollToTopButton />
    </div>
  );
};

export default LandingPage;
