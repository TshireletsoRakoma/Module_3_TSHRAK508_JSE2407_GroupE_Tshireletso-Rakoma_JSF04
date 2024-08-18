<template>
    <main class="comparison-container">
      <h1>Compare List</h1>
      <div v-if="cartItemCount === 0" class="empty-cart">
        Your cart is empty.
      </div>
      <div v-else class="comparison-items">
        <div v-for="(item, productId) in cartContents" :key="productId" class="comparison-item">
          <!-- Display the product image -->
          <img :src="getProductImage(productId, item)" :alt="getProductName(productId)" class="product-image"/>
          
          <div class="item-details">
            <p>{{ item.productTitle }}</p>
            <!-- <p>{{ item.productDetail }}</p> -->
            <p>Price: ${{ item.productPrice }}</p>
            <p>Quantity: {{ item.quantity }}</p>
            <p>Total: ${{ (item.productPrice * item.quantity).toFixed(2) }}</p>
          </div>
          <!-- Delete Item Button -->
          <button @click="removeItemFromComparison(productId)" class="delete-button">
            Remove
          </button>
        </div>
        <div class="comparison-summary">
        
          <p>Total Items: {{ comparisonItemCount }}</p>
          <p>Total Cost: ${{ comparisonTotalCost }}</p>
        </div>
      </div>
      <!-- Go Back Button -->
      <a href="/" class="go-back-button">
        Go Back
      </a>
      <!-- SVG with item count -->
     
    </main>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    name: "Comparison",
    computed: {
      ...mapGetters(['comparisonItemCount', 'comparisonTotalCost', 'cartContents']),
    },
    methods: {
      ...mapActions(['removeFromComparison']),
      getProductName(productId) {
        // Fetch or map productId to product name, possibly using a separate Vuex action or API call.
        return `Product ${productId}`; // Placeholder
      },
      getProductimage(productId, item) {
        console.log(item.productImage)
        // Placeholder function to fetch the product image URL
        return item.productImage; // Placeholder URL format for images
      },
      removeItemFromComparison(productId) {
        this.removeFromComparison(productId);
      }
    }
  }
  </script>
  
  <style scoped>
  .comparison-container {
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
  
  .-summary {
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
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .go-back-button:hover {
    background-color: #0056b3;
  }
  
  .comparison-svg {
    position: relative;
    display: inline-block;
  }
  
  .comparison-svg svg {
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
  }
  </style>