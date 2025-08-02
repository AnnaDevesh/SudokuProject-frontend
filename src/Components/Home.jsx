// pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { generateSudoku } from './generateSudoku';
import { isTokenValid } from './Token';

const Home = () => {
  const navigate = useNavigate();



  const handleModeSelect = (difficulty) => {
    const puzzle = generateSudoku(difficulty);
    navigate('/game', { state: { puzzle, difficulty } });
  };

  const styles = {
    container: {
      padding: '40px 20px',
      textAlign: 'center',
    },
    heading: {
      fontSize: '24px',
      marginBottom: '30px',
    },
    buttonGroup: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
    },
    button: {
      padding: '12px 24px',
      fontSize: '16px',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
      backgroundColor: '#007bff',
      color: '#fff',
    },
  };

  

  if(!isTokenValid()){
    return <center> Plese Login First</center>
  }
  return (
    <>
      <Navbar  />
      <div style={styles.container}>
        <h2 style={styles.heading}>Select Sudoku Difficulty</h2>
        <div style={styles.buttonGroup}>
          <button style={styles.button} onClick={() => handleModeSelect('easy')}>
            Easy
          </button>
          <button style={styles.button} onClick={() => handleModeSelect('medium')}>
            Medium
          </button>
          <button style={styles.button} onClick={() => handleModeSelect('hard')}>
            Hard
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
