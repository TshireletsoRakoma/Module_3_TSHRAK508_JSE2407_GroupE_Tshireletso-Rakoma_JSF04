<template>
  <button class="wishlist-button flex items-center space-x-2">
    <router-link to="/wishlist" class="relative flex items-center">
      <img src="../assets/wish.svg" alt="Wishlist" class="w-6 h-6"/>
      <span v-if="wishlistCount > 0" class="wishlist-count">{{ wishlistCount }}</span>
    </router-link>
  </button>
</template>

<script>
export default {
  name: 'WishListButton',
  data() {
    return {
      wishlistCount: 0
    };
  },
  mounted() {
    this.updateWishlistCount();
    window.addEventListener('storage', this.handleStorageChange);
  },
  beforeDestroy() {
    window.removeEventListener('storage', this.handleStorageChange);
  },
  methods: {
    updateWishlistCount() {
      // Fetch the wishlist from local storage
      const storedWishlist = localStorage.getItem('wishlist');
      const wishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
      this.wishlistCount = wishlist.length;
    },
    handleStorageChange(event) {
      // Update count if the wishlist key changes in local storage
      if (event.key === 'wishlist') {
        this.updateWishlistCount();
      }
    }
  }
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
