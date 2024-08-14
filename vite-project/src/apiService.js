// src/apiService.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fakeLogin = async (username, password) => {
  // Simulate authentication logic
  if (username === 'Tshire' && password === '1234') {
    return { token: 'fake-jwt-token' }; // Simulated token
  }
  throw new Error('Invalid username or password');
};

// Add other API methods here if needed
