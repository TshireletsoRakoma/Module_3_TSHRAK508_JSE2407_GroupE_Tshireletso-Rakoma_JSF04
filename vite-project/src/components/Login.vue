<template>
    <div class="login-container">
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="username">Username</label>
          <input
            id="username"
            v-model="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <div class="password-container">
            <input
              id="password"
              v-model="password"
              :type="passwordVisible ? 'text' : 'password'"
              placeholder="Password"
            />
            <button type="button" @click="togglePasswordVisibility" class="toggle-password-btn">
              {{ passwordVisible ? 'Hide' : 'Show' }}
            </button>
          </div>
        </div>
        <button type="submit" class="login-btn">Login</button>
        <p v-if="loading">Logging in...</p>
        <p v-if="error" class="text-red-500">Error: {{ error }}</p>
      </form>
    </div>
  </template>
  
  <script>
  import { login } from '../apiService'; // Adjust the path as needed
  
  export default {
    data() {
      return {
        username: 'Tshire',
        password: '1234',
        passwordVisible: false,
        loading: false,
        error: null,
      };
    },
    methods: {
      togglePasswordVisibility() {
        this.passwordVisible = !this.passwordVisible;
      },
      async handleLogin() {
        if (!this.username || !this.password) {
          this.error = 'Username and password are required';
          return;
        }
  
        this.loading = true;
        this.error = null;
  
        try {
          const response = await login(this.username, this.password);
          localStorage.setItem('jwt', response.token); // Adjust according to the actual response
          // Redirect or handle successful login
        } catch (error) {
          this.error = error.message || 'Login failed';
        } finally {
          this.loading = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  .input-group {
    margin-bottom: 15px;
  }
  
  .input-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .input-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .password-container {
    display: flex;
    align-items: center;
  }
  
  .password-container input {
    flex: 1;
  }
  
  .toggle-password-btn {
    margin-left: 10px;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
  }
  
  .toggle-password-btn:hover {
    background-color: #0056b3;
  }
  
  .login-btn {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
  }
  
  .login-btn:hover {
    background-color: #0056b3;
  }
  
  .text-red-500 {
    color: #f44336;
  }
  
  p {
    margin-top: 10px;
  }
  </style>
  