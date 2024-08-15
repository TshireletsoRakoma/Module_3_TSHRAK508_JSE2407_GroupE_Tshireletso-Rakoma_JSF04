<template>
  <div class="wishlist-container">
    <h1>Your Wishlist</h1>
    <div v-if="wishlist.length === 0" class="empty-wishlist">
      Your wishlist is empty.
    </div>
    <div v-else class="wishlist-items">
      <div v-for="(item, index) in wishlist" :key="index" class="wishlist-item">
        <img :src="item.image" :alt="item.title" class="product-image"/>
        <div class="item-details">
          <p>{{ item.productTitle }}</p>
          <p>Price: ${{ formatPrice(item.productPrice) }}</p>
        </div>
        <button @click="removeFromWishlist(index)" class="remove-button">
          Remove
        </button>
      </div>
    </div>
    <router-link to="/" class="go-back-button">
      Go Back
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'WishList2',
  data() {
    return {
      wishlist: []
    };
  },
  mounted() {
    this.loadWishlist();
  },
  methods: {
    loadWishlist() {
      const storedWishlist = localStorage.getItem('wishlist');
      console.log('Stored Wishlist:', storedWishlist); // Log raw data
      this.wishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
      console.log('Parsed Wishlist:', this.wishlist); // Log parsed data
    },
    formatPrice(price) {
      // Ensure price is a valid number
      return isNaN(price) ? '0.00' : Number(price).toFixed(2);
    },
    removeFromWishlist(index) {
      // Remove item from the local array
      this.wishlist.splice(index, 1);
      // Update localStorage
      localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    }
  }
}
</script>

<style scoped>
.wishlist-container {
  padding: 1rem;
}

.empty-wishlist {
  text-align: center;
  font-size: 1.2rem;
  color: #888;
}

.wishlist-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.wishlist-item {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  background-color: #f9f9f9;
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 1rem;
}

.item-details {
  flex: 1;
}

.remove-button {
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.go-back-button {
  display: block;
  margin-top: 1rem;
  color: #007bff;
}
</style>
