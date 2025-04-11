// src/utils/tokenService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust the URL as per your backend

// Function to refresh the token
export const refreshAuthToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    throw new Error('No refresh token found');
  }

  try {
    const response = await axios.post(`${API_URL}/auth/refresh-token`, { refreshToken });
    const { token } = response.data;
    localStorage.setItem('token', token); // Store new token
    return token;
  } catch (error) {
    console.error('Token refresh failed:', error);
    throw error;
  }
};

// Function to handle API requests with token refresh logic
export const apiRequest = async (url, method = 'GET', data = {}) => {
  let token = localStorage.getItem('token');
  
  try {
    const response = await axios({
      method,
      url: `${API_URL}${url}`,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // If the token is expired, attempt to refresh it
      token = await refreshAuthToken();
      return await axios({
        method,
        url: `${API_URL}${url}`,
        data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    throw error;
  }
};
