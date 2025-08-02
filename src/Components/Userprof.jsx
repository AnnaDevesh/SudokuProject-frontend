// pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { isTokenValid } from './Token';
const Userprof = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [user1, setUser1] = useState(null);
  const fetchUser = async () => {
      try {
        const key = localStorage.getItem('key');
        console.log(key);
        const response = await axios.post('http://localhost:5000/api/id', {email:key });
        setUser(response.data);

        const response1 = await axios.post('http://localhost:5000/api/name', {email:key });
        setUser1(response1.data);


      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }

  useEffect(() => {
    fetchUser();

  }, []);

  const styles = {
    container: {
      padding: '40px 20px',
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    },
    heading: {
      fontSize: '24px',
      marginBottom: '20px',
      textAlign: 'center',
    },
    section: {
      marginBottom: '20px',
    },
    label: {
      fontWeight: 'bold',
      marginRight: '10px',
    },
    statBox: {
      display: 'flex',
      justifyContent: 'space-around',
      marginTop: '20px',
    },
    stat: {
      backgroundColor: '#ffffff',
      padding: '16px 24px',
      borderRadius: '6px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      textAlign: 'center',
    },
    statLabel: {
      fontSize: '14px',
      color: '#6c757d',
    },
    statValue: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#007bff',
    },
    backBtn: {
      display: 'block',
      margin: '30px auto 0',
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  };

  if(!isTokenValid()){
    return <div> Plese Login First</div>
  }
  if (!user || !user1) {
    return <div style={styles.container}>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>User Profile</h2>

      <div style={styles.section}>
        <div>
          <span style={styles.label}>Name:</span>
          {user1.name}
        </div>
        <div>
          <span style={styles.label}>Email:</span>
          {user.email}
        </div>
      </div>

      <div>
        <h3>Sudoku Stats</h3>
        <div style={styles.statBox}>
          <div style={styles.stat}>
            <div style={styles.statValue}>{user.stats?.easy || 0}</div>
            <div style={styles.statLabel}>Easy</div>
          </div>
          <div style={styles.stat}>
            <div style={styles.statValue}>{user.stats?.medium || 0}</div>
            <div style={styles.statLabel}>Medium</div>
          </div>
          <div style={styles.stat}>
            <div style={styles.statValue}>{user.stats?.hard || 0}</div>
            <div style={styles.statLabel}>Hard</div>
          </div>
        </div>
      </div>

      <button style={styles.backBtn} onClick={() => navigate('/Home')}>
        ← Back to Home
      </button>
    </div>
  );
};

export default Userprof;
