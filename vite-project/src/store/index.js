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
      wishlist2: JSON.parse(localStorage.getItem('wishlist2')) || [],
      reviews: JSON.parse(localStorage.getItem('reviews')) || {}, // Store reviews by productId
      ratings: JSON.parse(localStorage.getItem('ratings')) || {},
      comparison: JSON.parse(localStorage.getItem('comparison')) || {}, // Store ratings by productId
      Checkout: JSON.parse(localStorage.getItem('Checkout')) || {},
      userInfo: JSON.parse(localStorage.getItem('userInfo')) || {
        name: '',
        address: '',
        email: ''
      },
      orderHistory: JSON.parse(localStorage.getItem('orderHistory')) || {},

    };
  },
  mutations: {

    SET_WISHLIST(state, wishlist) {
      state.wishlist = wishlist;
    },
    REMOVE_FROM_WISHLIST(state, productId) {
      state.wishlist = state.wishlist.filter(item => item.productId !== productId);
    },
    ADD_ORDER(state, order) {
      state.orders.push(order);
    },
    CLEAR_CART(state) {
      state.cart = [];
    },
    REMOVE_ORDER(state, orderId) {
      state.orders = state.orders.filter(order => order.id !== orderId);
    },

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

    addToComparison(state, { productId, productPrice, quantity = 1, productTitle, productImage }) {
      if (!state.comparison[state.username]) {
        state.comparison[state.username] = {};
      }
      if (state.comparison[state.username][productId]) {
        state.comparison[state.username][productId].quantity += quantity;
      } else {
        state.comparison[state.username][productId] = { quantity, productPrice, productTitle, productImage };
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
    removeFromComparison(state, productId) {
      if (state.comparison[state.username] && state.comparison[state.username][productId]) {
        delete state.comparison[state.username][productId];
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
    
    removeFromWishlist(state, productId) {
      state.wishlist = state.wishlist.filter(item => item.productId !== productId);
      localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
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
      console.log("LOL",state.reviews);
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
    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo;
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
    },

    submitReview(state, { productId, review, rating }) {
      // Function to update reviews by fetching from an API or other sources
      async function updateReviews(productId) {
        try {
          let reviews = await fetchReviewsForProduct(productId); // Fetch updated reviews for the product
          console.log(reviews)
          state.reviews[productId] = reviews; // Update state with fetched reviews
          localStorage.setItem('reviews', JSON.stringify(state.reviews)); // Store updated reviews in local storage
        } catch (error) {
          console.error('Error fetching reviews:', error);
        }
      }
    
      // Create a new review object
      const newReview = {
        id: Date.now(), // Unique ID based on timestamp
        productId,
        review,
        rating, // Add rating to the new review
        username: state.username, // Assuming logged-in user submits the review
        date: new Date().toISOString(), // Capture the date of submission
      };
    
      // Ensure that the reviews array exists for the product
      state.reviews[productId] = state.reviews[productId] || [];
      state.reviews[productId].push(newReview); // Add the new review to the state
    
      // Update reviews in local storage
      localStorage.setItem('reviews', JSON.stringify(state.reviews));
    
      // Fetch updated reviews to ensure consistency
      updateReviews(productId);
    }
    
  },
  actions: {
    // Add an item to the cart and remove it from the wishlist
    async addToCart({ commit }, cartPayload) {
      try {
        await apiAddToCart(cartPayload);
        commit('addToCart', cartPayload);
        commit('removeFromWishlist', cartPayload.productId); // Remove from wishlist after adding to cart
      } catch (error) {
        console.error('Failed to add to cart:', error);
      }
    },
    
    // Update user information
    async updateUserInfo({ commit }, userInfo) {
      try {
        await apiUpdateUserInfo(userInfo);
        commit('updateUserInfo', userInfo);
      } catch (error) {
        console.error('Failed to update user information:', error);
      }
    },
    
    // Update a specific user field
    async updateUserField({ commit }, payload) {
      try {
        await apiUpdateUserField(payload);
        commit('updateUserField', payload);
      } catch (error) {
        console.error('Failed to update user field:', error);
      }
    },
  
    // Place an order and clear the cart
    placeOrder({ commit, state }, order) {
      commit('ADD_ORDER', { ...order, id: Date.now() });
      commit('CLEAR_CART');
    },
    
    // Cancel an order
    cancelOrder({ commit }, orderId) {
      commit('REMOVE_ORDER', orderId);
    },
    
    // Add an item to the comparison list
    addToComparison({ commit }, payload) {
      commit('addToComparison', payload);
    },
    
    // Update a comparison item
    updateComparisonItem({ commit }, payload) {
      commit('updateComparisonItem', payload);
    },
    
    // Remove an item from the comparison list
    removeFromComparison({ commit }, productId) {
      commit('removeFromComparison', productId);
    },
    
    // Clear the comparison list
    clearComparison({ commit }) {
      commit('clearComparison');
    },
    
    // Add an item to the cart
    addToCart({ commit }, payload) {
      commit('addToCart', payload);
    },
    
    // Update a cart item
    updateCartItem({ commit }, payload) {
      commit('updateCartItem', payload);
    },
    
    // Remove an item from the cart
    removeFromCart({ commit }, productId) {
      commit('removeFromCart', productId);
    },
    
    // Clear the cart
    clearCart({ commit }) {
      commit('clearCart');
    },
    
    // Add an item to the wishlist
    addToWishlist({ commit }, product) {
      commit('addToWishlist', product);
    },
    
    // Remove an item from the wishlist
    removeFromWishlist({ commit }, productId) {
      commit('removeFromWishlist', productId);
    },
    
    // Add a review
    addReview({ commit }, payload) {
      commit('addReview', payload);
    },
    
    // Update a review
    updateReview({ commit }, payload) {
      commit('updateReview', payload);
    },
    
    // Delete a review
    deleteReview({ commit }, payload) {
      commit('deleteReview', payload);
    },
    
    // Add a rating
    addRating({ commit }, payload) {
      commit('addRating', payload);
    },
    
    // Update a rating
    updateRating({ commit }, payload) {
      commit('updateRating', payload);
    },
    
    // Delete a rating
    deleteRating({ commit }, payload) {
      commit('deleteRating', payload);
    },
    
    // Submit a review
    submitReview({ commit }, payload) {
      commit('submitReview', payload);
    },
    
    // Fetch reviews for a product
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
    },

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
    wishlistItemCount(state) {
      return state.wishlist.length;
    },
    
    wishlistItems(state) {
      return state.wishlist;
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
    currentUser: (state) => {
      return state.isLoggedIn ? state.userInfo : null;
    },
    currentUser: state => state.user,
    cartItems: state => state.cart,
    totalPrice: state => state.cart.reduce((total, item) => total + (item.price * item.quantity), 0),
    pastOrders: state => state.orders
  },
});


export default store;