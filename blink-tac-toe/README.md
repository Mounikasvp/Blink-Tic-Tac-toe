# Blink Tac Toe

A twisted version of Tic Tac Toe with emojis and a vanishing emoji rule.

## Tech Stack

- **Framework**: React.js
- **Build Tool**: Vite
- **Styling**: CSS

## Emoji Categories

The game includes the following emoji categories:
- Animals: 🐶 🐱 🐵 🐰 🦊 🐼 🐨 🦁 🐯
- Food: 🍕 🍔 🍟 🌭 🍩 🍦 🍓 🍎 🍌
- Sports: ⚽ 🏀 🏈 ⚾ 🎾 🏐 🏉 🎱 🏓
- Weather: ☀️ 🌤️ ⛅ 🌦️ ☁️ 🌧️ ⛈️ 🌩️ ❄️
- Travel: ✈️ 🚗 🚕 🚌 🚎 🏎️ 🚓 🚑 🚒

## Game Rules

1. **Board Structure**
   - The game is played on a 3x3 grid like regular Tic Tac Toe
   - The grid starts empty and can contain a maximum of 6 active emojis (3 per player) at any given time

2. **Emoji Categories**
   - Each player selects one emoji category before the game begins
   - On their turn, a player is assigned a random emoji from their own category

3. **Turn-Based Play**
   - Player 1 begins, followed by Player 2, alternating every turn
   - A player can place their emoji on any empty cell

4. **Vanishing Rule**
   - Each player can have only 3 emojis on the board at any time
   - When a player attempts to place a 4th emoji, their oldest emoji is removed automatically (FIFO logic)
   - The emoji disappears visually, and that cell becomes empty or reusable

5. **Winning Condition**
   - A player wins by forming a line of 3 of their own emojis horizontally, vertically, or diagonally
   - Winning emojis must all belong to the same player (category-based check)

## Implementation of the Vanishing Feature

The vanishing feature is implemented using a First-In-First-Out (FIFO) approach:

1. Each player's emojis and their positions are tracked in separate arrays
2. When a player places a 4th emoji, the oldest emoji (first in the array) is removed
3. The corresponding position on the board is cleared
4. This creates a dynamic game where the board state is constantly changing

## Features

- Category selection before game start
- Random emoji assignment from the selected category
- Visual indication of current player's turn
- Animations for emoji placement and disappearance
- Highlighting of winning combinations
- Score tracker for multiple rounds
- Responsive design for both desktop and mobile
- Help section explaining the game rules

## Future Improvements

With more time, I would add:
- Sound effects for emoji placement and winning
- More advanced animations
- Online multiplayer functionality
- AI opponent option
- More emoji categories and customization options
- Game history and statistics

## How to Run

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser and navigate to the local server address (usually http://localhost:5173)
