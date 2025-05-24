import React from 'react';
import { Panel, Button, Grid, Row, Col } from 'rsuite';
import '../styles/Landing.css';

const Landing = ({ onGetStarted }) => {
  const features = [
    {
      icon: '🎯',
      title: 'Strategic Gameplay',
      description: 'Choose your emoji category and plan your moves carefully'
    },
    {
      icon: '💨',
      title: 'Vanishing Rule',
      description: 'Only 3 emojis per player - oldest disappears when placing 4th'
    },
    {
      icon: '🏆',
      title: 'Quick Wins',
      description: 'Get 3 in a row to win - horizontal, vertical, or diagonal'
    }
  ];



  return (
    <div className="landing-container">
      <Panel className="landing-panel light-panel">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="game-logo">
            <span className="logo-emoji">🎮</span>
            <h1 className="landing-title">Blink Tac Toe</h1>
          </div>
          <p className="landing-subtitle">
            The classic Tic Tac Toe game with a fun emoji twist and strategic vanishing rule!
          </p>
          <Button
            appearance="primary"
            size="lg"
            className="get-started-button light-button"
            onClick={onGetStarted}
          >
            🚀 Get Started
          </Button>
        </div>

        {/* Features Section */}
        <div className="features-section">
          <h2 className="section-title">✨ Game Features</h2>
          <Grid fluid>
            <Row gutter={20}>
              {features.map((feature, index) => (
                <Col xs={24} sm={12} md={8} key={index}>
                  <Panel className="feature-card light-feature-card">
                    <div className="feature-icon">{feature.icon}</div>
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-description">{feature.description}</p>
                  </Panel>
                </Col>
              ))}
            </Row>
          </Grid>
        </div>

        {/* Call to Action */}
        <div className="cta-section">
          <h2 className="cta-title">Ready to Play? 🎉</h2>
          <p className="cta-description">
            Challenge your friends or family to this exciting twist on the classic game!
          </p>
          <Button
            appearance="primary"
            size="lg"
            className="cta-button light-button"
            onClick={onGetStarted}
          >
            🎮 Start Playing Now
          </Button>
        </div>
      </Panel>
    </div>
  );
};

export default Landing;
