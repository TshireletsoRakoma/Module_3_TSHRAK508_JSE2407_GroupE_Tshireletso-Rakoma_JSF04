<template>
    <div class="order-history">
      <h1>Order History</h1>
      <ul>
        <li v-for="order in pastOrders" :key="order.id">
          Order ID: {{ order.id }} - Total: ${{ order.total }}
          <button @click="cancelOrder(order.id)">Cancel Order</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    name: "OrderHistory",
    computed: {
      ...mapGetters(['pastOrders']),
    },
    methods: {
      ...mapActions(['cancelOrder']),
    }
  };
  </script>
  
  <style scoped>
  /* styles for order history */
  </style>
  