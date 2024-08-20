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
      reviews: JSON.parse(localStorage.getItem('reviews')) || {}, 
      ratings: JSON.parse(localStorage.getItem('ratings')) || {},
      comparison: JSON.parse(localStorage.getItem('comparison')) || {}, 
      Checkout: JSON.parse(localStorage.getItem('Checkout')) || {},
      userInfo: JSON.parse(localStorage.getItem('userInfo')) || { // New state for user information
        name: '',
        address: '',
        email: ''
      } 
    };
  },
  mutations: {
    setSearchTerm(state, searchTerm) {
      state.searchTerm = searchTerm;
    },
    setSorting(state, sorting) {
      state.sorting = sorting;
    },
    setFilterItem(state, filterItem) {
      state.filterItem = filterItem;
    },
    login(state, username) {
      state.isLoggedIn = true;
      state.username = username;
      localStorage.setItem('username', username);
      localStorage.setItem('jwt', 'example_token');
    },
    logout(state) {
      state.isLoggedIn = false;
      state.username = '';
      localStorage.removeItem('username');
      localStorage.removeItem('jwt');
    },

    addToComparison(state, { productId, productPrice, quantity = 1, productTitle, productImage, productDescription }) {
      if (!state.comparison[state.username]) {
        state.comparison[state.username] = {};
      }
      if (state.comparison[state.username][productId]) {
        state.comparison[state.username][productId].quantity += quantity;
      } else {
        state.comparison[state.username][productId] = { quantity, productPrice, productTitle, productImage, description: productDescription };
      }
      localStorage.setItem('comparison', JSON.stringify(state.comparison));
    },
    
    updateComparisonItem(state, { productId, quantity }) {
      if (state.comparison[state.username]) {
        if (quantity > 0) {
          state.comparison[state.username][productId].quantity = quantity;
        } else {
          delete state.comparison[state.username][productId];
        }
        localStorage.setItem('comparison', JSON.stringify(state.comparison));
      }
    },
    
    // Updated mutation
    removeFromComparison(state, productId) {
      if (state.comparison[state.username] && state.comparison[state.username][productId]) {
        delete state.comparison[state.username][productId]; // Directly using the delete operator for Vue 3
        localStorage.setItem('comparison', JSON.stringify(state.comparison));
      }
    },
    
    clearComparison(state) {
      if (state.comparison[state.username]) {
        delete state.comparison[state.username];
        localStorage.setItem('comparison', JSON.stringify(state.comparison));
      }
    },

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
    addReview(state, { productId, review }) {
      
      if (!state.reviews[productId]) {
        state.reviews[productId] = [];
      }
      state.reviews[productId].push(review);
      localStorage.setItem('reviews', JSON.stringify(state.reviews));
    },
    updateReview(state, { productId, review }) {
      if (state.reviews[productId]) {
        const index = state.reviews[productId].findIndex(r => r.timestamp === review.timestamp);
        if (index !== -1) {
          state.reviews[productId][index] = review;
          localStorage.setItem('reviews', JSON.stringify(state.reviews));
        }
      }
    },
    deleteReview(state, { productId, timestamp }) {
      if (state.reviews[productId]) {
        state.reviews[productId] = state.reviews[productId].filter(r => r.timestamp !== timestamp);
        localStorage.setItem('reviews', JSON.stringify(state.reviews));
      }
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
    submitReview(state, { productId, review, rating }) {
      // Function to update reviews by fetching from an API or other sources
      async function updateReviews(productId) {
        try {
          let reviews = await fetchReviewsForProduct(productId); 
          state.reviews[productId] = reviews; 
          localStorage.setItem('reviews', JSON.stringify(state.reviews)); 
        } catch (error) {
          console.error('Error fetching reviews:', error);
        }
      }
    
      const newReview = {
        id: Date.now(),
        productId,
        review,
        rating, 
        username: state.username, 
        date: new Date().toISOString(), 
      };
    
      state.reviews[productId] = state.reviews[productId] || [];
      state.reviews[productId].push(newReview);
    
      localStorage.setItem('reviews', JSON.stringify(state.reviews));
    
      updateReviews(productId);
    }
    
  },
  actions: {

    addToComparison({ commit }, payload) {
      commit('addToComparison', payload);
    },
    updateComparisonItem({ commit }, payload) {
      commit('updateComparisonItem', payload);
    },
    removeFromComparison({ commit }, productId) {
      commit('removeFromComparison', productId);
    },
    clearComparison({ commit }) {
      commit('clearComparison');
    },
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
    addReview({ commit }, payload) {
      commit('addReview', payload);

    },
    updateReview({ commit }, payload) {
      commit('updateReview', payload);
    },
    deleteReview({ commit }, payload) {
      commit('deleteReview', payload);
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
    // New action for submitting a review
    submitReview({ commit }, payload) {
      commit('submitReview', payload);
    },
    fetchReviews({ commit }, productId) {
      const storedReviews = JSON.parse(localStorage.getItem('reviews')) || {};
      if (storedReviews[productId]) {
        commit('submitReviews', { productId, reviews: storedReviews[productId] });
      }
    },
  },
  getters: {

    comparisonItemCount: (state) => {
      if (!state.isLoggedIn || !state.comparison[state.username]) {
        return 0;
      }
      return Object.values(state.comparison[state.username]).reduce((acc, item) => acc + item.quantity, 0);
    },
    comparisonTotalCost: (state) => {
      if (!state.isLoggedIn || !state.comparison[state.username]) {
        return 0;
      }
      return Object.values(state.comparison[state.username]).reduce((total, item) => {
        return total + item.quantity * item.productPrice;
      }, 0).toFixed(2);
    },
    comparisonContents: (state) => {
      if (!state.isLoggedIn || !state.comparison[state.username]) {
        return {};
      }
      return state.comparison[state.username];
    } ,
   

    cartItemCount: (state) => {
      const userCart = state.cart[state.username] || {};
      return Object.values(userCart).reduce((total, item) => total + item.quantity, 0);
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
      return state.reviews[productId] || [];
    },
    averageRatingForProduct: (state) => (productId) => {
      const ratings = state.ratings[productId] || [];
      if (ratings.length === 0) return 0;
      const sum = ratings.reduce((acc, rating) => acc + rating, 0);
      return (sum / ratings.length).toFixed(1);
    },
    productReviews: (state) => (productId) => {
      return state.reviews[productId] || [];
    },
  },
});


export default store;