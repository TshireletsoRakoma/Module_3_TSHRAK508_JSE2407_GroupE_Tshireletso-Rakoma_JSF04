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
      <!-- Continue as Guest link -->
      <p>
        <a href="#" @click.prevent="continueAsGuest" class="guest-link">Continue as Guest</a>
      </p>
    </form>
  </div>
</template>

<script>
import { fakeLogin } from '../apiService'; // Adjust the path as needed

export default {
  data() {
    return {
      username: '',
      password: '',
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
        const response = await fakeLogin(this.username, this.password);
        localStorage.setItem('jwt', response.token);

        // Redirect to the home page after successful login
        const redirectPath = this.$route.query.redirect || { name: 'ProductList' };
        this.$router.push(redirectPath);
      } catch (error) {
        this.error = error.message || 'Login failed';
      } finally {
        this.loading = false;
      }
    },
    continueAsGuest() {
      // Redirect to the home page as a guest
      this.$router.push({ name: 'ProductList' });
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.input-group {
  margin-bottom: 1rem;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.input-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.password-container {
  display: flex;
  align-items: center;
}

.password-container input {
  flex: 1;
  margin-right: 0.5rem;
}

.toggle-password-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #007bff;
}

.login-btn {
  width: 100%;
  padding: 0.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.login-btn:hover {
  background-color: #0056b3;
}

.text-red-500 {
  color: #f44336;
}

.guest-link {
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
}

.guest-link:hover {
  color: #0056b3;
}
</style>
