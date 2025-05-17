import React, { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import ProfileScreen from './components/ProfileScreen';
import './App.css';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Kiểm tra theme đã lưu trong localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const handleStart = () => {
    setIsAnimating(true);
    // Thêm animation trước khi chuyển màn hình
    setTimeout(() => {
      setShowWelcome(false);
      setIsAnimating(false);
    }, 500);
  };

  const handleBackToWelcome = () => {
    setIsAnimating(true);
    // Thêm animation trước khi chuyển màn hình
    setTimeout(() => {
      setShowWelcome(true);
      setIsAnimating(false);
    }, 500);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className={`app-container ${isAnimating ? 'animating' : ''} ${isDarkMode ? 'dark-theme' : ''}`}>
      {showWelcome ? (
        <WelcomeScreen onStart={handleStart} />
      ) : (
        <ProfileScreen onBackToWelcome={handleBackToWelcome} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      )}
    </div>
  );
}

export default App;