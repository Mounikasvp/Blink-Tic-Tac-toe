import { useState, useEffect } from 'react';
import { Panel, Button, Modal, Grid, Row, Col, Notification, toaster } from 'rsuite';
import Board from './Board';
import CategorySelector from './CategorySelector';
import GameInfo from './GameInfo';
import HelpModal from './HelpModal';
import WinnerModal from './WinnerModal';
import { getAIMove } from '../utils/aiPlayer';
import soundEffects from '../utils/soundEffects';
import '../styles/Game.css';

// Emoji categories
const emojiCategories = {
  animals: ['🐶', '🐱', '🐵', '🐰', '🦊', '🐼', '🐨', '🦁', '🐯'],
  food: ['🍕', '🍔', '🍟', '🌭', '🍩', '🍦', '🍓', '🍎', '🍌'],
  sports: ['⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏉', '🎱', '🏓'],
  weather: ['☀️', '🌤️', '⛅', '🌦️', '☁️', '🌧️', '⛈️', '🌩️', '❄️'],
};

const Game = ({ gameMode = '2players', onBackToGameMode }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [player1Category, setPlayer1Category] = useState('');
  const [player2Category, setPlayer2Category] = useState('');
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
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
  const [isAIThinking, setIsAIThinking] = useState(false);

  const isVsComputer = gameMode === 'computer';

  // AI move effect - trigger when it's computer's turn
  useEffect(() => {
    if (isVsComputer && currentPlayer === 2 && gameStarted && !winner) {
      setIsAIThinking(true);
      soundEffects.playAIThinkingSound();

      // Add delay to make AI move feel more natural
      const aiMoveTimer = setTimeout(() => {
        makeAIMove();
      }, 1000);

      return () => clearTimeout(aiMoveTimer);
    }
  }, [currentPlayer, gameStarted, winner, isVsComputer]);

  // AI move function
  const makeAIMove = () => {
    const availableMoves = board.map((cell, index) => cell === null ? index : null).filter(val => val !== null);

    if (availableMoves.length === 0) {
      setIsAIThinking(false);
      return;
    }

    // Simple AI: try to win, block player, or take random move
    let aiMove = null;

    // 1. Try to win
    for (const move of availableMoves) {
      if (wouldWin(move, player2Positions)) {
        aiMove = move;
        break;
      }
    }

    // 2. Block player from winning
    if (aiMove === null) {
      for (const move of availableMoves) {
        if (wouldWin(move, player1Positions)) {
          aiMove = move;
          break;
        }
      }
    }

    // 3. Take center if available
    if (aiMove === null && availableMoves.includes(4)) {
      aiMove = 4;
    }

    // 4. Take random available move
    if (aiMove === null) {
      aiMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    // Make the AI move
    if (aiMove !== null) {
      const newBoard = [...board];
      const aiEmoji = getRandomEmoji(player2Category, 2);

      // Add emoji to board
      newBoard[aiMove] = aiEmoji;
      setBoard(newBoard);
      setCurrentEmoji(aiEmoji);
      soundEffects.playPlaceSound();

      // Update AI positions and emojis
      const newAIEmojis = [...player2Emojis, aiEmoji];
      let newAIPositions = [...player2Positions, aiMove];

      // Add to used emojis
      setPlayer2UsedEmojis(prev => [...prev, aiEmoji]);

      // Apply FIFO if more than 3 emojis
      if (newAIEmojis.length > 3) {
        const oldestPosition = newAIPositions.shift();
        newAIEmojis.shift();
        newBoard[oldestPosition] = null;
        setBoard(newBoard);
        soundEffects.playDisappearSound();
      }

      setPlayer2Emojis(newAIEmojis);
      setPlayer2Positions(newAIPositions);

      // Check for winner
      const hasWinner = checkWinnerAndUpdate(newBoard, 2, newAIPositions);

      // Switch back to player 1 if no winner
      if (!hasWinner) {
        setCurrentPlayer(1);
        setCurrentEmoji(getRandomEmoji(player1Category, 1));
      }
    }

    setIsAIThinking(false);
  };

  // Helper function to check if a move would create a winning line
  const wouldWin = (move, playerPositions) => {
    const newPositions = [...playerPositions, move];

    // Apply FIFO rule if more than 3 positions
    if (newPositions.length > 3) {
      newPositions.shift();
    }

    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (newPositions.includes(a) && newPositions.includes(b) && newPositions.includes(c)) {
        return true;
      }
    }
    return false;
  };

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
    if (isVsComputer) {
      // For vs computer, only need player 1 category, computer gets a random different one
      if (player1Category) {
        const availableCategories = Object.keys(emojiCategories).filter(cat => cat !== player1Category);
        const computerCategory = availableCategories[Math.floor(Math.random() * availableCategories.length)];

        setPlayer2Category(computerCategory);

        // Reset game state first
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

        setGameStarted(true);
        setCurrentEmoji(getRandomEmoji(player1Category, 1));
        soundEffects.playGameStartSound();
      }
    } else {
      // For 2 players, need both categories and they must be different
      if (player1Category && player2Category && player1Category !== player2Category) {
        setGameStarted(true);
        resetGame();
        setCurrentEmoji(getRandomEmoji(player1Category, 1));
        soundEffects.playGameStartSound();
      }
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

  // Handle human cell click
  const handleCellClick = (index) => {
    // Only allow human moves when appropriate
    if (winner || board[index] !== null) {
      if (board[index] !== null) {
        soundEffects.playInvalidMoveSound();
      }
      return;
    }
    if (isVsComputer && (currentPlayer === 2 || isAIThinking)) return;

    const newBoard = [...board];

    // Add emoji to board
    newBoard[index] = currentEmoji;
    setBoard(newBoard);
    soundEffects.playPlaceSound();

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
        setBoard(newBoard);
        soundEffects.playDisappearSound();
      }

      setPlayer1Emojis(newEmojis);
      setPlayer1Positions(newPositions);
    } else {
      // Player 2 in 2-player mode
      const newEmojis = [...player2Emojis, currentEmoji];
      newPositions = [...player2Positions, index];

      // Add current emoji to used emojis list
      setPlayer2UsedEmojis(prev => [...prev, currentEmoji]);

      // Apply FIFO if more than 3 emojis
      if (newEmojis.length > 3) {
        const oldestPosition = newPositions.shift();
        newEmojis.shift();
        newBoard[oldestPosition] = null;
        setBoard(newBoard);
        soundEffects.playDisappearSound();
      }

      setPlayer2Emojis(newEmojis);
      setPlayer2Positions(newPositions);
    }

    // Check for winner with updated positions
    const hasWinner = checkWinnerAndUpdate(newBoard, currentPlayer, newPositions);

    // Only switch player if no winner
    if (!hasWinner) {
      if (isVsComputer) {
        setCurrentPlayer(2);
        // AI will move automatically via useEffect
      } else {
        // 2-player mode
        const nextPlayer = currentPlayer === 1 ? 2 : 1;
        const nextCategory = nextPlayer === 1 ? player1Category : player2Category;
        setCurrentPlayer(nextPlayer);
        setCurrentEmoji(getRandomEmoji(nextCategory, nextPlayer));
      }
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

          // Play appropriate win/lose sound
          if (isVsComputer) {
            if (playerNumber === 1) {
              soundEffects.playWinSound();
            } else {
              soundEffects.playLoseSound();
            }
          } else {
            soundEffects.playWinSound();
          }

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
    soundEffects.playButtonSound();
    resetGame();
  };

  // Toggle help modal
  const toggleHelp = () => {
    soundEffects.playButtonSound();
    setShowHelp(!showHelp);
  };

  return (
    <Panel className="game-container light-panel">
      <h1 className="game-title">🎮 Blink Tac Toe</h1>

      {!gameStarted ? (
        // Both modes now use Warrior Mode UI
        <CategorySelector
          isWarriorMode={true}
          categories={Object.keys(emojiCategories)}
          emojiSamples={emojiCategories}
          player1Category={player1Category}
          player2Category={player2Category}
          player1Name={player1Name}
          player2Name={player2Name}
          onPlayer1Select={setPlayer1Category}
          onPlayer2Select={setPlayer2Category}
          onPlayer1NameChange={setPlayer1Name}
          onPlayer2NameChange={setPlayer2Name}
          onStartGame={startGame}
          onClose={onBackToGameMode}
          isVsComputer={isVsComputer}
        />
      ) : (
        <div className="game-play-fullscreen">
          <button className="close-button game-close-button" onClick={onBackToGameMode}>
            ✕
          </button>

          <div className="game-header">
            <h1 className="game-main-title">🎮 Blink Tac Toe</h1>
          </div>

          <GameInfo
            currentPlayer={currentPlayer}
            currentEmoji={currentEmoji}
            player1Score={player1Score}
            player2Score={player2Score}
            player1Category={player1Category}
            player2Category={player2Category}
            player1Name={player1Name}
            player2Name={player2Name}
            winner={winner}
            isVsComputer={isVsComputer}
            isAIThinking={isAIThinking}
          />

          <div className="board-container">
            <Board
              board={board}
              onCellClick={handleCellClick}
              winningLine={winningLine}
              player1Positions={player1Positions}
              player2Positions={player2Positions}
              gameOver={winner !== null}
            />
          </div>



          <button
            className="help-button game-help-button"
            onClick={toggleHelp}
          >
            {showHelp ? '❌' : '❓'}
          </button>

          {showHelp && <HelpModal onClose={toggleHelp} />}
        </div>
      )}

      {!gameStarted && (
        <>
          <Button
            className="help-button light-help-button"
            onClick={toggleHelp}
            size="sm"
          >
            {showHelp ? '❌ Close Help' : '❓ Help'}
          </Button>

          {showHelp && <HelpModal onClose={toggleHelp} />}
        </>
      )}

      {/* Winner Modal */}
      <WinnerModal
        winner={winner}
        isVsComputer={isVsComputer}
        player1Category={player1Category}
        player2Category={player2Category}
        player1Name={player1Name}
        player2Name={player2Name}
        onPlayAgain={playAgain}
        onClose={onBackToGameMode}
      />
    </Panel>
  );
};

export default Game;
