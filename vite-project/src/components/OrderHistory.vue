<template>
    <div class="order-history">
      <h1>Order History</h1>
      <ul>
        <li v-for="order in pastOrders" :key="order.id" class="order-item">
          <div class="order-details">
            <p><strong>Order ID:</strong> {{ order.id }}</p>
            <p><strong>Total:</strong> ${{ order.total }}</p>
          </div>
          <ul class="product-list">
            <li v-for="product in order.products" :key="product.id" class="product-item">
              <img :src="product.image" alt="Product Image" class="product-image" />
              <div class="product-info">
                <p>{{ product.name }}</p>
                <p>{{ product.quantity }} x ${{ product.price }}</p>
              </div>
            </li>
          </ul>
          <button @click="cancelOrder(order.id)" class="cancel-button">Cancel Order</button>
        </li>
      </ul>
    </div>
  </template>
<style scoped>
.order-history {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.order-item {
  padding: 15px;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.order-details {
  margin-bottom: 10px;
}

.product-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.product-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.product-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 15px;
}

.product-info {
  font-size: 14px;
  color: #555;
}

.cancel-button {
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.cancel-button:hover {
  background-color: #d32f2f;
}
</style>
  
  
  <style scoped>
  /* styles for order history */
  </style>
  