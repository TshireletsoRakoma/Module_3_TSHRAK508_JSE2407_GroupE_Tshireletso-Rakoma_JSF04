<template>
  <div class="checkout-container">
    <h1>Checkout</h1>
    
    <!-- Form to update user information -->
    <form @submit.prevent="updateUserInfo">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="user.name" required />
      </div>
      <div class="form-group">
        <label for="address">Residential Address:</label>
        <input type="text" id="address" v-model="user.address" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="user.email" required />
      </div>
      <button type="submit" class="update-button">Update Information</button>
    </form>

    <!-- Order Summary -->
    <div class="order-summary">
      <h2>Order Summary</h2>
      <ul>
        <li v-for="item in cartItems" :key="item.id">
          {{ item.name }} - {{ item.quantity }} x ${{ item.price }}
        </li>
      </ul>
      <p>Total: ${{ totalPrice }}</p>
    </div>

    <!-- Payment Section -->
    <div id="paypal-button-container"></div>

    <!-- Order History Button -->
    <button class="order-history-button" @click="showOrderHistory = true">
      View Order History
    </button>

    <!-- Order History Modal -->
    <div v-if="showOrderHistory" class="modal-overlay" @click.self="showOrderHistory = false">
      <div class="modal-content">
        <button class="close-button" @click="showOrderHistory = false">X</button>
        <!-- Render OrderHistory component -->
        <OrderHistory />
      </div>
    </div>

    <!-- Confirmation/Error Messages -->
    <div v-if="paymentSuccess" class="success-message">
      Payment successful! Your order has been placed.
    </div>
    <div v-if="paymentError" class="error-message">
      Payment failed. Please try again.
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { loadScript } from "@paypal/paypal-js";
import OrderHistory from './OrderHistory.vue'; // Import OrderHistory component

/**
 * Checkout component.
 * 
 * Handles user checkout process including user information update, order summary display, and payment processing via PayPal.
 * 
 * @component
 */
export default {
  name: "Checkout",
  components: {
    OrderHistory
  },
  computed: {
    /**
     * Vuex getter for the current user details.
     * 
     * @computed
     * @name currentUser
     * @type {Object}
     * @memberof Checkout
     */
    ...mapGetters(['currentUser', 'cartItems', 'totalPrice']),
  },
  data() {
    return {
      /**
       * User information for updating.
       * 
       * @type {Object}
       * @property {string} name - User's name.
       * @property {string} address - User's residential address.
       * @property {string} email - User's email address.
       */
      user: {
        name: this.currentUser?.name || '',
        address: this.currentUser?.address || '',
        email: this.currentUser?.email || ''
      },
      /**
       * Flag indicating if payment was successful.
       * 
       * @type {boolean}
       */
      paymentSuccess: false,
      /**
       * Flag indicating if there was a payment error.
       * 
       * @type {boolean}
       */
      paymentError: false,
      /**
       * Flag controlling the visibility of the order history modal.
       * 
       * @type {boolean}
       */
      showOrderHistory: false,
    };
  },
  methods: {
    /**
     * Updates user information by dispatching the `updateUserDetails` action.
     * 
     * @method
     */
    ...mapActions(['updateUserDetails', 'placeOrder']),
    updateUserInfo() {
      this.updateUserDetails(this.user).then(() => {
        alert('Information updated successfully!');
      }).catch(error => {
        console.error('Failed to update user information:', error);
        alert('Failed to update information. Please try again.');
      });
    },
    /**
     * Handles PayPal payment integration.
     * 
     * Loads the PayPal script and sets up PayPal Buttons with order creation and approval handlers.
     * 
     * @method
     */
    handlePayment() {
      loadScript({ "client-id": "YOUR_SANDBOX_CLIENT_ID" }).then(paypal => {
        paypal.Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: this.totalPrice
                }
              }]
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then(details => {
              this.paymentSuccess = true;
              this.placeOrder({ user: this.user, items: this.cartItems, total: this.totalPrice });
            });
          },
          onError: (err) => {
            console.error(err);
            this.paymentError = true;
          }
        }).render('#paypal-button-container');
      });
    }
  },
  created() {
    /**
     * Checks if the user is authenticated. If not, redirects to the login page.
     * Initializes the PayPal payment button if the user is authenticated.
     * 
     * @method
     */
    if (!this.currentUser) {
      this.$router.push({ name: 'Login', query: { redirect: this.$route.fullPath } });
    } else {
      this.handlePayment(); // Initialize PayPal payment button
    }
  }
};
</script>


<style scoped>
.checkout-container {
  max-width: 600px;
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

/* Form styling */
.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
}

input[type="text"],
input[type="email"] {
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  color: #333;
  box-sizing: border-box;
}

input[type="text"]:focus,
input[type="email"]:focus {
  border-color: #4caf50;
  outline: none;
}

.update-button {
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.update-button:hover {
  background-color: #45a049;
}

.order-summary {
  margin-top: 30px;
  padding: 15px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.order-summary h2 {
  margin-bottom: 15px;
  color: #333;
}

.order-summary ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.order-summary li {
  margin-bottom: 10px;
  font-size: 16px;
  color: #555;
}

.order-summary p {
  margin-top: 15px;
  font-weight: bold;
  font-size: 18px;
  color: #333;
}

#paypal-button-container {
  margin-top: 20px;
}

/* Order History Button */
.order-history-button {
  width: 100%;
  margin-top: 20px;
  padding: 10px;
  background-color: #2196F3;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.order-history-button:hover {
  background-color: #1976D2;
}

/* Modal styling */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
}

.close-button {
  background: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  float: right;
  font-size: 16px;
  margin-top: -10px;
}

.close-button:hover {
  background: #d32f2f;
}

/* Confirmation/Error Messages */
.success-message,
.error-message {
  margin-top: 20px;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
}

.success-message {
  background-color: #d4edda;
  color: #155724;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
}
</style>
