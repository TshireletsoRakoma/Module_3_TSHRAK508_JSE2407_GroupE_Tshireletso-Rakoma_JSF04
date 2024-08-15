import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      searchTerm: '',
      sorting: 'default',
      filterItem: 'All categories',
      isLoggedIn: !!localStorage.getItem('jwt'),
      username: localStorage.getItem('username') || '',
      cart: JSON.parse(localStorage.getItem('cart')) || {}, // Ensure cart state is loaded
    };
  },
  mutations: {
    // Add product to cart
    addToCart(state, { productId, productPrice, quantity = 1 ,productTitle,productImage}) {
      if (!state.cart[state.username]) {
        state.cart[state.username] = {};
      }
      if (state.cart[state.username][productId]) {
        state.cart[state.username][productId].quantity += quantity;
      } else {
        state.cart[state.username][productId] = { quantity, productPrice ,productTitle,productImage};
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    // Update quantity of an existing cart item
    updateCartItem(state, { productId, quantity }) {
      if (state.cart[state.username]) {
        if (quantity > 0) {
          state.cart[state.username][productId].quantity = quantity;
        } else {
          delete state.cart[state.username][productId];
        }
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },
    // Remove an item from the cart
    removeFromCart(state, productId) {
      if (state.cart[state.username] && state.cart[state.username][productId]) {
        delete state.cart[state.username][productId];
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },
    // Clear the cart
    clearCart(state) {
      if (state.cart[state.username]) {
        delete state.cart[state.username];
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },
  },
  actions: {
    // Dispatch to add product to cart
    addToCart({ commit }, payload) {
      commit('addToCart', payload);
    },
    // Dispatch to update cart item quantity
    updateCartItem({ commit }, payload) {
      commit('updateCartItem', payload);
    },
    // Dispatch to remove a product from cart
    removeFromCart({ commit }, productId) {
      commit('removeFromCart', productId);
    },
    // Dispatch to clear the cart
    clearCart({ commit }) {
      commit('clearCart');
    },
  },
  getters: {
    // Count total items in cart
    cartItemCount: (state) => {
      if (!state.isLoggedIn || !state.cart[state.username]) {
        return 0;
      }
      return Object.values(state.cart[state.username]).reduce((acc, item) => acc + item.quantity, 0);
    },
    // Calculate total cost of items in cart
    cartTotalCost: (state) => {
      if (!state.isLoggedIn || !state.cart[state.username]) {
        return 0;
      }
      return Object.values(state.cart[state.username]).reduce((total, item) => {
        return total + item.quantity * item.productPrice;
      }, 0).toFixed(2);
    },
    // Get the entire cart for current user
    cartContents: (state) => {
      if (!state.isLoggedIn || !state.cart[state.username]) {
        return {};
      }
      return state.cart[state.username];
    },
  },
});

export default store;
