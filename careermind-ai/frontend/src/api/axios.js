import axios from 'axios';

const isProduction = import.meta.env.PROD;
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || (isProduction ? 'https://careermind-api.onrender.com/api' : 'http://localhost:5001/api'),
});

// Request interceptor to add JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
