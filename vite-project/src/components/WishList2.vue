<template>
  <div class="wishlist-container">
    <h1>Your Wishlist</h1>
    <button @click="clearAllWishlist" class="clear-all-button">
      Clear All
    </button>
    <div v-if="wishlist.length === 0" class="empty-wishlist">
      Your wishlist is empty.
    </div>
    <div v-else class="wishlist-items">
      <div v-for="(item, index) in wishlist" :key="index" class="wishlist-item">
        <img :src="item.productImage" :alt="item.productTitle" class="product-image"/>
        <div class="item-details">
          <p>{{ item.productTitle }}</p>
          <p>Price: ${{ formatPrice(item.productPrice) }}</p>
        </div>
        <button @click="removeFromWishlist(index)" class="remove-button">
          Remove
        </button>
        <button @click="addToCart(item)" class="add-to-cart-button">
          Add to Cart
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
      wishlist: [],
    };
  },
  mounted() {
    this.loadWishlist();
  },
  methods: {
    loadWishlist() {
      const storedWishlist = localStorage.getItem('wishlist');
      this.wishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
    },
    formatPrice(price) {
      return isNaN(price) ? '0.00' : Number(price).toFixed(2);
    },
    removeFromWishlist(index) {
      this.wishlist.splice(index, 1);
      localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
      // Notify other components about the change
      window.dispatchEvent(new Event('storage'));
    },
    addToCart(item) {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const itemIndex = cart.findIndex(cartItem => cartItem.productTitle === item.productTitle);
      if (itemIndex > -1) {
        cart[itemIndex].quantity = (cart[itemIndex].quantity || 1) + 1;
      } else {
        cart.push({ ...item, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('storage'));
    },
    clearAllWishlist() {
      this.wishlist = [];
      localStorage.removeItem('wishlist');
      // Notify other components about the change
      window.dispatchEvent(new Event('storage'));
    },
  },
};
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
  margin-right: 0.5rem;
}

.add-to-cart-button {
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.add-to-cart-button:hover {
  background-color: #218838;
}

.clear-all-button {
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  margin-bottom: 1rem;
}

.clear-all-button:hover {
  background-color: #c82333;
}

.go-back-button {
  display: block;
  margin-top: 1rem;
  color: #007bff;
}
</style>
