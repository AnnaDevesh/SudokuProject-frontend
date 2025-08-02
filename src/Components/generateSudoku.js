// utils/generateSudokuBoard.js
export function generateSudoku(difficulty = 'easy') {
  const board = Array.from({ length: 9 }, () => Array(9).fill(0));
  fillBoard(board);

  const clues = {
    easy: 40,
    medium: 30,
    hard: 25,
  };

  return removeCells(board, 81 - clues[difficulty]);
}

function fillBoard(board) {
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const isValid = (row, col, num) => {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num || board[i][col] === num) return false;
      const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
      const boxCol = 3 * Math.floor(col / 3) + i % 3;
      if (board[boxRow][boxCol] === num) return false;
    }
    return true;
  };

  const solve = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          const shuffled = nums.sort(() => Math.random() - 0.5);
          for (const num of shuffled) {
            if (isValid(row, col, num)) {
              board[row][col] = num;
              if (solve()) return true;
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  solve();
}

function removeCells(board, removeCount) {
  const puzzle = board.map(row => row.slice());

  let removed = 0;
  while (removed < removeCount) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);

    if (puzzle[row][col] !== 0) {
      puzzle[row][col] = 0;
      removed++;
    }
  }

  return puzzle;
}
