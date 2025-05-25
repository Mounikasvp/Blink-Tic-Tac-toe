import React from 'react';
import { Modal, Panel, Button, List, Divider } from 'rsuite';
import soundEffects from '../utils/soundEffects';
import '../styles/HelpModal.css';

const HelpModal = ({ onClose }) => {
  return (
    <Modal open={true} onClose={onClose} size="sm" className="help-modal-container light-modal">
      <Modal.Header className="light-header">
        <Modal.Title className="help-title">🎮 How to Play Blink Tac Toe</Modal.Title>
        <button
          className="custom-close-button"
          onClick={() => {
            soundEffects.playButtonSound();
            onClose();
          }}
        >
          ✕
        </button>
      </Modal.Header>
      <Modal.Body className="help-body light-body">
        <div className="rules-list">
          <Panel className="rule-item light-rule-item">
            <div className="rule-header">
              <span className="rule-icon">🎯</span>
              <span className="rule-title">Game Setup</span>
            </div>
            <div className="rule-description">
              • Each player selects a different emoji category<br/>
              • Choose from animals, food, sports, nature, or objects<br/>
              • Both players cannot pick the same category
            </div>
          </Panel>

          <Panel className="rule-item light-rule-item">
            <div className="rule-header">
              <span className="rule-icon">🎲</span>
              <span className="rule-title">How to Play</span>
            </div>
            <div className="rule-description">
              • Player 1 goes first, then alternating turns<br/>
              • Each turn you get a random emoji from your category<br/>
              • Click any empty cell to place your emoji<br/>
              • No duplicate emojis until you've used all in your category
            </div>
          </Panel>

          <Panel className="rule-item light-rule-item">
            <div className="rule-header">
              <span className="rule-icon">💨</span>
              <span className="rule-title">Vanishing Rule</span>
            </div>
            <div className="rule-description">
              • Each player can only have 3 emojis on the board<br/>
              • When you place a 4th emoji, your oldest one disappears<br/>
              • This follows FIFO (First In, First Out) logic<br/>
              • Strategy changes as emojis vanish!
            </div>
          </Panel>

          <Panel className="rule-item light-rule-item">
            <div className="rule-header">
              <span className="rule-icon">🏆</span>
              <span className="rule-title">How to Win</span>
            </div>
            <div className="rule-description">
              • Get 3 of your emojis in a row to win<br/>
              • Can be horizontal, vertical, or diagonal<br/>
              • Game ends immediately when someone wins<br/>
              • No draws possible due to vanishing rule
            </div>
          </Panel>
        </div>

        <Divider className="help-divider">💡 Quick Tips</Divider>

        <div className="tips-section">
          <Panel className="tip-item light-tip-item">
            <span className="tip-emoji">✨</span>
            <span className="tip-text">No duplicate emojis for each player</span>
          </Panel>
          <Panel className="tip-item light-tip-item">
            <span className="tip-emoji">🔄</span>
            <span className="tip-text">Strategy changes as emojis vanish</span>
          </Panel>
        </div>
      </Modal.Body>
      <Modal.Footer className="light-footer">
        <Button
          onClick={() => {
            soundEffects.playButtonSound();
            onClose();
          }}
          appearance="primary"
          className="light-close-btn"
        >
          👍 Got it!
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default HelpModal;
