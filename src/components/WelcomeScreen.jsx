import React, { useState, useEffect } from 'react';

const WelcomeScreen = ({ onStart }) => {
  const [visible, setVisible] = useState(false);
  const [audioAnimated, setAudioAnimated] = useState(false);
  const [buttonAnimated, setButtonAnimated] = useState(false);
  
  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 100);
    
    setTimeout(() => {
      setAudioAnimated(true);
    }, 800);
    
    setTimeout(() => {
      setButtonAnimated(true);
    }, 1500);
  }, []);

  return (
    <div className="welcome-screen">
      <div className="welcome-overlay"></div>
      
      <div className="welcome-content">
        <div className={`audio-icon ${audioAnimated ? 'animated' : ''}`}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="white">
            <rect x="4" y="16" width="6" height="16" rx="3" />
            <rect x="14" y="8" width="6" height="32" rx="3" />
            <rect x="24" y="12" width="6" height="24" rx="3" />
            <rect x="34" y="16" width="6" height="16" rx="3" />
          </svg>
        </div>
        <h1 className={`fade-in-text ${visible ? 'visible' : ''}`}>
          <span className="welcome-line">Welcome to</span>
          <br />
          <span className="premium-line">Premium</span>
        </h1>
        <div className="dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
      
      <button className={`start-button ${buttonAnimated ? 'animated' : ''}`} onClick={onStart}>
        Start listening
      </button>

      <style jsx>{`
        .fade-in-text {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 2s ease, transform 2s ease;
        }
        
        .fade-in-text.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .welcome-line, .premium-line {
          display: inline-block;
        }
        
        /* Animation cho audio icon */
        .audio-icon {
          transition: transform 0.6s ease;
        }
        
        .audio-icon.animated {
          animation: bounce 1.5s ease infinite;
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        /* Animation cho nút start */
        .start-button {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .start-button.animated {
          animation: pulse 2s infinite;
        }
        
        .start-button.animated::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: rgba(255, 255, 255, 0.2);
          transform: rotate(45deg);
          animation: shine 3s infinite;
        }
        
        @keyframes pulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
          }
          70% {
            transform: scale(1.05);
            box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
          }
        }
        
        @keyframes shine {
          0% {
            left: -100%;
            opacity: 0;
          }
          20% {
            left: 100%;
            opacity: 0.5;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
 
export default WelcomeScreen;