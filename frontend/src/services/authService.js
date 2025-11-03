import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  // Register new user
  async register(email, password) {
    try {
      const response = await api.post('/auth/register', { email, password });
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        return error.response.data;
      }
      throw new Error('Registration failed. Please try again.');
    }
  },

  // Login user
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        return error.response.data;
      }
      throw new Error('Login failed. Please try again.');
    }
  },

  // Validate token
  async validateToken(token) {
    try {
      const response = await api.post('/auth/validate', { token });
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        return error.response.data;
      }
      throw new Error('Token validation failed.');
    }
  },

  // Logout (client-side only)
  logout() {
    localStorage.removeItem('token');
  },

  // Get current user from localStorage
  getCurrentUser() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Simple JWT decode (for demonstration - in production, validate on server)
        const payload = JSON.parse(atob(token.split('.')[1]));
        return {
          id: payload.userId,
          email: payload.sub
        };
      } catch (error) {
        localStorage.removeItem('token');
        return null;
      }
    }
    return null;
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
};

export default api;