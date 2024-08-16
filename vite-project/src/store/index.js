import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      searchTerm: '',
      sorting: 'default',
      filterItem: 'All categories',
      isLoggedIn: !!localStorage.getItem('jwt'),
      username: localStorage.getItem('username') || '',
      cart: JSON.parse(localStorage.getItem('cart')) || {},
      wishlist: JSON.parse(localStorage.getItem('wishlist')) || [],
      reviews: JSON.parse(localStorage.getItem('reviews')) || [],
      ratings: JSON.parse(localStorage.getItem('ratings')) || {}, // Store ratings by productId
    };
  },
  mutations: {
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
    addToWishlist(state, product) {
      state.wishlist.push(product);
      localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
    },
    removeFromWishlist(state, productId) {
      state.wishlist = state.wishlist.filter(item => item.id !== productId);
      localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
    },
    addReview(state, review) {
      state.reviews.push(review);
      localStorage.setItem('reviews', JSON.stringify(state.reviews));
    },
    updateReview(state, updatedReview) {
      const index = state.reviews.findIndex(review => review.id === updatedReview.id);
      if (index !== -1) {
        state.reviews[index] = updatedReview;
        localStorage.setItem('reviews', JSON.stringify(state.reviews));
      }
    },
    deleteReview(state, reviewId) {
      state.reviews = state.reviews.filter(review => review.id !== reviewId);
      localStorage.setItem('reviews', JSON.stringify(state.reviews));
    },
    addRating(state, { productId, rating }) {
      if (!state.ratings[productId]) {
        state.ratings[productId] = [];
      }
      state.ratings[productId].push(rating);
      localStorage.setItem('ratings', JSON.stringify(state.ratings));
    },
    updateRating(state, { productId, index, rating }) {
      if (state.ratings[productId] && state.ratings[productId][index] !== undefined) {
        state.ratings[productId][index] = rating;
        localStorage.setItem('ratings', JSON.stringify(state.ratings));
      }
    },
    deleteRating(state, { productId, index }) {
      if (state.ratings[productId] && state.ratings[productId][index] !== undefined) {
        state.ratings[productId].splice(index, 1);
        localStorage.setItem('ratings', JSON.stringify(state.ratings));
      }
    },
  },
  actions: {
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
    addToWishlist({ commit }, product) {
      commit('addToWishlist', product);
    },
    removeFromWishlist({ commit }, productId) {
      commit('removeFromWishlist', productId);
    },
    addReview({ commit }, review) {
      commit('addReview', review);
    },
    updateReview({ commit }, updatedReview) {
      commit('updateReview', updatedReview);
    },
    deleteReview({ commit }, reviewId) {
      commit('deleteReview', reviewId);
    },
    addRating({ commit }, payload) {
      commit('addRating', payload);
    },
    updateRating({ commit }, payload) {
      commit('updateRating', payload);
    },
    deleteRating({ commit }, payload) {
      commit('deleteRating', payload);
    },
  },
  getters: {
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
    wishlistItemCount: (state) => {
      return state.wishlist.length;
    },
    reviewsForProduct: (state) => (productId) => {
      return state.reviews.filter(review => review.productId === productId);
    },
    averageRatingForProduct: (state) => (productId) => {
      const ratings = state.ratings[productId] || [];
      if (ratings.length === 0) return 0;
      const sum = ratings.reduce((acc, rating) => acc + rating, 0);
      return (sum / ratings.length).toFixed(1);
    },
  },
});

export default store;
