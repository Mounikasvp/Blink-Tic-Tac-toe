import React from 'react';
import '../styles/Cell.css';

const Cell = ({ value, onClick, isWinningCell, player }) => {
  return (
    <div 
      className={`cell ${isWinningCell ? 'winning' : ''} ${player ? `player-${player}` : ''}`}
      onClick={onClick}
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
