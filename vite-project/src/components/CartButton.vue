<template>
  <button class="cart-button flex items-center space-x-2">
    <router-link to="/cart">
    <img src="../assets/Basket.svg" alt="Cart" class="w-6 h-6"/>
    <span class="text-white">Cart</span>
    </router-link>
  </button>
</template>

<script>
export default {
  name: 'CartButton',
};
</script>

<style scoped>
.cart-button {
  padding: 0.5rem 1rem;
  background-color: #4A5568; /* Gray-600 */
  border-radius: 0.25rem;
  transition: background-color 0.3s;
}

.cart-button:hover {
  background-color: #2D3748; /* Gray-700 */
}
</style>
