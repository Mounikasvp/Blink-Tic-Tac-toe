import { useState } from 'react'
import Landing from './components/Landing'
import GameModeSelector from './components/GameModeSelector'
import Game from './components/Game'
import SoundControl from './components/SoundControl'
import { Button } from 'rsuite'
import 'rsuite/dist/rsuite.min.css'
import './App.css'

function App() {
  const [currentScreen, setCurrentScreen] = useState('landing') // 'landing', 'gameMode', 'game'
  const [gameMode, setGameMode] = useState(null) // '2players' or 'computer'

  const handleGetStarted = () => {
    setCurrentScreen('gameMode')
  }

  const handleSelectGameMode = (mode) => {
    setGameMode(mode)
    setCurrentScreen('game')
  }

  const handleBackToLanding = () => {
    setCurrentScreen('landing')
    setGameMode(null)
  }

  const handleBackToGameMode = () => {
    setCurrentScreen('gameMode')
  }

  return (
    <div className="app">
      <SoundControl />

      {currentScreen === 'landing' && (
        <Landing onGetStarted={handleGetStarted} />
      )}

      {currentScreen === 'gameMode' && (
        <>
          <Landing onGetStarted={handleGetStarted} />
          <GameModeSelector
            onSelectMode={handleSelectGameMode}
            onBack={handleBackToLanding}
          />
        </>
      )}

      {currentScreen === 'game' && (
        <div className="game-wrapper">
          <Button
            className="back-button light-back-button"
            onClick={handleBackToGameMode}
            size="sm"
          >
            ← Back to Game Mode
          </Button>
          <Game gameMode={gameMode} onBackToGameMode={handleBackToGameMode} />
        </div>
      )}
    </div>
  )
}

export default App
