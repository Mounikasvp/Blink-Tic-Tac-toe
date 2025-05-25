import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'rsuite';
import soundEffects from '../utils/soundEffects';
import '../styles/WinnerModal.css';

const WinnerModal = ({ 
  winner, 
  isVsComputer, 
  player1Category, 
  player2Category, 
  onPlayAgain, 
  onClose 
}) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);

  useEffect(() => {
    if (winner) {
      // Start confetti animation
      setShowConfetti(true);
      
      // Start fireworks after a delay
      setTimeout(() => {
        setShowFireworks(true);
      }, 500);

      // Play winner sound
      if (isVsComputer) {
        if (winner === 1) {
          soundEffects.playWinSound();
        } else {
          soundEffects.playLoseSound();
        }
      } else {
        soundEffects.playWinSound();
      }
    }
  }, [winner, isVsComputer]);

  const getWinnerTitle = () => {
    if (isVsComputer) {
      return winner === 1 ? '🎉 Victory! 🎉' : '🤖 Computer Wins! 🤖';
    }
    return `🏆 Player ${winner} Wins! 🏆`;
  };

  const getWinnerMessage = () => {
    if (isVsComputer) {
      if (winner === 1) {
        return `Congratulations! You defeated the computer using ${player1Category} emojis!`;
      } else {
        return `The computer outsmarted you this time with ${player2Category} emojis. Try again!`;
      }
    }
    
    const winnerCategory = winner === 1 ? player1Category : player2Category;
    return `Amazing strategy with ${winnerCategory} emojis! Well played!`;
  };

  const getWinnerEmoji = () => {
    if (isVsComputer) {
      return winner === 1 ? '👑' : '🤖';
    }
    return winner === 1 ? '🥇' : '🥈';
  };

  const handlePlayAgain = () => {
    soundEffects.playButtonSound();
    setShowConfetti(false);
    setShowFireworks(false);
    onPlayAgain();
  };

  const handleClose = () => {
    soundEffects.playButtonSound();
    setShowConfetti(false);
    setShowFireworks(false);
    onClose();
  };

  return (
    <Modal 
      open={!!winner} 
      onClose={handleClose} 
      size="sm" 
      className="winner-modal-container"
      backdrop="static"
    >
      <div className="winner-modal-content">
        {/* Confetti Animation */}
        {showConfetti && (
          <div className="confetti-container">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className={`confetti confetti-${i % 6}`}
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        )}

        {/* Fireworks Animation */}
        {showFireworks && (
          <div className="fireworks-container">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`firework firework-${i + 1}`}
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 40}%`,
                  animationDelay: `${i * 0.5}s`
                }}
              />
            ))}
          </div>
        )}

        {/* Winner Content */}
        <div className="winner-content">
          <div className="winner-emoji-large">
            {getWinnerEmoji()}
          </div>
          
          <h1 className="winner-title-large">
            {getWinnerTitle()}
          </h1>
          
          <p className="winner-message">
            {getWinnerMessage()}
          </p>

          <div className="winner-actions">
            <Button
              className="play-again-btn-large"
              onClick={handlePlayAgain}
              size="lg"
            >
              🔄 Play Again
            </Button>
            
            <Button
              className="back-to-menu-btn"
              onClick={handleClose}
              appearance="subtle"
              size="lg"
            >
              🏠 Back to Menu
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default WinnerModal;
