import React from 'react';
import '../styles/GameInfo.css';

const GameInfo = ({
  currentPlayer,
  currentEmoji,
  player1Score,
  player2Score,
  player1Category,
  player2Category,
  winner
}) => {
  return (
    <div className="game-info">
      <div className="score-container">
        <div className={`player-score ${currentPlayer === 1 && !winner ? 'active' : ''} ${winner === 1 ? 'winner' : ''}`}>
          <div className="player-label">Player 1</div>
          <div className="category-label">{player1Category.charAt(0).toUpperCase() + player1Category.slice(1)}</div>
          <div className="score">{player1Score}</div>
        </div>
        <div className={`player-score ${currentPlayer === 2 && !winner ? 'active' : ''} ${winner === 2 ? 'winner' : ''}`}>
          <div className="player-label">Player 2</div>
          <div className="category-label">{player2Category.charAt(0).toUpperCase() + player2Category.slice(1)}</div>
          <div className="score">{player2Score}</div>
        </div>
      </div>

      <div className="current-turn">
        {winner ? (
          <div className="turn-label winner-label">Player {winner} Wins!</div>
        ) : (
          <>
            <div className="turn-label">Player {currentPlayer}'s Turn</div>
            <div className="current-emoji">{currentEmoji}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default GameInfo;
