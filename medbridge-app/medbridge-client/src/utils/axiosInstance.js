// src/utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Update with your backend URL
  headers: { 'Content-Type': 'application/json' }
});

// Request interceptor to add Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Try to refresh the token
        const refreshToken = localStorage.getItem('refreshToken');
        const res = await axios.post(
          'http://localhost:5000/api/user/refresh-token', 
          {}, 
          { headers: { Authorization: `Bearer ${refreshToken}` } }
        );
        const newToken = res.data.token;
        localStorage.setItem('token', newToken);
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
