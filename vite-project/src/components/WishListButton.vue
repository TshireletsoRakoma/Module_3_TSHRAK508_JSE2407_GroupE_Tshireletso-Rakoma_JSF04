<template>
  <button class="wishlist-button flex items-center space-x-2">
    <router-link to="/wishlist" class="relative flex items-center">
      <img src="../assets/wish.svg" alt="Wishlist" class="w-6 h-6"/>
      <span v-if="wishlistCount > 0" class="wishlist-count absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full px-1">
        {{ wishlistCount }}
      </span>
    </router-link>
  </button>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'WishListButton',
  computed: {
    ...mapGetters(['wishlistCount']),
  },
};
</script>

<style scoped>
.wishlist-button {
  padding: 0.5rem;
  background-color: #4A5568; /* Gray-600 */
  border-radius: 0.25rem;
  transition: background-color 0.3s;
  position: relative;
}

.wishlist-button:hover {
  background-color: #2D3748; /* Gray-700 */
}

.wishlist-count {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #F56565; /* Red-400 */
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
}
</style>
