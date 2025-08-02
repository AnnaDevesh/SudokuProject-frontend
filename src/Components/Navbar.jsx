// components/Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const onLogout=()=>{
    navigate('/')
    localStorage.removeItem('key')
  }
  const navigate = useNavigate();

  const styles = {
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 30px',
      backgroundColor: '#343a40',
      color: '#fff',
    },
    brand: {
      fontSize: '16px',
    },
    rightActions: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    profileBtn: {
      backgroundColor: '#17a2b8',
      color: '#fff',
      border: 'none',
      padding: '8px 14px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
    },
    logoutBtn: {
      backgroundColor: '#dc3545',
      color: '#fff',
      border: 'none',
      padding: '8px 14px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
    },
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.brand}>
        Welcome, {localStorage.getItem('key') || 'Guest'}
      </div>

      <div style={styles.rightActions}>
        <button style={styles.profileBtn} onClick={() => navigate('/profile')}>
          User Profile
        </button>
        <button style={styles.logoutBtn} onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
