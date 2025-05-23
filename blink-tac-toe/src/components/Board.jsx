import React from 'react';
import Cell from './Cell';
import '../styles/Board.css';

const Board = ({ board, onCellClick, winningLine, player1Positions, player2Positions, gameOver }) => {
  return (
    <div className={`board ${gameOver ? 'game-over' : ''}`}>
      {board.map((cell, index) => (
        <Cell
          key={index}
          value={cell}
          onClick={() => !gameOver && onCellClick(index)}
          isWinningCell={winningLine.includes(index)}
          player={
            player1Positions.includes(index)
              ? 1
              : player2Positions.includes(index)
                ? 2
                : null
          }
          disabled={gameOver && !winningLine.includes(index)}
        />
      ))}
    </div>
  );
};

export default Board;
