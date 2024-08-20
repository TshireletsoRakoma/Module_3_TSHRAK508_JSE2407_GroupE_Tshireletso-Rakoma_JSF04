<template>
    <div class="checkout-container">
      <h1>Checkout</h1>
      <!-- Form to update user information -->
      <form @submit.prevent="updateUserInfo">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="user.name" required />
        </div>
        <div class="form-group">
          <label for="address">Residential Address:</label>
          <input type="text" id="address" v-model="user.address" required />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="user.email" required />
        </div>
        <button type="submit" class="update-button">Update Information</button>
      </form>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    name: "Checkout",
    computed: {
      ...mapGetters(['currentUser']), // Get current user data from Vuex store
    },
    data() {
      return {
        user: {
          name: this.currentUser?.name || '', // Use optional chaining to avoid undefined errors
          address: this.currentUser?.address || '',
          email: this.currentUser?.email || ''
        }
      };
    },
    methods: {
      ...mapActions(['updateUserDetails']),
      updateUserInfo() {
        // Call Vuex action to update user details
        this.updateUserDetails(this.user).then(() => {
          alert('Information updated successfully!');
        }).catch(error => {
          console.error('Failed to update user information:', error);
          alert('Failed to update information. Please try again.');
        });
      }
    },
    created() {
      // Redirect to login page if not authenticated
      if (!this.currentUser) {
        this.$router.push({ name: 'Login', query: { redirect: this.$route.fullPath } });
      }
    }
  }
  </script>
  
  
  <style scoped>
  .checkout-container {
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  
  .update-button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
  }
  
  .update-button:hover {
    background-color: #45a049;
  }
  </style>
  