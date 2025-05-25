import React from 'react';
import { Panel, Stack } from 'rsuite';
import soundEffects from '../utils/soundEffects';
import '../styles/CategorySelector.css';

const CategorySelector = ({
  player,
  categories,
  selectedCategory,
  onSelectCategory,
  emojiSamples,
  disabledCategory,
  isWarriorMode = false,
  player1Category = '',
  player2Category = '',
  onPlayer1Select = null,
  onPlayer2Select = null,
  onStartGame = null,
  onClose = null,
  isVsComputer = false
}) => {

  // Warrior mode - dual player selection
  if (isWarriorMode) {
    return (
      <div className="category-selector warrior-mode">
        <button className="close-button" onClick={onClose || (() => window.history.back())}>
          ✕
        </button>

        <div className="warrior-header">
          <h1 className="warrior-main-title">
            {isVsComputer ? 'Choose Your Emoji Category' : 'Choose Your Emoji Categories'}
          </h1>
          <p className="warrior-subtitle">
            {isVsComputer ? 'Pick your emoji weapons to battle the computer!' : 'Both players pick your emoji weapons!'}
          </p>
        </div>

        <div className={`dual-player-selection ${isVsComputer ? 'single-player-mode' : ''}`}>
          <div className="player-section">
            <h3 className="player-header">👤 Player 1</h3>
            <div className="categories-grid">
              {categories.map((category) => {
                const isSelected = player1Category === category;
                const isDisabled = !isVsComputer && player2Category === category;
                return (
                  <div
                    key={`p1-${category}`}
                    className={`category-card ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
                    onClick={() => {
                      if (!isDisabled && onPlayer1Select) {
                        soundEffects.playCategorySelectSound();
                        onPlayer1Select(category);
                      }
                    }}
                  >
                    <div className="category-header">
                      <h4 className="category-name">{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                    </div>
                    <div className="emoji-grid">
                      {emojiSamples[category].slice(0, 4).map((emoji, index) => (
                        <span key={index} className="emoji-item">{emoji}</span>
                      ))}
                    </div>
                    {isSelected && <div className="selected-indicator">✓</div>}
                    {isDisabled && (
                      <div className="disabled-overlay">
                        <span className="disabled-text">Player 2's Choice</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {!isVsComputer && (
            <div className="player-section">
              <h3 className="player-header">👤 Player 2</h3>
              <div className="categories-grid">
                {categories.map((category) => {
                  const isSelected = player2Category === category;
                  const isDisabled = player1Category === category;
                  return (
                    <div
                      key={`p2-${category}`}
                      className={`category-card ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
                      onClick={() => {
                        if (!isDisabled && onPlayer2Select) {
                          soundEffects.playCategorySelectSound();
                          onPlayer2Select(category);
                        }
                      }}
                    >
                      <div className="category-header">
                        <h4 className="category-name">{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                      </div>
                      <div className="emoji-grid">
                        {emojiSamples[category].slice(0, 4).map((emoji, index) => (
                          <span key={index} className="emoji-item">{emoji}</span>
                        ))}
                      </div>
                      {isSelected && <div className="selected-indicator">✓</div>}
                      {isDisabled && (
                        <div className="disabled-overlay">
                          <span className="disabled-text">Player 1's Choice</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="start-section">
          <button
            className="start-game-button"
            onClick={() => {
              soundEffects.playButtonSound();
              onStartGame();
            }}
            disabled={isVsComputer ? !player1Category : (!player1Category || !player2Category || player1Category === player2Category)}
          >
            🚀 Start Game
          </button>

          {!isVsComputer && player1Category && player2Category && player1Category === player2Category && (
            <div className="error-message">
              ⚠️ Both players cannot select the same emoji category!
            </div>
          )}

          {isVsComputer && player1Category && (
            <div className="info-message">
              🤖 Computer will automatically select a different category
            </div>
          )}
        </div>
      </div>
    );
  }

  // Original single player mode
  return (
    <div className="category-selector">
      <h3 className="player-title light-player-title">👤 Player {player}</h3>
      <Stack direction="column" spacing={15}>
        {categories.map((category) => {
          const isDisabled = category === disabledCategory;
          return (
            <Panel
              key={category}
              className={`category-option light-category ${selectedCategory === category ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
              onClick={() => !isDisabled && onSelectCategory(category)}
              bordered
            >
              <div className="category-name">{category.charAt(0).toUpperCase() + category.slice(1)}</div>
              <div className="emoji-samples">
                {emojiSamples[category].slice(0, 3).map((emoji, index) => (
                  <span key={index} className="emoji-sample">{emoji}</span>
                ))}
              </div>
              {isDisabled && (
                <div className="disabled-overlay light-disabled">
                  🚫 Selected by Player {player === 1 ? 2 : 1}
                </div>
              )}
            </Panel>
          );
        })}
      </Stack>
    </div>
  );
};

export default CategorySelector;
