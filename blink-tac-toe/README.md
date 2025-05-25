# 🎮 Blink Tac Toe

A revolutionary twist on the classic Tic Tac Toe game featuring emoji categories, vanishing pieces, and strategic FIFO gameplay mechanics. Experience the ultimate challenge where timing and placement are everything!

## ✨ Key Features

- **🎯 Emoji-Based Gameplay**: Choose from multiple emoji categories for a unique visual experience
- **⚡ Vanishing Rule**: Strategic FIFO system where only 3 emojis per player can exist on the board
- **🎮 Multiple Game Modes**: Play against friends (2-player) or challenge the AI (vs Computer)
- **🎵 Sound Effects**: Immersive audio feedback for all game actions
- **📱 Responsive Design**: Optimized for all screen sizes from mobile to desktop
- **⏸️ Pause/Resume**: Control your game flow with integrated pause functionality
- **🏆 Score Tracking**: Keep track of wins across multiple rounds
- **❓ Interactive Help**: Comprehensive game rules and tips
- **⚙️ Settings**: Customizable audio preferences with persistent storage

## 🛠️ Tech Stack

- **Framework**: React.js with Hooks
- **Build Tool**: Vite
- **UI Library**: RSuite Components
- **Styling**: Custom CSS with responsive design
- **State Management**: React useState and useEffect
- **Audio**: Web Audio API integration

## 🎨 Emoji Categories

Choose your warrior category and dominate the battlefield:

- **🐾 Animals**: 🐶 🐱 🐵 🐰 🦊 🐼 🐨 🦁 🐯
- **🍕 Food**: 🍕 🍔 🍟 🌭 🍩 🍦 🍓 🍎 🍌
- **⚽ Sports**: ⚽ 🏀 🏈 ⚾ 🎾 🏐 🏉 🎱 🏓
- **🌤️ Weather**: ☀️ 🌤️ ⛅ 🌦️ ☁️ 🌧️ ⛈️ 🌩️ ❄️

Each category contains 9 unique emojis, ensuring variety and preventing repetition during gameplay.

## 📋 Game Rules

### 🎯 Basic Gameplay
1. **Board Structure**
   - 3x3 grid similar to classic Tic Tac Toe
   - Maximum of 6 active emojis on board (3 per player)
   - Clean, intuitive interface with visual feedback

2. **Category Selection**
   - Each player chooses a unique emoji category
   - Players can set custom names for personalization
   - Computer automatically selects different category in AI mode

3. **Turn-Based Strategy**
   - Player 1 starts, alternating turns
   - Random emoji assigned from player's category each turn
   - Place emoji on any empty cell

### ⚡ The Vanishing Rule (FIFO System)
4. **Strategic Limitation**
   - Each player limited to 3 emojis on board simultaneously
   - 4th emoji placement triggers automatic removal of oldest emoji
   - Creates dynamic, ever-changing board state
   - Requires strategic thinking about placement timing

5. **Victory Conditions**
   - Form horizontal, vertical, or diagonal line of 3 emojis
   - All winning emojis must belong to same player
   - Game ends immediately upon winning line formation

### 🎮 Game Modes
6. **2-Player Mode**
   - Local multiplayer experience
   - Both players select categories and names
   - Turn-based gameplay with visual turn indicators

7. **vs Computer Mode**
   - Challenge AI opponent with strategic thinking
   - AI uses intelligent move selection (win/block/center/random)
   - Computer gets random category different from player's choice

## 🔧 Technical Implementation

### ⚡ FIFO Vanishing System
The core vanishing feature uses a sophisticated First-In-First-Out approach:

1. **State Tracking**: Separate arrays track each player's emojis and positions
2. **Automatic Removal**: 4th emoji placement triggers oldest emoji removal
3. **Board Synchronization**: Real-time board state updates with visual feedback
4. **Position Management**: Dynamic position tracking ensures accurate game state

### 🎵 Audio System
- **Sound Effects**: Placement, disappearance, win/lose, and UI interaction sounds
- **Settings Integration**: Persistent audio preferences with localStorage
- **Cross-browser Compatibility**: Web Audio API implementation

### 🤖 AI Implementation
- **Strategic Decision Making**: Win detection → Block opponent → Take center → Random move
- **Difficulty Balancing**: Intelligent but beatable AI opponent
- **FIFO Awareness**: AI considers vanishing rule in move calculations

## 🎨 User Interface Features

### 📱 Responsive Design
- **Mobile-First**: Optimized for screens from 320px to 1440px+
- **Touch-Friendly**: Large buttons and intuitive touch interactions
- **Cross-Platform**: Consistent experience across devices

### 🎯 Visual Feedback
- **Turn Indicators**: Clear visual cues for current player
- **Winning Animations**: Highlighted winning combinations
- **Emoji Animations**: Smooth placement and disappearance effects
- **Score Tracking**: Persistent score display across rounds

### ⚙️ Settings & Controls
- **Audio Toggle**: Enable/disable sound effects
- **Pause/Resume**: Game flow control during active play
- **Help System**: Interactive tutorials and rule explanations
- **Player Customization**: Name input and category selection

## 🚀 Performance Optimizations

- **Efficient State Management**: Optimized React hooks usage
- **Minimal Re-renders**: Strategic component updates
- **Responsive Media Queries**: Comprehensive breakpoint coverage
- **Lightweight Assets**: Optimized emoji rendering and animations

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation & Setup

```bash
# Clone the repository
git clone <repository-url>
cd blink-tac-toe

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### 🌐 Access the Game
- **Development**: http://localhost:5173
- **Production**: Deploy the `dist` folder to your preferred hosting service

## 🎮 How to Play

1. **🏠 Landing Page**: Click "Get Started" to begin your journey
2. **🎯 Game Mode**: Choose between "2 Players" or "vs Computer"
3. **👤 Player Setup**:
   - Enter player names (optional)
   - Select unique emoji categories for each player
4. **🎲 Gameplay**:
   - Click empty cells to place your emoji
   - Watch as older emojis vanish when you exceed 3 pieces
   - Form a line of 3 to win!
5. **🏆 Victory**: Celebrate your win and play again!

## 🎯 Game Strategy Tips

- **⏰ Timing is Everything**: Plan your moves considering the vanishing rule
- **🧠 Think Ahead**: Anticipate which emoji will disappear next
- **🛡️ Defensive Play**: Block opponents while building your own lines
- **🎪 Center Control**: The center position is often most valuable
- **🔄 Adaptation**: Adjust strategy as the board state changes

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues, feature requests, or pull requests.

### Development Guidelines
- Follow React best practices
- Maintain responsive design principles
- Test across different screen sizes
- Ensure accessibility compliance

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- React.js community for excellent documentation
- RSuite for beautiful UI components
- Emoji creators for making the game visually delightful
- Beta testers for valuable feedback



Video link:https://drive.google.com/file/d/1MNtFcS-LLoLznUHkKcfNRgK7VvuPJktP/view?usp=sharing

---

**🎮 Ready to experience the ultimate Tic Tac Toe challenge? Start playing Blink Tac Toe today!**
