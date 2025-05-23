// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Your backend base URL

export const registerUser = (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

export const loginUser = (userData) => {
  return axios.post(`${API_URL}/login`, userData);
};
