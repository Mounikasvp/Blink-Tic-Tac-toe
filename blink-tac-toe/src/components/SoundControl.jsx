import React, { useState, useEffect } from 'react';
import soundEffects from '../utils/soundEffects';
import '../styles/SoundControl.css';

const SoundControl = () => {
  const [isEnabled, setIsEnabled] = useState(soundEffects.isEnabled());

  useEffect(() => {
    // Save sound preferences to localStorage
    localStorage.setItem('soundEnabled', isEnabled.toString());
  }, [isEnabled]);

  useEffect(() => {
    // Load sound preferences from localStorage on mount
    const savedEnabled = localStorage.getItem('soundEnabled');

    if (savedEnabled !== null) {
      const enabled = savedEnabled === 'true';
      setIsEnabled(enabled);
      if (!enabled) {
        soundEffects.toggleSound();
      }
    }
  }, []);

  const toggleSound = () => {
    const newEnabled = soundEffects.toggleSound();
    setIsEnabled(newEnabled);

    // Play a test sound when enabling
    if (newEnabled) {
      setTimeout(() => {
        soundEffects.playButtonSound();
      }, 100);
    }
  };

  return (
    <div className="sound-control">
      <button
        className={`sound-toggle ${isEnabled ? 'enabled' : 'disabled'}`}
        onClick={toggleSound}
        title={isEnabled ? 'Disable Sound' : 'Enable Sound'}
      >
        {isEnabled ? '🎵' : '🔇'}
      </button>
    </div>
  );
};

export default SoundControl;
