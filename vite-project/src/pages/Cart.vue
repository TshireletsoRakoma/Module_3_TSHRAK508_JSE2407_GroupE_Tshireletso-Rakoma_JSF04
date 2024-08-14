<template>
    <main class="cart-container">
      <h1>Your Cart</h1>
      <div v-if="cartItemCount === 0" class="empty-cart">
        Your cart is empty.
      </div>
      <div v-else class="cart-items">
        <div v-for="(item, productId) in cartContents" :key="productId" class="cart-item">
          <!-- Display the product image -->
          <img :src="getProductImage(productId)" :alt="getProductName(productId)" class="product-image"/>
          <p>{{ getProductName(productId) }}</p>
          <p>Price: ${{ item.productPrice }}</p>
          <p>Quantity: {{ item.quantity }}</p>
          <p>Total: ${{ (item.productPrice * item.quantity).toFixed(2) }}</p>
        </div>
        <div class="cart-summary">
          <p>Total Items: {{ cartItemCount }}</p>
          <p>Total Cost: ${{ cartTotalCost }}</p>
        </div>
      </div>
    </main>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  
  export default {
    name: "Cart",
    computed: {
      ...mapGetters(['cartItemCount', 'cartTotalCost', 'cartContents']),
    },
    methods: {
      getProductName(productId) {
        // Fetch or map productId to product name, possibly using a separate Vuex action or API call.
        return `Product ${productId}`; // Placeholder
      },
      getProductImage(productId) {
        // Placeholder function to fetch the product image URL
        return `https://fakestoreapi.com/img/${productId}.jpg`; // Placeholder URL format for images
      }
    }
  };
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
  
  .cart-summary {
    margin-top: 20px;
    font-weight: bold;
  }
  </style>
  