import React from 'react';
import Cell from './Cell';
import '../styles/Board.css';

const Board = ({ board, onCellClick, winningLine, player1Positions, player2Positions }) => {
  return (
    <div className="board">
      {board.map((cell, index) => (
        <Cell
          key={index}
          value={cell}
          onClick={() => onCellClick(index)}
          isWinningCell={winningLine.includes(index)}
          player={
            player1Positions.includes(index) 
              ? 1 
              : player2Positions.includes(index) 
                ? 2 
                : null
          }
        />
      ))}
    </div>
  );
};

export default Board;
