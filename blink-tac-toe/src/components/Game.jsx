import { useState, useEffect } from 'react';
import { Panel, Button, Modal, Grid, Row, Col, Notification, toaster } from 'rsuite';
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
  const [player1UsedEmojis, setPlayer1UsedEmojis] = useState([]);
  const [player2UsedEmojis, setPlayer2UsedEmojis] = useState([]);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);
  const [showHelp, setShowHelp] = useState(false);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [currentEmoji, setCurrentEmoji] = useState(null);

  // Get random emoji from category (avoiding duplicates)
  const getRandomEmoji = (category, playerNumber) => {
    const emojis = emojiCategories[category];
    const usedEmojis = playerNumber === 1 ? player1UsedEmojis : player2UsedEmojis;

    // Get available emojis (not used yet)
    let availableEmojis = emojis.filter(emoji => !usedEmojis.includes(emoji));

    // If all emojis have been used, reset and use all emojis again
    if (availableEmojis.length === 0) {
      availableEmojis = [...emojis];
      // Reset the used emojis list for the next cycle
      if (playerNumber === 1) {
        setPlayer1UsedEmojis([]);
      } else {
        setPlayer2UsedEmojis([]);
      }
    }

    // Return a random emoji from available ones
    return availableEmojis[Math.floor(Math.random() * availableEmojis.length)];
  };

  // Start game with selected categories
  const startGame = () => {
    if (player1Category && player2Category && player1Category !== player2Category) {
      setGameStarted(true);
      resetGame();
      setCurrentEmoji(getRandomEmoji(player1Category, 1));
    }
  };

  // Reset game state
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setPlayer1Emojis([]);
    setPlayer2Emojis([]);
    setPlayer1Positions([]);
    setPlayer2Positions([]);
    setPlayer1UsedEmojis([]);
    setPlayer2UsedEmojis([]);
    setCurrentPlayer(1);
    setWinner(null);
    setWinningLine([]);
    setCurrentEmoji(getRandomEmoji(player1Category, 1));
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

      // Add current emoji to used emojis list
      setPlayer1UsedEmojis(prev => [...prev, currentEmoji]);

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

      // Add current emoji to used emojis list
      setPlayer2UsedEmojis(prev => [...prev, currentEmoji]);

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
      setCurrentEmoji(getRandomEmoji(nextCategory, nextPlayer));
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
    <Panel className="game-container light-panel">
      <h1 className="game-title">🎮 Blink Tac Toe</h1>

      {!gameStarted ? (
        <div className="category-selection">
          <h2 className="selection-title">Select Emoji Categories</h2>
          <Grid fluid>
            <Row gutter={20}>
              <Col xs={24} sm={12}>
                <CategorySelector
                  player={1}
                  categories={Object.keys(emojiCategories)}
                  selectedCategory={player1Category}
                  onSelectCategory={setPlayer1Category}
                  emojiSamples={emojiCategories}
                  disabledCategory={player2Category}
                />
              </Col>
              <Col xs={24} sm={12}>
                <CategorySelector
                  player={2}
                  categories={Object.keys(emojiCategories)}
                  selectedCategory={player2Category}
                  onSelectCategory={setPlayer2Category}
                  emojiSamples={emojiCategories}
                  disabledCategory={player1Category}
                />
              </Col>
            </Row>
          </Grid>

          <div className="start-section">
            <Button
              appearance="primary"
              size="lg"
              className="start-button light-button"
              onClick={startGame}
              disabled={!player1Category || !player2Category || player1Category === player2Category}
            >
              🚀 Start Game
            </Button>

            {player1Category && player2Category && player1Category === player2Category && (
              <Panel className="error-panel light-error-panel">
                ⚠️ Both players cannot select the same emoji category!
              </Panel>
            )}
          </div>
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
            <Panel className="winner-panel light-success-panel">
              <h2 className="winner-title">🎉 Player {winner} Wins! 🎉</h2>
              <Button
                appearance="primary"
                size="lg"
                className="play-again-button light-button"
                onClick={playAgain}
              >
                🔄 Play Again
              </Button>
            </Panel>
          )}
        </div>
      )}

      <Button
        className="help-button light-help-button"
        onClick={toggleHelp}
        size="sm"
      >
        {showHelp ? '❌ Close Help' : '❓ Help'}
      </Button>

      {showHelp && <HelpModal onClose={toggleHelp} />}
    </Panel>
  );
};

export default Game;
