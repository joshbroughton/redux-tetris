export const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Returns the default grid
export const gridDefault = () => {
  const rows = 18
  const cols = 10
  const array = []

  // Fill the array with 18 arrays each containing
  // 10 zeros (0)
  for (let row = 0; row < rows; row++) {
    array.push([])
    for (let col = 0; col < cols; col++) {
      array[row].push(0)
    }
  }

  return array
}

export const randomShape = () => {
  return random(1, shapes.length - 1);
}

// Return the default state for the game
export const defaultState = () => {
  return {
    // Create an empty grid
    grid: gridDefault(),
    // Get a new random shape
    shape: randomShape(),
    // set rotation of the shape to 0
    rotation: 0,
    // set the 'x' position of the shape to 5 and y to -4, which puts the shape in the center of the grid, above the top
    x: 5,
    y: -4,
    // set the index of the next shape to a new random shape
    nextShape: randomShape(),
    // Tell the game that it's currently running
    isRunning: true,
    // Set the score to 0
    score: 0,
    // Set the default speed
    speed: 1000,
    // Game isn't over yet
    gameOver: false
  }
}

// Returns the next rotation for a shape
// rotation can't exceed the last index of the rotations for the given shape.
export const nextRotation = (shape, rotation) => {
  return (rotation + 1) % shapes[shape].length
}

export const canMoveTo = (shape, grid, x, y, rotation) => {
  const currentShape = shapes[shape][rotation]
  // Loop through all rows and cols of the **shape**
  for (let row = 0; row < currentShape.length; row++) {
    for (let col = 0; col < currentShape[row].length; col++) {
      // Look for a 1 here
      if (currentShape[row][col] !== 0) {
        // x offset on the grid
        const proposedX = col + x
        // y offset on the grid
        const proposedY = row + y
        if (proposedY < 0) {
          continue
        }
        // Get the row on the grid
        const possibleRow = grid[proposedY]
        // Check row exists
        if (possibleRow) {
          // Check if this column in the row is undefined if it's off the edges, 0, and empty
          if (possibleRow[proposedX] === undefined || possibleRow[proposedX] !== 0) {
            // undefined or not 0 and it's occupied we can't move here.
            return false
          }
        } else {
          return false
        }
      }
    }
  }
  return true
}

// Adds current shape to grid
export const addBlockToGrid = (shape, grid, x, y, rotation) => {
  let gameOver = false;
  const block = shapes[shape][rotation];
  // Copy the grid
  const newGrid = [...grid];
  // Map the Block onto the grid
  for (let row = 0; row < block.length; row++) {
    for (let col = 0; col < block[row].length; col++) {
      if (block[row][col]) {
        if ((row + y) < 0) {
          gameOver = true;
        } else {
          newGrid[row + y][col + x] = shape;
        }
      }
    }
  }
  return { newGrid, gameOver };
}

export const checkRows = (grid) => {
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;
  for (let row = 0; row < rows; row++) {
    let countRow = true;
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === 0) {
        countRow = false;
      }
    }
    if (countRow) {
      count++;
      grid.splice(row, 1)
      grid.unshift(Array(10).fill(0))
    }
  }
  switch (count) {
    case 1:
      return 40;
    case 2:
      return 100;
    case 3:
      return 300;
    case 4:
      return 1200;
    default:
      return 0;
  }
}

// Define block shapes and their rotations as arrays.
export const shapes = [
  // none
  [
    [
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0]]],

  // I
  [
    [
      [0,0,0,0],
      [1,1,1,1],
      [0,0,0,0],
      [0,0,0,0]],

    [
      [0,1,0,0],
      [0,1,0,0],
      [0,1,0,0],
      [0,1,0,0]]],

  // T
  [
    [
      [0,0,0,0],
    [1,1,1,0],
    [0,1,0,0],
    [0,0,0,0]],

    [
      [0,1,0,0],
      [1,1,0,0],
      [0,1,0,0],
      [0,0,0,0]],

    [
      [0,1,0,0],
      [1,1,1,0],
      [0,0,0,0],
      [0,0,0,0]],

    [
      [0,1,0,0],
      [0,1,1,0],
      [0,1,0,0],
      [0,0,0,0]]],

  // L
  [
    [
      [0,0,0,0],
      [1,1,1,0],
      [1,0,0,0],
      [0,0,0,0]],

    [
      [1,1,0,0],
      [0,1,0,0],
      [0,1,0,0],
      [0,0,0,0]],

    [
      [0,0,1,0],
      [1,1,1,0],
      [0,0,0,0],
      [0,0,0,0]],

    [
      [0,1,0,0],
      [0,1,0,0],
      [0,1,1,0],
      [0,0,0,0]]],

  // J
  [
    [
      [1,0,0,0],
      [1,1,1,0],
      [0,0,0,0],
      [0,0,0,0]],

    [
      [0,1,1,0],
      [0,1,0,0],
      [0,1,0,0],
      [0,0,0,0]],

    [
      [0,0,0,0],
      [1,1,1,0],
      [0,0,1,0],
      [0,0,0,0]],

    [
      [0,1,0,0],
      [0,1,0,0],
      [1,1,0,0],
      [0,0,0,0]]],

  // Z
  [
    [
      [0,0,0,0],
      [1,1,0,0],
      [0,1,1,0],
      [0,0,0,0]],

    [
      [0,0,1,0],
      [0,1,1,0],
      [0,1,0,0],
      [0,0,0,0]]],

  // S
  [
    [
      [0,0,0,0],
      [0,1,1,0],
      [1,1,0,0],
      [0,0,0,0]],

    [
      [0,1,0,0],
      [0,1,1,0],
      [0,0,1,0],
      [0,0,0,0]]],

  // O
  [
    [
      [0,1,1,0],
      [0,1,1,0],
      [0,0,0,0],
      [0,0,0,0]]]
]
