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
          <div class="item-details">
            <p>{{ getProductName(productId) }}</p>
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
      <!-- Go Back Button -->
      <a href="/" class="go-back-button">
        Go Back
      </a>
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
      getProductName(productId) {
        // Fetch or map productId to product name, possibly using a separate Vuex action or API call.
        return `Product ${productId}`; // Placeholder
      },
      getProductImage(productId) {
        // Placeholder function to fetch the product image URL
        return `https://fakestoreapi.com/img/${productId}.jpg`; // Placeholder URL format for images
      },
      removeItemFromCart(productId) {
        this.removeFromCart(productId);
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

  .go-back-button {
    display: block;
    margin: 20px auto;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Added box shadow */
  }
  
  .go-back-button:hover {
    background-color: #0056b3;
  }
  </style>
