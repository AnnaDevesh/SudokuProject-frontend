import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SudokuGame = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { puzzle, difficulty } = location.state || {};
  const [board, setBoard] = useState([]);
  const [fixedCells, setFixedCells] = useState([]);
  const [solvedBoard, setSolvedBoard] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!puzzle) {
      navigate('/');
      return;
    }

    setBoard(puzzle.map(row => [...row]));
    setFixedCells(puzzle.map(row => row.map(cell => cell !== 0)));

    const solution = solveSudoku(puzzle.map(row => [...row]));
    setSolvedBoard(solution);
  }, [puzzle, navigate]);

  const handleChange = (rowIdx, colIdx, value) => {
    if (!/^[1-9]?$/.test(value)) return;

    setBoard(prev => {
      const updated = prev.map(row => [...row]);
      updated[rowIdx][colIdx] = value === '' ? 0 : parseInt(value);
      return updated;
    });
  };

  const checkSolution = async () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] !== solvedBoard[row][col]) {
          setMessage('❌ Incorrect solution. Keep trying!');
          return;
        }
      }
    }

    setMessage('✅ Correct! Puzzle Solved!');

    try {
      const key = localStorage.getItem('key'); // typically the user's email
      if (!key || !difficulty) {
        console.warn('Missing user key or difficulty');
        return;
      }

      await axios.post('http://localhost:5000/api/update-score', {key:key,difficulty:difficulty});

      setMessage('✅ Score updated! Redirecting...');

      setTimeout(() => {
        navigate('/Home');
      }, 1500);
    } catch (error) {
      console.error('Error updating score:', error);
      setMessage('✅ Solved, but failed to update score.');
    }
  };

  const fillSolution = () => {
    setBoard(solvedBoard.map(row => [...row]));
    setMessage('✅ Solved!');
  };

  // ---- SUDOKU SOLVER ----
  const solveSudoku = input => {
    const board = input.map(row => [...row]);

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
            for (let num = 1; num <= 9; num++) {
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
    return board;
  };

  const styles = {
    container: {
      padding: '30px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    heading: {
      fontSize: '22px',
      marginBottom: '20px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(9, 40px)',
      gridTemplateRows: 'repeat(9, 40px)',
      gap: '2px',
    },
    cell: {
      width: '40px',
      height: '40px',
      fontSize: '18px',
      textAlign: 'center',
      border: '1px solid #ccc',
      outline: 'none',
    },
    fixedCell: {
      backgroundColor: '#e9ecef',
      fontWeight: 'bold',
      cursor: 'not-allowed',
    },
    inputCell: {
      backgroundColor: '#ffffff',
    },
    buttons: {
      marginTop: '20px',
      display: 'flex',
      gap: '10px',
    },
    button: {
      padding: '10px 16px',
      fontSize: '14px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    checkBtn: {
      backgroundColor: '#28a745',
      color: '#fff',
    },
    solveBtn: {
      backgroundColor: '#ffc107',
      color: '#000',
    },
    backBtn: {
      backgroundColor: '#007bff',
      color: '#fff',
    },
    message: {
      marginTop: '15px',
      fontSize: '16px',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Sudoku - {difficulty?.toUpperCase()}</h2>

      <div style={styles.grid}>
        {board.map((row, rowIdx) =>
          row.map((cellValue, colIdx) => {
            const isFixed = fixedCells[rowIdx]?.[colIdx];
            return (
              <input
                key={`${rowIdx}-${colIdx}`}
                type="text"
                value={cellValue === 0 ? '' : cellValue}
                disabled={isFixed}
                maxLength={1}
                onChange={e => handleChange(rowIdx, colIdx, e.target.value)}
                style={{
                  ...styles.cell,
                  ...(isFixed ? styles.fixedCell : styles.inputCell),
                }}
              />
            );
          })
        )}
      </div>

      <div style={styles.buttons}>
        <button
          style={{ ...styles.button, ...styles.checkBtn }}
          onClick={checkSolution}
        >
          Check Solution
        </button>
        <button
          style={{ ...styles.button, ...styles.solveBtn }}
          onClick={fillSolution}
        >
          Solve
        </button>
        <button
          style={{ ...styles.button, ...styles.backBtn }}
          onClick={() => navigate('/')}
        >
          Back
        </button>
      </div>

      {message && <div style={styles.message}>{message}</div>}
    </div>
  );
};

export default SudokuGame;
