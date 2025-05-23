import { useState, useEffect } from 'react';
import Board from './Board';
import CategorySelector from './CategorySelector';
import GameInfo from './GameInfo';
import HelpModal from './HelpModal';
import '../styles/Game.css';

// Emoji categories
const emojiCategories = {
  animals: ['🐶', '🐱', '🐵', '🐰', '🦊', '🐼', '🐨', '🦁', '🐯'],
  food: ['🍕', '🍔', '🍟', '🌭', '🍩', '🍦', '🍓', '🍎', '🍌'],
  sports: ['⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏉', '🎱', '🏓'],
  weather: ['☀️', '🌤️', '⛅', '🌦️', '☁️', '🌧️', '⛈️', '🌩️', '❄️'],
  travel: ['✈️', '🚗', '🚕', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒'],
};

const Game = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [player1Category, setPlayer1Category] = useState('');
  const [player2Category, setPlayer2Category] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player1Emojis, setPlayer1Emojis] = useState([]);
  const [player2Emojis, setPlayer2Emojis] = useState([]);
  const [player1Positions, setPlayer1Positions] = useState([]);
  const [player2Positions, setPlayer2Positions] = useState([]);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);
  const [showHelp, setShowHelp] = useState(false);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [currentEmoji, setCurrentEmoji] = useState(null);

  // Get random emoji from category
  const getRandomEmoji = (category) => {
    const emojis = emojiCategories[category];
    return emojis[Math.floor(Math.random() * emojis.length)];
  };

  // Start game with selected categories
  const startGame = () => {
    if (player1Category && player2Category && player1Category !== player2Category) {
      setGameStarted(true);
      resetGame();
      setCurrentEmoji(getRandomEmoji(player1Category));
    }
  };

  // Reset game state
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setPlayer1Emojis([]);
    setPlayer2Emojis([]);
    setPlayer1Positions([]);
    setPlayer2Positions([]);
    setCurrentPlayer(1);
    setWinner(null);
    setWinningLine([]);
    setCurrentEmoji(getRandomEmoji(player1Category));
  };

  // Handle cell click
  const handleCellClick = (index) => {
    if (winner || board[index] !== null) return;

    const newBoard = [...board];
    const currentCategory = currentPlayer === 1 ? player1Category : player2Category;

    // Add emoji to board
    newBoard[index] = currentEmoji;
    setBoard(newBoard);

    // Track player's emojis and positions
    let newPositions = [];
    if (currentPlayer === 1) {
      const newEmojis = [...player1Emojis, currentEmoji];
      newPositions = [...player1Positions, index];

      // Apply FIFO if more than 3 emojis
      if (newEmojis.length > 3) {
        const oldestPosition = newPositions.shift();
        newEmojis.shift();
        newBoard[oldestPosition] = null;
      }

      setPlayer1Emojis(newEmojis);
      setPlayer1Positions(newPositions);
    } else {
      const newEmojis = [...player2Emojis, currentEmoji];
      newPositions = [...player2Positions, index];

      // Apply FIFO if more than 3 emojis
      if (newEmojis.length > 3) {
        const oldestPosition = newPositions.shift();
        newEmojis.shift();
        newBoard[oldestPosition] = null;
      }

      setPlayer2Emojis(newEmojis);
      setPlayer2Positions(newPositions);
    }

    // Check for winner with updated positions
    const hasWinner = checkWinnerAndUpdate(newBoard, currentPlayer, newPositions);

    // Only switch player if there's no winner
    if (!hasWinner) {
      const nextPlayer = currentPlayer === 1 ? 2 : 1;
      const nextCategory = nextPlayer === 1 ? player1Category : player2Category;
      setCurrentPlayer(nextPlayer);
      setCurrentEmoji(getRandomEmoji(nextCategory));
    }
  };

  // Check for winner and update game state
  const checkWinnerAndUpdate = (board, playerNumber, currentPlayerPositions) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[b] && board[c]) {
        // Check if all three positions belong to the current player
        const hasAllPositions =
          currentPlayerPositions.includes(a) &&
          currentPlayerPositions.includes(b) &&
          currentPlayerPositions.includes(c);

        if (hasAllPositions) {
          setWinner(playerNumber);
          setWinningLine(pattern);

          if (playerNumber === 1) {
            setPlayer1Score(player1Score + 1);
          } else {
            setPlayer2Score(player2Score + 1);
          }

          return true; // Return true to indicate we have a winner
        }
      }
    }

    return false; // No winner found
  };

  // Legacy check winner function (kept for compatibility)
  const checkWinner = (board) => {
    const currentPositions = currentPlayer === 1 ? player1Positions : player2Positions;
    checkWinnerAndUpdate(board, currentPlayer, currentPositions);
  };

  // Play again after a win
  const playAgain = () => {
    resetGame();
  };

  // Toggle help modal
  const toggleHelp = () => {
    setShowHelp(!showHelp);
  };

  return (
    <div className="game-container">
      <h1>Blink Tac Toe</h1>

      {!gameStarted ? (
        <div className="category-selection">
          <h2>Select Emoji Categories</h2>
          <div className="categories-container">
            <CategorySelector
              player={1}
              categories={Object.keys(emojiCategories)}
              selectedCategory={player1Category}
              onSelectCategory={setPlayer1Category}
              emojiSamples={emojiCategories}
              disabledCategory={player2Category}
            />
            <CategorySelector
              player={2}
              categories={Object.keys(emojiCategories)}
              selectedCategory={player2Category}
              onSelectCategory={setPlayer2Category}
              emojiSamples={emojiCategories}
              disabledCategory={player1Category}
            />
          </div>
          <button
            className="start-button"
            onClick={startGame}
            disabled={!player1Category || !player2Category || player1Category === player2Category}
          >
            Start Game
          </button>
          {player1Category && player2Category && player1Category === player2Category && (
            <div className="error-message">Both players cannot select the same emoji category!</div>
          )}
        </div>
      ) : (
        <div className="game-play">
          <GameInfo
            currentPlayer={currentPlayer}
            currentEmoji={currentEmoji}
            player1Score={player1Score}
            player2Score={player2Score}
            player1Category={player1Category}
            player2Category={player2Category}
            winner={winner}
          />

          <Board
            board={board}
            onCellClick={handleCellClick}
            winningLine={winningLine}
            player1Positions={player1Positions}
            player2Positions={player2Positions}
            gameOver={winner !== null}
          />

          {winner && (
            <div className="winner-message">
              <h2>Player {winner} Wins! 🎉</h2>
              <button className="play-again-button" onClick={playAgain}>
                Play Again
              </button>
            </div>
          )}
        </div>
      )}

      <button className="help-button" onClick={toggleHelp}>
        {showHelp ? 'Close Help' : 'Help'}
      </button>

      {showHelp && <HelpModal onClose={toggleHelp} />}
    </div>
  );
};

export default Game;
