<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import Header from './components/Header.vue';

// Access Vuex store
const store = useStore();

// Computed property to get the cart item count
const cartItemCount = computed(() => store.getters.cartItemCount);


</script>

<template>
  <div>
    <!-- Pass the cart item count to the Header component -->
    <Header :cartItemCount="cartItemCount" />
    <router-view />
  </div>
</template>

<style scoped>
/* Add any styles here */
</style>
