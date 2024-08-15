<template>
    <button class="wishlist-button flex items-center space-x-2">
      <router-link to="/wishlist" class="relative flex items-center">
        <img src="../assets/wish.svg" alt="Wishlist" class="w-6 h-6"/>
        <!-- Optionally, you can add a badge or counter here if needed -->
      </router-link>
    </button>
  </template>
  
  <script>
  export default {
    name: 'WishListButton',
  };
  </script>
  
  <style scoped>
  .wishlist-button {
    padding: 0.5rem;
    background-color: #4A5568; /* Gray-600 */
    border-radius: 0.25rem;
    transition: background-color 0.3s;
  }
  
  .wishlist-button:hover {
    background-color: #2D3748; /* Gray-700 */
  }
  </style>
  