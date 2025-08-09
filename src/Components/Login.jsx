// Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setMessage({ type: 'error', text: 'Both fields are required.' });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('https://sudoku-backend-3haf.onrender.com/api/login', formData);

      const message = response.data.message;
      const token=response.data.token1;

      if (message === 'User Logged in') {
        setMessage({ type: 'success', text: 'Login successful!' });
        navigate('/Home')
        localStorage.setItem('key',email);
        localStorage.setItem('token',token);
        setFormData({ email: '', password: '' });
      } else if (message === 'User Not Found') {
        setMessage({ type: 'error', text: 'No user found with that email.' });
      } else {
        setMessage({ type: 'error', text: message }); // handles "Invalid Password"
      }

    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Login failed. Try again.',
      });
    } finally {
      setLoading(false);
    }
  };


  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      padding: '40px 20px',
      backgroundColor: '#f9f9f9',
      minHeight: '80vh',
    },
    form: {
      width: '100%',
      maxWidth: '400px',
      background: '#fff',
      borderRadius: '8px',
      padding: '30px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    heading: {
      marginBottom: '20px',
      textAlign: 'center',
      fontWeight: '500',
    },
    label: {
      display: 'block',
      marginTop: '15px',
      fontWeight: '500',
      fontSize: '14px',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginTop: '5px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '14px',
    },
    passwordWrapper: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    },
    toggleBtn: {
      position: 'absolute',
      right: '10px',
      top: '8px',
      background: 'none',
      border: 'none',
      color: '#007bff',
      cursor: 'pointer',
      fontSize: '12px',
    },
    submitButton: {
      width: '100%',
      padding: '12px',
      marginTop: '25px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      fontWeight: '600',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
    },
    disabledButton: {
      backgroundColor: '#6c757d',
      cursor: 'not-allowed',
    },
    message: {
      marginBottom: '15px',
      padding: '10px',
      borderRadius: '4px',
      textAlign: 'center',
      fontSize: '14px',
    },
    success: {
      backgroundColor: '#d4edda',
      color: '#155724',
    },
    error: {
      backgroundColor: '#f8d7da',
      color: '#721c24',
    },
    footerText: {
      marginTop: '20px',
      fontSize: '14px',
      textAlign: 'center',
    },
    link: {
      color: '#007bff',
      textDecoration: 'none',
      marginLeft: '5px',
    },
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.heading}>Login</h2>

        {message.text && (
          <div
            style={{
              ...styles.message,
              ...(message.type === 'success' ? styles.success : styles.error),
            }}
          >
            {message.text}
          </div>
        )}

        <label htmlFor="email" style={styles.label}>
          Email Address
        </label>
        <input
          type="email"
          name="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
        />

        <label htmlFor="password" style={styles.label}>
          Password
        </label>
        <div style={styles.passwordWrapper}>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <button
          type="submit"
          style={{
            ...styles.submitButton,
            ...(loading ? styles.disabledButton : {}),
          }}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div style={styles.footerText}>
          Don’t have an account?
          <Link to="/signup" style={styles.link}>
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
