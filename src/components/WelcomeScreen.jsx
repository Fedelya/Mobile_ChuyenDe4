const WelcomeScreen = ({ onStart }) => {
  return (
    <div className="welcome-screen">
      <div className="welcome-overlay"></div>
      
      <div className="welcome-content">
        <div className="audio-icon">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="white">
            <rect x="4" y="16" width="6" height="16" rx="3" />
            <rect x="14" y="8" width="6" height="32" rx="3" />
            <rect x="24" y="12" width="6" height="24" rx="3" />
            <rect x="34" y="16" width="6" height="16" rx="3" />
          </svg>
        </div>
        <h1>Welcome to<br />Premium</h1>
        <div className="dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
      
      <button className="start-button" onClick={onStart}>
        Start listening
      </button>
    </div>
  );
};
 
export default WelcomeScreen;