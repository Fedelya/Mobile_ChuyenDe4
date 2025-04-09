import { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import ProfileScreen from './components/ProfileScreen';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');

  const handleStartListening = () => {
    setCurrentScreen('profile');
  };

  return (
    <div className="app-container">
      {currentScreen === 'welcome' ? (
        <WelcomeScreen onStart={handleStartListening} />
      ) : (
        <ProfileScreen />
      )}
    </div>
  );
}

export default App;