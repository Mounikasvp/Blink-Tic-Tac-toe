import React from 'react';
import soundEffects from '../utils/soundEffects';
import '../styles/Cell.css';

const Cell = ({ value, onClick, isWinningCell, player, disabled }) => {
  const handleMouseEnter = () => {
    if (!disabled && !value) {
      soundEffects.playHoverSound();
    }
  };

  return (
    <div
      className={`cell ${isWinningCell ? 'winning' : ''} ${player ? `player-${player}` : ''} ${disabled ? 'disabled' : ''}`}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
    >
      {value && (
        <span className="emoji" style={{ animation: value ? 'pop-in 0.3s ease-out' : '' }}>
          {value}
        </span>
      )}
    </div>
  );
};

export default Cell;
