<template>
  <main class="comparison-container">
    <h1>Compare List</h1>
    <div v-if="comparisonItemCount === 0" class="empty-cart">
      Your comparison list is empty.
    </div>
    <div v-else class="comparison-items">
      <div class="comparison-grid">
        <div class="comparison-item" v-for="item in comparisonContentsArray" :key="item.productId">
          <div class="comparison-header">
            <div class="image-container">
              <img :src="item.productImage" :alt="item.productTitle" class="product-image"/>
            </div>
            <h3>{{ item.productTitle }}</h3>
          </div>
          <div class="comparison-details">
            <div>Price: ${{ item.productPrice }}</div>
            <div>Quantity: {{ item.quantity }}</div>
            <div>Total: ${{ (item.productPrice * item.quantity).toFixed(2) }}</div>
            <div class="product-details">
              <h4>Product Details:</h4>
              <ul>
                <li v-for="(detail, index) in item.productDetails" :key="index">{{ detail }}</li>
              </ul>
            </div>
            <button @click="removeItem(item.productId)" class="delete-button">Delete</button>
          </div>
        </div>
      </div>
    </div>
    <div class="comparison-summary">
      <p>Total Items: {{ comparisonItemCount }}</p>
      <p>Total Cost: ${{ comparisonTotalCost }}</p>
    </div>
    <div class="actions">
      <a href="/" class="go-back-button">Go Back</a>
      <button @click="clearAllItems" class="clear-all-button">Clear All</button>
    </div>
    <div class="comparison-svg">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="black" stroke-width="2"/>
        <text x="12" y="16" text-anchor="middle" fill="black" font-size="12">{{ comparisonItemCount }}</text>
      </svg>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

/**
 * Comparison component.
 * 
 * Displays a list of compared items with their details, total items, and total cost.
 * Allows users to remove individual items, clear all items, and navigate back to the home page.
 * 
 * @component
 */
export default {
  name: "Comparison",
  computed: {
    /**
     * Retrieves the count of items in the comparison list from Vuex store.
     * 
     * @computed
     * @name comparisonItemCount
     * @type {number}
     * @memberof Comparison
     */
    ...mapGetters(['comparisonItemCount', 'comparisonTotalCost', 'comparisonContents']),
    
    /**
     * Maps the comparison contents object to an array of items for easier iteration.
     * 
     * @computed
     * @name comparisonContentsArray
     * @type {Array<Object>}
     * @memberof Comparison
     */
    comparisonContentsArray() {
      return Object.entries(this.comparisonContents).map(([productId, item]) => ({ productId, ...item }));
    }
  },
  methods: {
    /**
     * Removes a specific item from the comparison list based on its product ID.
     * 
     * @method
     * @param {string} productId - The ID of the product to remove.
     * @memberof Comparison
     */
    ...mapActions(['removeFromComparison', 'clearComparison']),
    removeItem(productId) {
      console.log('Removing product with ID:', productId); // Debugging log
      this.removeFromComparison(productId);
    },

    /**
     * Clears all items from the comparison list.
     * 
     * @method
     * @memberof Comparison
     */
    clearAllItems() {
      console.log('Clearing all comparison items'); // Debugging log
      this.clearComparison();
    }
  }
};
</script>

<style scoped>
.comparison-container {
  max-width: 1000px;
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

.comparison-items {
  overflow-x: auto; /* Allows horizontal scrolling if necessary */
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 columns */
  gap: 20px; /* Space between grid items */
}

.comparison-item {
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.comparison-header {
  text-align: center;
  margin-bottom: 10px;
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.comparison-details {
  text-align: center;
}

.product-details {
  margin-top: 15px;
  text-align: left;
}

.product-details h4 {
  margin-bottom: 5px;
}

.product-details ul {
  padding-left: 20px;
}

.product-details li {
  margin-bottom: 5px;
  font-size: 14px;
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

.comparison-summary {
  margin-top: 20px;
  font-weight: bold;
}

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.go-back-button, .clear-all-button {
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

.go-back-button:hover, .clear-all-button:hover {
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
