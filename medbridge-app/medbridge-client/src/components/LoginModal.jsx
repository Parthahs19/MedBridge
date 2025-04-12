// src/components/LoginModal.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const LoginModal = ({ showModal, closeModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // In LoginModal.js (after successful login)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔐 Test bypass credentials (for development only)
    const testEmail = 'test@medbridge.com';
    const testPassword = 'test123';

    // Check for test credentials before hitting API
    if (email === testEmail) {
      console.log('Test user logged in successfully (bypass mode)');

      // Simulate setting tokens
      localStorage.setItem('token', 'test-token');
      localStorage.setItem('refreshToken', 'test-refresh-token');

      // Redirect to dashboard
      window.location.href = '/dashboard';
      return;
    }

    // Normal login flow (for non-test users)
    try {
      const response = await axios.post('/api/user/login', { email, password });
      const { token, refreshToken } = response.data;

      // Store both tokens
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);

      window.location.href = '/dashboard'; // Redirect to Dashboard
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
