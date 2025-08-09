// Signup.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      setMessage({ type: 'error', text: 'All fields are required.' });
      return;
    }

    try {
      setLoading(true);
      await axios.post('https://sudoku-backend-3haf.onrender.com/api/signup', formData);
      setMessage({ type: 'success', text: 'Signup successful!' });
      setFormData({ name: '', email: '', password: '' });
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Signup failed. Try again.',

      });
    } finally {
      setLoading(false);
    }
  };

  // Inline styles
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
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.heading}>Create Account</h2>

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

        <label htmlFor="name" style={styles.label}>
          Full Name
        </label>
        <input
          type="text"
          name="name"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
        />

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
            type={'text'}
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
          />
          {/* <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={styles.toggleBtn}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button> */}
        </div>

        <button
          type="submit"
          style={{
            ...styles.submitButton,
            ...(loading ? styles.disabledButton : {}),
          }}
          disabled={loading}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
        <div style={{ marginTop: '20px', fontSize: '14px', textAlign: 'center' }}>
          Already have an account?
          <a href="/login" style={{ color: '#007bff', marginLeft: '5px', textDecoration: 'none' }}>
            Login
          </a>
        </div>
      </form>
    </div>
  );
};

export default Signup;
