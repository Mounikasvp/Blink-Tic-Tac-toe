import React from 'react';
import '../styles/GameModeSelector.css';

const GameModeSelector = ({ onSelectMode, onBack }) => {
  return (
    <div className="game-mode-overlay">
      <div className="game-mode-modal">
        <div className="modal-header">
          <h2 className="modal-title">Choose Game Mode</h2>
          <button className="close-button" onClick={onBack}>
            ✕
          </button>
        </div>
        
        <div className="mode-options">
          <button 
            className="mode-button two-players"
            onClick={() => onSelectMode('2players')}
          >
            <div className="mode-icon">👥</div>
            <span className="mode-text">2 Players</span>
          </button>
          
          <button 
            className="mode-button vs-computer"
            onClick={() => onSelectMode('computer')}
          >
            <div className="mode-icon">🤖</div>
            <span className="mode-text">vs Computer</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameModeSelector;
