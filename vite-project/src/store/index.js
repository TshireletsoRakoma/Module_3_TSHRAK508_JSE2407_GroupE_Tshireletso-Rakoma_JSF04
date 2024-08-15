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
      wishlist: [], // Initialize wishlist state
    };
  },
  mutations: {
    // Cart mutations
    addToCart(state, { productId, productPrice, quantity = 1, productTitle, productImage }) {
      if (!state.cart[state.username]) {
        state.cart[state.username] = {};
      }
      if (state.cart[state.username][productId]) {
        state.cart[state.username][productId].quantity += quantity;
      } else {
        state.cart[state.username][productId] = { quantity, productPrice, productTitle, productImage };
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
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
    removeFromCart(state, productId) {
      if (state.cart[state.username] && state.cart[state.username][productId]) {
        delete state.cart[state.username][productId];
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },
    clearCart(state) {
      if (state.cart[state.username]) {
        delete state.cart[state.username];
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },

    // Wishlist mutations
    addToWishlist(state, product) {
      state.wishlist.push(product);
      localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
    },
    removeFromWishlist(state, productId) {
      state.wishlist = state.wishlist.filter(item => item.id !== productId);
    },
  },
  actions: {
    // Cart actions
    addToCart({ commit }, payload) {
      commit('addToCart', payload);
    },
    updateCartItem({ commit }, payload) {
      commit('updateCartItem', payload);
    },
    removeFromCart({ commit }, productId) {
      commit('removeFromCart', productId);
    },
    clearCart({ commit }) {
      commit('clearCart');
    },

    // Wishlist actions
    addToWishlist({ commit }, product) {
      commit('addToWishlist', product);
    },
    removeFromWishlist({ commit }, productId) {
      commit('removeFromWishlist', productId);
    },
  },
  getters: {
    // Cart getters
    cartItemCount: (state) => {
      if (!state.isLoggedIn || !state.cart[state.username]) {
        return 0;
      }
      return Object.values(state.cart[state.username]).reduce((acc, item) => acc + item.quantity, 0);
    },
    cartTotalCost: (state) => {
      if (!state.isLoggedIn || !state.cart[state.username]) {
        return 0;
      }
      return Object.values(state.cart[state.username]).reduce((total, item) => {
        return total + item.quantity * item.productPrice;
      }, 0).toFixed(2);
    },
    cartContents: (state) => {
      if (!state.isLoggedIn || !state.cart[state.username]) {
        return {};
      }
      return state.cart[state.username];
    },

    // Optional wishlist getters (if needed in the future)
    wishlistItems: (state) => {
      return state.wishlist;
    },
    wishlistCount: (state) => {
      return state.wishlist.length;
    },
  },
});

export default store;
