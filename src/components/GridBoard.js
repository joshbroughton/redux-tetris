import { useSelector } from 'react-redux';

import { shapes } from '../utils';
import GridSquare from './GridSquare'

// Represents a 10 x 18 grid of grid squares

export default function GridBoard() {
  // generates an array of 18 rows, each containing 10 GridSquares.
  const { grid, shape, rotation, x, y, isRunning, speed } = useSelector((state) => state);
  const block = shapes[shape][rotation];
  const blockColor = shape;

  const gridSquares = grid.map((rowArray, row) => {
    return rowArray.map((square, col) => {
      const blockX = col - x;
      const blockY = row - y;
      let color = square;

      if (blockX >= 0 && blockX < block.length && blockY >= 0 && blockY < block.length) {
        color = block[blockY][blockX] === 0 ? color : blockColor;
      }

      const k = row * grid[0].length + col;
      return <GridSquare key={k} color={color} />
    })
  })
  // The components generated in `makeGrid` are rendered in div.grid-board
  return (
    <div className='grid-board'>
      {gridSquares}
    </div>
  )
}
