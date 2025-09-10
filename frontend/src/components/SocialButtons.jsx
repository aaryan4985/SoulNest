import React from "react";
import styled from "styled-components";

const SocialButtons = () => {
  return (
    <StyledWrapper>
      <div className="main">
        <div className="up">
          <button className="button">
            <div className="dots_border" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="sparkle"
            >
              <path
                className="path"
                strokeLinejoin="round"
                strokeLinecap="round"
                stroke="#ffffeb"
                fill="#ffffeb"
                d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z"
              />
              <path
                className="path"
                strokeLinejoin="round"
                strokeLinecap="round"
                stroke="#ffffeb"
                fill="#ffffeb"
                d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z"
              />
              <path
                className="path"
                strokeLinejoin="round"
                strokeLinecap="round"
                stroke="#ffffeb"
                fill="#ffffeb"
                d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z"
              />
            </svg>
            <span className="text_button">Instagram</span>
          </button>
          <button className="button">
            <div className="dots_border" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="sparkle"
            >
              <path
                className="path"
                strokeLinejoin="round"
                strokeLinecap="round"
                stroke="#ffffeb"
                fill="#ffffeb"
                d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z"
              />
              <path
                className="path"
                strokeLinejoin="round"
                strokeLinecap="round"
                stroke="#ffffeb"
                fill="#ffffeb"
                d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z"
              />
              <path
                className="path"
                strokeLinejoin="round"
                strokeLinecap="round"
                stroke="#ffffeb"
                fill="#ffffeb"
                d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z"
              />
            </svg>
            <span className="text_button">Twitter</span>
          </button>
        </div>
        <div className="down">
          <button className="button">
            <div className="dots_border" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="sparkle"
            >
              <path
                className="path"
                strokeLinejoin="round"
                strokeLinecap="round"
                stroke="#ffffeb"
                fill="#ffffeb"
                d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z"
              />
              <path
                className="path"
                strokeLinejoin="round"
                strokeLinecap="round"
                stroke="#ffffeb"
                fill="#ffffeb"
                d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z"
              />
              <path
                className="path"
                strokeLinejoin="round"
                strokeLinecap="round"
                stroke="#ffffeb"
                fill="#ffffeb"
                d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z"
              />
            </svg>
            <span className="text_button">GitHub</span>
          </button>
          <button className="button">
            <div className="dots_border" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="sparkle"
            >
              <path
                className="path"
                strokeLinejoin="round"
                strokeLinecap="round"
                stroke="#ffffeb"
                fill="#ffffeb"
                d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z"
              />
              <path
                className="path"
                strokeLinejoin="round"
                strokeLinecap="round"
                stroke="#ffffeb"
                fill="#ffffeb"
                d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z"
              />
              <path
                className="path"
                strokeLinejoin="round"
                strokeLinecap="round"
                stroke="#ffffeb"
                fill="#ffffeb"
                d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z"
              />
            </svg>
            <span className="text_button">Discord</span>
          </button>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .main {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;
  }

  .up,
  .down {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: center;
  }

  .button {
    padding: 1.3em 3em;
    font-size: 14px;
    background: transparent;
    border: none;
    position: relative;
    color: #ffffeb;
    border-radius: 0.5em;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-family: "VogueFont", sans-serif;
    width: 140px;
    height: 55px;
    backdrop-filter: blur(12px);
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.05) 100%
    );
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .button:hover {
    transform: scale(1.1);
    box-shadow: 0 20px 40px rgba(255, 255, 235, 0.4),
      0 0 20px rgba(255, 255, 235, 0.3), inset 0 0 20px rgba(255, 255, 235, 0.1);
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.25) 0%,
      rgba(255, 255, 255, 0.15) 100%
    );
    border: 1px solid rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(15px);
  }

  .text_button {
    font-size: 14px;
    font-weight: 500;
    color: #ffffeb;
    z-index: 2;
    transition: all 0.3s ease;
  }

  .button:hover .text_button {
    color: #ffffff;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    font-weight: 600;
  }

  .sparkle {
    fill: #ffffeb;
    transition: all 0.3s;
    width: 18px;
    height: 18px;
    z-index: 2;
  }

  .button:hover .sparkle {
    fill: #ffffff;
    transform: scale(1.3);
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.8));
  }

  .button:hover .sparkle .path {
    animation: path 1.2s linear infinite;
  }

  .button:hover .dots_border {
    animation: rotate90 0.6s linear infinite;
    opacity: 0.8;
  }

  .dots_border {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    border-radius: 0.5em;
    background: linear-gradient(
        0deg,
        transparent 24%,
        rgba(255, 255, 235, 0.3) 25%,
        rgba(255, 255, 235, 0.3) 26%,
        transparent 27%,
        transparent 74%,
        rgba(255, 255, 235, 0.3) 75%,
        rgba(255, 255, 235, 0.3) 76%,
        transparent 77%,
        transparent
      ),
      linear-gradient(
        90deg,
        transparent 24%,
        rgba(255, 255, 235, 0.3) 25%,
        rgba(255, 255, 235, 0.3) 26%,
        transparent 27%,
        transparent 74%,
        rgba(255, 255, 235, 0.3) 75%,
        rgba(255, 255, 235, 0.3) 76%,
        transparent 77%,
        transparent
      );
  }

  @keyframes rotate90 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(90deg);
    }
  }

  @keyframes path {
    0%,
    34%,
    71%,
    100% {
      opacity: 0;
    }
    17%,
    50%,
    88% {
      opacity: 1;
    }
  }
`;

export default SocialButtons;
