// Sound Effects Utility for Blink Tac Toe
// Uses Web Audio API to generate sound effects

class SoundEffects {
  constructor() {
    this.audioContext = null;
    this.enabled = true;
    this.volume = 0.3;
    this.initAudioContext();
  }

  initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
      this.enabled = false;
    }
  }

  // Resume audio context if suspended (required by some browsers)
  async resumeAudioContext() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  // Generate a tone with specified frequency and duration
  playTone(frequency, duration, type = 'sine', volume = this.volume) {
    if (!this.enabled || !this.audioContext) return;

    this.resumeAudioContext();

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    oscillator.type = type;

    // Envelope for smooth sound
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  // Play multiple tones in sequence
  playSequence(notes, noteDuration = 0.2) {
    if (!this.enabled || !this.audioContext) return;

    notes.forEach((frequency, index) => {
      setTimeout(() => {
        this.playTone(frequency, noteDuration);
      }, index * noteDuration * 1000);
    });
  }

  // Sound effect for placing an emoji
  playPlaceSound() {
    // Pleasant pop sound
    this.playTone(800, 0.1, 'sine', 0.2);
    setTimeout(() => {
      this.playTone(1000, 0.05, 'sine', 0.1);
    }, 50);
  }

  // Sound effect for hovering over a cell
  playHoverSound() {
    this.playTone(600, 0.05, 'sine', 0.1);
  }

  // Sound effect for winning
  playWinSound() {
    // Victory fanfare
    const victoryNotes = [523, 659, 784, 1047]; // C, E, G, C (major chord)
    this.playSequence(victoryNotes, 0.3);
    
    // Add some sparkle
    setTimeout(() => {
      this.playTone(1568, 0.2, 'triangle', 0.15);
    }, 800);
  }

  // Sound effect for losing (vs computer)
  playLoseSound() {
    // Descending sad notes
    const sadNotes = [523, 466, 415, 349]; // C, Bb, Ab, F
    this.playSequence(sadNotes, 0.4);
  }

  // Sound effect for emoji disappearing (FIFO)
  playDisappearSound() {
    // Whoosh sound
    this.playTone(400, 0.3, 'sawtooth', 0.15);
    setTimeout(() => {
      this.playTone(200, 0.2, 'sawtooth', 0.1);
    }, 100);
  }

  // Sound effect for AI thinking
  playAIThinkingSound() {
    // Subtle beeping
    this.playTone(440, 0.1, 'square', 0.08);
    setTimeout(() => {
      this.playTone(554, 0.1, 'square', 0.08);
    }, 200);
  }

  // Sound effect for button clicks
  playButtonSound() {
    this.playTone(1000, 0.08, 'triangle', 0.15);
  }

  // Sound effect for category selection
  playCategorySelectSound() {
    this.playTone(659, 0.15, 'sine', 0.2);
    setTimeout(() => {
      this.playTone(784, 0.1, 'sine', 0.15);
    }, 100);
  }

  // Sound effect for game start
  playGameStartSound() {
    // Ascending notes
    const startNotes = [523, 659, 784]; // C, E, G
    this.playSequence(startNotes, 0.2);
  }

  // Sound effect for invalid move
  playInvalidMoveSound() {
    // Buzzer sound
    this.playTone(200, 0.3, 'sawtooth', 0.2);
  }

  // Toggle sound on/off
  toggleSound() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  // Set volume (0 to 1)
  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  // Get current volume
  getVolume() {
    return this.volume;
  }

  // Check if sound is enabled
  isEnabled() {
    return this.enabled;
  }
}

// Create and export a singleton instance
const soundEffects = new SoundEffects();
export default soundEffects;
