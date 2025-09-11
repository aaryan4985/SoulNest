import React, { useState } from "react";

const EmergencyButtons = () => {
  const [contactName, setContactName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [customButtons, setCustomButtons] = useState([]);

  const addCustomButton = () => {
    if (contactName.trim() && phoneNumber.trim()) {
      const newButton = {
        id: Date.now(),
        name: contactName.trim(),
        phone: phoneNumber.trim(),
      };
      setCustomButtons([...customButtons, newButton]);
      setContactName("");
      setPhoneNumber("");
    }
  };

  const removeCustomButton = (id) => {
    setCustomButtons(customButtons.filter((button) => button.id !== id));
  };

  const callNumber = (phone) => {
    window.open(`tel:${phone}`, "_self");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f8ff",
        fontFamily: "'Open Sans', sans-serif",
      }}
    >
      {/* Title Banner */}
      <div
        style={{
          background: "#ff3f74",
          color: "white",
          padding: "20px 0",
          textAlign: "center",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "2.5rem",
            fontWeight: "bold",
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          Emergency Speed Dial
        </h1>
        <p
          style={{
            margin: "10px 0 0 0",
            fontSize: "1.1rem",
            opacity: 0.9,
          }}
        >
          Quick access to emergency services
        </p>
      </div>

      {/* Main Content */}
      <div
        style={{
          padding: "40px 20px",
          textAlign: "center",
        }}
      >
        {/* Input Fields */}
        <div style={{ marginBottom: "50px" }}>
          <label
            style={{
              display: "block",
              fontSize: "1.2rem",
              fontWeight: "600",
              color: "#333",
              marginBottom: "20px",
            }}
          >
            Create Custom Speed Dial
          </label>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              maxWidth: "500px",
              margin: "0 auto",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="Contact name"
              style={{
                width: "100%",
                padding: "12px 16px",
                fontSize: "1rem",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                outline: "none",
                background: "white",
                transition: "all 0.3s ease",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#ff3f74";
                e.target.style.boxShadow = "0 2px 8px rgba(255,63,116,0.15)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)";
              }}
            />

            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone number"
              style={{
                width: "100%",
                padding: "12px 16px",
                fontSize: "1rem",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                outline: "none",
                background: "white",
                transition: "all 0.3s ease",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#ff3f74";
                e.target.style.boxShadow = "0 2px 8px rgba(255,63,116,0.15)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)";
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  addCustomButton();
                }
              }}
            />

            <button
              onClick={addCustomButton}
              disabled={!contactName.trim() || !phoneNumber.trim()}
              style={{
                padding: "12px 30px",
                fontSize: "1rem",
                fontWeight: "600",
                background:
                  contactName.trim() && phoneNumber.trim() ? "#ff3f74" : "#ccc",
                color: "white",
                border: "none",
                borderRadius: "25px",
                cursor:
                  contactName.trim() && phoneNumber.trim()
                    ? "pointer"
                    : "not-allowed",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              }}
              onMouseEnter={(e) => {
                if (contactName.trim() && phoneNumber.trim()) {
                  e.target.style.background = "#e63966";
                  e.target.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                if (contactName.trim() && phoneNumber.trim()) {
                  e.target.style.background = "#ff3f74";
                  e.target.style.transform = "translateY(0)";
                }
              }}
            >
              Add Speed Dial
            </button>
          </div>
        </div>

        {/* Emergency Buttons */}
        <div style={{ marginBottom: "60px" }}>
          <h2
            style={{
              color: "#333",
              marginBottom: "30px",
              fontSize: "1.5rem",
              fontWeight: "600",
            }}
          >
            Emergency Services
          </h2>

          <div
            style={{
              display: "flex",
              gap: "60px",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              marginBottom: "20px",
            }}
          >
            <style>{`
              .button {
                background: none;
                border: none;
                cursor: pointer;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 15px;
              }

              .button .bloom-container {
                position: relative;
                transition: all 0.2s ease-in-out;
                border: none;
                background: none;
              }

              .button .bloom-container .button-container-main {
                width: 110px;
                aspect-ratio: 1;
                border-radius: 50%;
                overflow: hidden;
                position: relative;
                display: grid;
                place-content: center;
                border-right: 5px solid white;
                border-left: 5px solid rgba(128, 128, 128, 0.147);
                transform: rotate(-45deg);
                transition: all 0.5s ease-in-out;
              }

              .button .bloom-container .button-container-main .button-inner {
                height: 60px;
                aspect-ratio: 1;
                border-radius: 50%;
                position: relative;
                box-shadow: rgba(100, 100, 111, 0.5) -10px 5px 10px 0px;
                transition: all 0.5s ease-in-out;
              }

              /* Emergency Button - Red */
              .button.emergency .bloom-container .button-container-main .button-inner .back {
                position: absolute;
                inset: 0;
                border-radius: 50%;
                background: linear-gradient(
                  60deg,
                  rgb(153, 27, 27) 0%,
                  rgb(239, 68, 68) 100%
                );
              }

              .button.emergency .bloom-container .button-container-main .button-inner .front {
                position: absolute;
                inset: 5px;
                border-radius: 50%;
                background: linear-gradient(
                  60deg,
                  rgb(185, 28, 28) 0%,
                  rgb(248, 113, 113) 100%
                );
                display: grid;
                place-content: center;
              }

              /* Ambulance Button - Blue */
              .button.ambulance .bloom-container .button-container-main .button-inner .back {
                position: absolute;
                inset: 0;
                border-radius: 50%;
                background: linear-gradient(
                  60deg,
                  rgb(29, 78, 216) 0%,
                  rgb(96, 165, 250) 100%
                );
              }

              .button.ambulance .bloom-container .button-container-main .button-inner .front {
                position: absolute;
                inset: 5px;
                border-radius: 50%;
                background: linear-gradient(
                  60deg,
                  rgb(37, 99, 235) 0%,
                  rgb(147, 197, 253) 100%
                );
                display: grid;
                place-content: center;
              }

              /* Police Button - Green */
              .button.police .bloom-container .button-container-main .button-inner .back {
                position: absolute;
                inset: 0;
                border-radius: 50%;
                background: linear-gradient(
                  60deg,
                  rgb(22, 101, 52) 0%,
                  rgb(34, 197, 94) 100%
                );
              }

              .button.police .bloom-container .button-container-main .button-inner .front {
                position: absolute;
                inset: 5px;
                border-radius: 50%;
                background: linear-gradient(
                  60deg,
                  rgb(21, 128, 61) 0%,
                  rgb(74, 222, 128) 100%
                );
                display: grid;
                place-content: center;
              }

              /* Custom Button - Purple */
              .button.custom .bloom-container .button-container-main .button-inner .back {
                position: absolute;
                inset: 0;
                border-radius: 50%;
                background: linear-gradient(
                  60deg,
                  rgb(147, 51, 234) 0%,
                  rgb(196, 125, 239) 100%
                );
              }

              .button.custom .bloom-container .button-container-main .button-inner .front {
                position: absolute;
                inset: 5px;
                border-radius: 50%;
                background: linear-gradient(
                  60deg,
                  rgb(168, 85, 247) 0%,
                  rgb(221, 168, 251) 100%
                );
                display: grid;
                place-content: center;
              }

              .button .bloom-container .button-container-main .button-inner .front .svg {
                fill: #ffffff;
                stroke: #ffffff;
                opacity: 0.5;
                width: 30px;
                aspect-ratio: 1;
                transform: rotate(45deg);
                transition: all 0.2s ease-in;
              }

              .button .bloom-container .button-container-main .button-glass {
                position: absolute;
                inset: 0;
                background: linear-gradient(
                  90deg,
                  rgba(255, 255, 255, 0) 0%,
                  rgba(255, 255, 255, 0.888) 100%
                );
                transform: translate(0%, -50%) rotate(0deg);
                transform-origin: bottom center;
                transition: all 0.5s ease-in-out;
              }

              .button .bloom-container .bloom {
                height: 1px;
                width: 1px;
                position: absolute;
                background: white;
              }

              .button .bloom-container .bloom1 {
                top: 10px;
                right: 20px;
                box-shadow:
                  rgb(255, 255, 255) 0px 0px 10px 10px,
                  rgb(255, 255, 255) 0px 0px 20px 20px;
              }

              .button .bloom-container .bloom2 {
                bottom: 10px;
                left: 20px;
                box-shadow:
                  rgba(255, 255, 255, 0.5) 0px 0px 10px 10px,
                  rgba(255, 255, 255, 0.5) 0px 0px 30px 20px;
              }

              .button .bloom-container:hover {
                transform: scale(1.1);
              }

              .button .bloom-container:hover .button-container-main .button-glass {
                transform: translate(0%, -40%);
              }

              .button
                .bloom-container:hover
                .button-container-main
                .button-inner
                .front
                .svg {
                opacity: 1;
                filter: drop-shadow(0 0 10px white);
              }

              .button .bloom-container:active {
                transform: scale(0.7);
              }

              .button .bloom-container:active .button-container-main .button-inner {
                transform: scale(1.2);
              }

              .button-label {
                font-size: 1.1rem;
                font-weight: 600;
                color: #333;
                text-shadow: 0 1px 2px rgba(0,0,0,0.1);
                transition: all 0.3s ease;
              }

              .button:hover .button-label {
                transform: translateY(-2px);
                color: #ff3f74;
              }

              .remove-btn {
                position: absolute;
                top: -5px;
                right: -5px;
                width: 25px;
                height: 25px;
                border-radius: 50%;
                background: #ff3f74;
                color: white;
                border: none;
                cursor: pointer;
                font-size: 14px;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                transition: all 0.3s ease;
                z-index: 10;
              }

              .remove-btn:hover {
                background: #e63966;
                transform: scale(1.1);
              }
            `}</style>

            {/* Emergency/Alarm Button */}
            <button
              className="button emergency"
              onClick={() => callNumber("+91 81155 70767")}
            >
              <div className="bloom-container">
                <div className="button-container-main">
                  <div className="button-inner">
                    <div className="back" />
                    <div className="front">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="3" />
                        <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1m15.5-6.5l-4.24 4.24M7.76 16.24l-4.24 4.24m12.73 0l-4.24-4.24M7.76 7.76L3.52 3.52" />
                      </svg>
                    </div>
                  </div>
                  <div className="button-glass">
                    <div className="back" />
                    <div className="front" />
                  </div>
                </div>
                <div className="bloom bloom1" />
                <div className="bloom bloom2" />
              </div>
              <span className="button-label">Emergency</span>
            </button>

            {/* Ambulance Button */}
            <button
              className="button ambulance"
              onClick={() => callNumber("+91 81155 70767")}
            >
              <div className="bloom-container">
                <div className="button-container-main">
                  <div className="button-inner">
                    <div className="back" />
                    <div className="front">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                        <path d="M15 18H9" />
                        <path d="M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14" />
                        <circle cx="17" cy="18" r="2" />
                        <circle cx="7" cy="18" r="2" />
                        <path d="M9 8h4" />
                        <path d="M11 6v4" />
                      </svg>
                    </div>
                  </div>
                  <div className="button-glass">
                    <div className="back" />
                    <div className="front" />
                  </div>
                </div>
                <div className="bloom bloom1" />
                <div className="bloom bloom2" />
              </div>
              <span className="button-label">Ambulance</span>
            </button>

            {/* Police Button */}
            <button
              className="button police"
              onClick={() => callNumber("+91 81155 70767")}
            >
              <div className="bloom-container">
                <div className="button-container-main">
                  <div className="button-inner">
                    <div className="back" />
                    <div className="front">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                        <path d="M9 12l2 2 4-4" />
                      </svg>
                    </div>
                  </div>
                  <div className="button-glass">
                    <div className="back" />
                    <div className="front" />
                  </div>
                </div>
                <div className="bloom bloom1" />
                <div className="bloom bloom2" />
              </div>
              <span className="button-label">Police</span>
            </button>
          </div>
        </div>

        {/* Custom Speed Dial Buttons */}
        {customButtons.length > 0 && (
          <div style={{ marginBottom: "40px" }}>
            <h2
              style={{
                color: "#333",
                marginBottom: "30px",
                fontSize: "1.5rem",
                fontWeight: "600",
              }}
            >
              Custom Speed Dial
            </h2>

            <div
              style={{
                display: "flex",
                gap: "40px",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {customButtons.map((button) => (
                <button
                  key={button.id}
                  className="button custom"
                  onClick={() => callNumber(button.phone)}
                  style={{ position: "relative" }}
                >
                  <button
                    className="remove-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeCustomButton(button.id);
                    }}
                    title="Remove button"
                  >
                    ×
                  </button>

                  <div className="bloom-container">
                    <div className="button-container-main">
                      <div className="button-inner">
                        <div className="back" />
                        <div className="front">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                          </svg>
                        </div>
                      </div>
                      <div className="button-glass">
                        <div className="back" />
                        <div className="front" />
                      </div>
                    </div>
                    <div className="bloom bloom1" />
                    <div className="bloom bloom2" />
                  </div>
                  <span className="button-label">{button.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Additional Info */}
        <div
          style={{
            marginTop: "40px",
            padding: "20px",
            background: "rgba(255,255,255,0.7)",
            borderRadius: "15px",
            maxWidth: "600px",
            margin: "40px auto 0",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "#666",
              fontSize: "0.95rem",
              lineHeight: "1.5",
            }}
          >
            Click any button to quickly call the help. Custom buttons can be removed using the × button in the top-right corner.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmergencyButtons;