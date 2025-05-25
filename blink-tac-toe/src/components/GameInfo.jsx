import React from 'react';
import { Panel, Grid, Row, Col, FlexboxGrid } from 'rsuite';
import '../styles/GameInfo.css';

const GameInfo = ({
  currentPlayer,
  currentEmoji,
  player1Score,
  player2Score,
  player1Category,
  player2Category,
  player1Name = '',
  player2Name = '',
  winner,
  isVsComputer = false,
  isAIThinking = false
}) => {
  return (
    <div className="game-info">
      <Grid fluid>
        <Row gutter={20}>
          <Col xs={12}>
            <Panel className={`player-score light-score ${currentPlayer === 1 && !winner ? 'active' : ''} ${winner === 1 ? 'winner' : ''}`}>
              <div className="player-label">👤 {player1Name || 'Player 1'}</div>
              <div className="category-label">{player1Category.charAt(0).toUpperCase() + player1Category.slice(1)}</div>
              <div className="score">{player1Score}</div>
              {winner === 1 && <div className="winner-badge">🏆 Winner!</div>}
            </Panel>
          </Col>
          <Col xs={12}>
            <Panel className={`player-score light-score ${currentPlayer === 2 && !winner ? 'active' : ''} ${winner === 2 ? 'winner' : ''}`}>
              <div className="player-label">{isVsComputer ? '🤖 Computer' : `👤 ${player2Name || 'Player 2'}`}</div>
              <div className="category-label">{player2Category.charAt(0).toUpperCase() + player2Category.slice(1)}</div>
              <div className="score">{player2Score}</div>
              {winner === 2 && <div className="winner-badge">🏆 Winner!</div>}
            </Panel>
          </Col>
        </Row>
      </Grid>

      <Panel className="current-turn light-turn">
        {winner ? (
          <div className="turn-label winner-label">
            🎉 {winner === 1 ? `${player1Name || 'Player 1'} Wins!` : (isVsComputer ? 'Computer Wins!' : `${player2Name || 'Player 2'} Wins!`)} 🎉
          </div>
        ) : (
          <FlexboxGrid justify="center" align="middle">
            <FlexboxGrid.Item>
              {isAIThinking && currentPlayer === 2 ? (
                <div className="turn-label">🤖 Computer is thinking...</div>
              ) : (
                <>
                  <div className="turn-label">
                    🎯 {currentPlayer === 1 ? `${player1Name || 'Player 1'}'s Turn` : (isVsComputer ? "Computer's Turn" : `${player2Name || 'Player 2'}'s Turn`)}
                  </div>
                  <div className="current-emoji">{currentEmoji}</div>
                </>
              )}
            </FlexboxGrid.Item>
          </FlexboxGrid>
        )}
      </Panel>
    </div>
  );
};

export default GameInfo;
