import { useState } from 'react'
import Landing from './components/Landing'
import Game from './components/Game'
import { Button } from 'rsuite'
import 'rsuite/dist/rsuite.min.css'
import './App.css'

function App() {
  const [showGame, setShowGame] = useState(false)

  const handleGetStarted = () => {
    setShowGame(true)
  }

  const handleBackToLanding = () => {
    setShowGame(false)
  }

  return (
    <div className="app">
      {!showGame ? (
        <Landing onGetStarted={handleGetStarted} />
      ) : (
        <div className="game-wrapper">
          <Button
            className="back-button light-back-button"
            onClick={handleBackToLanding}
            size="sm"
          >
            ← Back to Home
          </Button>
          <Game />
        </div>
      )}
    </div>
  )
}

export default App
