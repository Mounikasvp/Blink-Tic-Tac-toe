import React, { useState } from 'react';
import soundEffects from '../utils/soundEffects';
import HelpModal from './HelpModal';
import '../styles/Landing.css';

const Landing = ({ onGetStarted }) => {
  const [showHelp, setShowHelp] = useState(false);

  const handleGetStarted = () => {
    soundEffects.playButtonSound();
    onGetStarted();
  };

  const handleHelpClick = () => {
    soundEffects.playButtonSound();
    setShowHelp(true);
  };

  const handleCloseHelp = () => {
    soundEffects.playButtonSound();
    setShowHelp(false);
  };

  return (
    <div className="landing-page">
      {/* Header */}
      <div className="landing-header">
        <h1 className="landing-title">
          🎮 Blink Tac Toe
        </h1>
      </div>

      {/* Main Content */}
      <div className="landing-main">
        <div className="landing-content">
          <h2 className="welcome-heading">
            Welcome to the Ultimate Challenge!
          </h2>
          <p className="welcome-description">
            Experience the revolutionary twist on Tic Tac Toe where emojis vanish in a strategic FIFO system. Master the art of timing and placement!
          </p>

          <div className="button-container">
            <button
              onClick={handleGetStarted}
              className="start-button"
            >
              🚀 Get Started
            </button>

            <div className="help-link" onClick={handleHelpClick}>
              <div className="help-icon-new">
                ❓
              </div>
              <span className="help-text-new">How to Play</span>
            </div>
          </div>
        </div>
      </div>

      {/* Help Modal */}
      {showHelp && <HelpModal onClose={handleCloseHelp} />}
    </div>
  );
};

export default Landing;
