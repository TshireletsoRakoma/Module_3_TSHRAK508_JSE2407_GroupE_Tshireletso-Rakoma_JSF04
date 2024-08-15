<template>
  <button class="cart-button flex items-center space-x-2">
    <router-link to="/cart" class="relative">
      <img src="../assets/Basket.svg" alt="Cart" class="w-6 h-6"/>
      <span v-if="cartItemCount > 0" class="item-count absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full px-1">
        {{ cartItemCount }}
      </span>
    </router-link>
  </button>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CartButton',
  computed: {
    ...mapGetters(['cartItemCount']),
  },
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

.item-count {
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
}
</style>
