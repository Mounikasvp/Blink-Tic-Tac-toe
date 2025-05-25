// AI Player Logic for Blink Tac Toe

// Get all available moves (empty cells)
export const getAvailableMoves = (board) => {
  return board.map((cell, index) => cell === null ? index : null).filter(val => val !== null);
};

// Check if a move would create a winning line
export const isWinningMove = (board, move, playerPositions) => {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  // Simulate the move
  const newPositions = [...playerPositions, move];
  
  // Apply FIFO rule if more than 3 positions
  if (newPositions.length > 3) {
    newPositions.shift();
  }

  // Check if this creates a winning line
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (newPositions.includes(a) && newPositions.includes(b) && newPositions.includes(c)) {
      return true;
    }
  }
  return false;
};

// Check if opponent can win on their next move
export const canOpponentWin = (board, opponentPositions) => {
  const availableMoves = getAvailableMoves(board);
  
  for (const move of availableMoves) {
    if (isWinningMove(board, move, opponentPositions)) {
      return move; // Return the move that would let opponent win
    }
  }
  return null;
};

// Get strategic move based on board position
export const getStrategicMove = (board, aiPositions, humanPositions) => {
  const availableMoves = getAvailableMoves(board);
  
  if (availableMoves.length === 0) return null;

  // 1. Try to win
  for (const move of availableMoves) {
    if (isWinningMove(board, move, aiPositions)) {
      return move;
    }
  }

  // 2. Block opponent from winning
  const blockingMove = canOpponentWin(board, humanPositions);
  if (blockingMove !== null && availableMoves.includes(blockingMove)) {
    return blockingMove;
  }

  // 3. Take center if available
  if (availableMoves.includes(4)) {
    return 4;
  }

  // 4. Take corners
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter(corner => availableMoves.includes(corner));
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }

  // 5. Take any available move
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
};

// Main AI move function
export const getAIMove = (board, aiPositions, humanPositions, difficulty = 'medium') => {
  const availableMoves = getAvailableMoves(board);
  
  if (availableMoves.length === 0) return null;

  switch (difficulty) {
    case 'easy':
      // 70% random, 30% strategic
      if (Math.random() < 0.3) {
        return getStrategicMove(board, aiPositions, humanPositions);
      }
      return availableMoves[Math.floor(Math.random() * availableMoves.length)];
      
    case 'medium':
      // 80% strategic, 20% random
      if (Math.random() < 0.8) {
        return getStrategicMove(board, aiPositions, humanPositions);
      }
      return availableMoves[Math.floor(Math.random() * availableMoves.length)];
      
    case 'hard':
      // Always strategic
      return getStrategicMove(board, aiPositions, humanPositions);
      
    default:
      return getStrategicMove(board, aiPositions, humanPositions);
  }
};
