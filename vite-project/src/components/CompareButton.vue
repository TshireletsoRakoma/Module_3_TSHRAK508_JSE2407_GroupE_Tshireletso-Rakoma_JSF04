


<template>
    <button class="compare-button flex items-center space-x-2">
      <router-link to="/comparison" class="relative">
        <img src="../assets/Compare button.svg" alt="Cart" class="w-6 h-6"/>
        <span v-if="comparisonItemCount > 0" class="item-count absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full px-1">
            {{ comparisonItemCount}}
        </span>
      </router-link>
    </button>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  import { useRouter } from 'vue-router';
  import store from '../store'; // Ensure you import your store
  
  export default {
    name: 'CompareButton',
    computed: {
      ...mapGetters(['comparisonItemCount',]),
    },
  };
  </script>
  
  <style scoped>
  .compare-button {
    padding: 0.5rem 1rem;
    background-color: #4A5568; /* Gray-600 */
    border-radius: 0.25rem;
    transition: background-color 0.3s;
  }
  
  .compare-button:hover {
    background-color: #2D3748; /* Gray-700 */
  }
  
  .item-count {
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;
    min-width: 1rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem;
  }
  </style>
  