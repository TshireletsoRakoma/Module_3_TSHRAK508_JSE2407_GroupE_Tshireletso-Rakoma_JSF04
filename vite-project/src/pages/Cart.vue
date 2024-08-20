<template>
  <main class="cart-container">
    <h1>Your Cart</h1>
    <div v-if="cartItemCount === 0" class="empty-cart">
      Your cart is empty.
    </div>
    <div v-else class="cart-items">
      <div v-for="(item, productId) in cartContents" :key="productId" class="cart-item">
        <!-- Display the product image -->
        <img :src="getProductImage(item)" :alt="item.productTitle" class="product-image"/>
        
        <div class="item-details">
          <p>{{ item.productTitle }}</p>
          <p>Price: ${{ item.productPrice }}</p>
          <p>Quantity: {{ item.quantity }}</p>
          <p>Total: ${{ (item.productPrice * item.quantity).toFixed(2) }}</p>
        </div>
        <!-- Delete Item Button -->
        <button @click="removeItemFromCart(productId)" class="delete-button">
          Delete
        </button>
      </div>
      <div class="cart-summary">
        <p>Total Items: {{ cartItemCount }}</p>
        <p>Total Cost: ${{ cartTotalCost }}</p>
      </div>
    </div>
    <!-- Buttons Section -->
    <div class="button-section">
      <!-- Go Back Button -->
      <router-link to="/" class="go-back-button">
        Go Back
      </router-link>
      <!-- Checkout Button -->
      <button @click="checkout" class="checkout-button">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 11l3 3L22 4m-5 16H7a2 2 0 0 1-2-2V5H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Checkout
      </button>
    </div>
    <!-- SVG with item count -->
    <div class="cart-svg">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 18C6.44772 18 6 18.4477 6 19C6 19.5523 6.44772 20 7 20C7.55228 20 8 19.5523 8 19C8 18.4477 7.55228 18 7 18ZM1 1H3L6.68 14.39C6.79464 14.8437 7.14661 15.2007 7.61019 15.33L17.5 18L17.24 19H5V21H18.56C18.9496 21 19.2978 20.7565 19.3999 20.3797L21.88 11.5C21.9566 11.2236 21.9517 10.9263 21.8666 10.6495C21.7815 10.3727 21.6205 10.1296 21.4051 9.95004C21.1896 9.77044 20.9299 9.6631 20.66 9.643L5.16 8.53L4.26 5H1V7H3L6.32 17H16.24L14.66 11H5.65L4.4 6H1V1Z" fill="currentColor"/>
      </svg>
      <span class="item-count">{{ cartItemCount }}</span>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "Cart",
  computed: {
    ...mapGetters(['cartItemCount', 'cartTotalCost', 'cartContents']),
  },
  methods: {
    ...mapActions(['removeFromCart']),
    getProductImage(item) {
      return item.productImage; // Returns the image URL of the product
    },
    removeItemFromCart(productId) {
      this.removeFromCart(productId);
    },
    checkout() {
      // Navigate to the Checkout page
      this.$router.push({ name: 'Checkout' });
    }
  }
}
</script>

<style scoped>
.cart-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.empty-cart {
  text-align: center;
  color: #555;
}

.cart-items {
  display: flex;
  flex-direction: column;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.product-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 20px;
}

.item-details {
  flex-grow: 1;
}

.delete-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.delete-button:hover {
  background-color: #c0392b;
}

.cart-summary {
  margin-top: 20px;
  font-weight: bold;
}

.button-section {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.go-back-button {
  background-color: #007bff;
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.go-back-button:hover {
  background-color: #0056b3;
}

.checkout-button {
  display: flex;
  align-items: center;
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.checkout-button svg {
  margin-right: 8px;
}

.checkout-button:hover {
  background-color: #218838;
}

.cart-svg {
  position: relative;
  display: inline-block;
}

.cart-svg svg {
  width: 24px;
  height: 24px;
}

.item-count {
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
}
</style>
