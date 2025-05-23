import React from 'react';
import '../styles/HelpModal.css';

const HelpModal = ({ onClose }) => {
  return (
    <div className="help-modal-overlay">
      <div className="help-modal">
        <h2>How to Play Blink Tac Toe</h2>
        
        <div className="rule-section">
          <h3>Game Setup</h3>
          <ul>
            <li>Each player selects an emoji category before the game begins.</li>
            <li>The game is played on a 3x3 grid like regular Tic Tac Toe.</li>
          </ul>
        </div>
        
        <div className="rule-section">
          <h3>Gameplay</h3>
          <ul>
            <li>Player 1 goes first, followed by Player 2, alternating turns.</li>
            <li>On your turn, you'll be assigned a random emoji from your category.</li>
            <li>Click on any empty cell to place your emoji.</li>
          </ul>
        </div>
        
        <div className="rule-section">
          <h3>Vanishing Rule</h3>
          <ul>
            <li>Each player can have only 3 emojis on the board at any time.</li>
            <li>When you place a 4th emoji, your oldest emoji is automatically removed (FIFO logic).</li>
            <li>The removed emoji's cell becomes empty and reusable.</li>
          </ul>
        </div>
        
        <div className="rule-section">
          <h3>Winning</h3>
          <ul>
            <li>Win by forming a line of 3 of your emojis horizontally, vertically, or diagonally.</li>
            <li>Draws are not possible because the board can never be fully filled.</li>
          </ul>
        </div>
        
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default HelpModal;
