<template>
  <main class="comparison-container">
    <h1>Compare List</h1>
    <div v-if="comparisonItemCount === 0" class="empty-cart">
      Your comparison list is empty.
    </div>
    <div v-else class="comparison-items">
      <table>
        <tbody>
          <tr v-for="(row, rowIndex) in chunkedComparisonContents" :key="rowIndex">
            <td v-for="(item, colIndex) in row" :key="`${rowIndex}-${colIndex}`" class="product-column">
              <div v-if="item">
                <div class="image-container">
                  <img :src="item.productImage" :alt="item.productTitle" class="product-image"/>
                </div>
                <h3>{{ item.productTitle }}</h3>
                <p>Price: ${{ item.productPrice }}</p>
                <p>Quantity: {{ item.quantity }}</p>
                <p>Description: {{ item.description }}</p>
                <p>Total: ${{ (item.productPrice * item.quantity).toFixed(2) }}</p>
                <button @click="removeItem(item.productId)" class="delete-button">
                  Delete
                </button>
              </div>
              <div v-else class="empty-column">
                No product selected
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="comparison-summary">
      <p>Total Items: {{ comparisonItemCount }}</p>
      <p>Total Cost: ${{ comparisonTotalCost }}</p>
    </div>
    <a href="/" class="go-back-button">
      Go Back
    </a>
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

export default {
  name: "Comparison",
  computed: {
    ...mapGetters(['comparisonItemCount', 'comparisonTotalCost', 'comparisonContents']),
    chunkedComparisonContents() {
      const chunkSize = 2;
      const chunks = [];
      for (let i = 0; i < this.comparisonContentsArray.length; i += chunkSize) {
        chunks.push(this.comparisonContentsArray.slice(i, i + chunkSize));
      }
      return chunks;
    },
    comparisonContentsArray() {
      return Object.entries(this.comparisonContents).map(([productId, item]) => ({ productId, ...item }));
    }
  },
  methods: {
    ...mapActions(['removeFromComparison']),
    removeItem(productId) {
      console.log('Removing product with ID:', productId); // Debugging log
      this.removeFromComparison(productId);
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

.comparison-items table {
  width: 100%;
  border-collapse: collapse;
}

.product-column {
  width: 50%;
  padding: 20px;
  vertical-align: top;
  border: 1px solid #ddd;
}

.image-container {
  width: 200px;
  height: 200px;
  margin: 0 auto 20px;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.empty-column {
  text-align: center;
  color: #888;
  padding: 20px;
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
