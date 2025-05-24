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
  winner
}) => {
  return (
    <div className="game-info">
      <Grid fluid>
        <Row gutter={20}>
          <Col xs={12}>
            <Panel className={`player-score light-score ${currentPlayer === 1 && !winner ? 'active' : ''} ${winner === 1 ? 'winner' : ''}`}>
              <div className="player-label">👤 Player 1</div>
              <div className="category-label">{player1Category.charAt(0).toUpperCase() + player1Category.slice(1)}</div>
              <div className="score">{player1Score}</div>
              {winner === 1 && <div className="winner-badge">🏆 Winner!</div>}
            </Panel>
          </Col>
          <Col xs={12}>
            <Panel className={`player-score light-score ${currentPlayer === 2 && !winner ? 'active' : ''} ${winner === 2 ? 'winner' : ''}`}>
              <div className="player-label">👤 Player 2</div>
              <div className="category-label">{player2Category.charAt(0).toUpperCase() + player2Category.slice(1)}</div>
              <div className="score">{player2Score}</div>
              {winner === 2 && <div className="winner-badge">🏆 Winner!</div>}
            </Panel>
          </Col>
        </Row>
      </Grid>

      <Panel className="current-turn light-turn">
        {winner ? (
          <div className="turn-label winner-label">🎉 Player {winner} Wins! 🎉</div>
        ) : (
          <FlexboxGrid justify="center" align="middle">
            <FlexboxGrid.Item>
              <div className="turn-label">🎯 Player {currentPlayer}'s Turn</div>
              <div className="current-emoji">{currentEmoji}</div>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        )}
      </Panel>
    </div>
  );
};

export default GameInfo;
