import axios from 'axios';
import { getRefreshToken } from '@/auth'

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:3000', // Use environment variables for the base URL
  timeout: 30000, 
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getRefreshToken();
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
