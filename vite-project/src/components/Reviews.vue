<template>
    <div class="reviews-container">
      <h2>Customer Reviews</h2>
      <div v-if="reviews.length > 0">
        <div v-for="review in reviews" :key="review.timestamp" class="review-item">
          <p><strong>{{ review.name }}:</strong> {{ review.comment }}</p>
          <p><strong>Rating:</strong> {{ review.rating }}</p>
          <p><strong>Date:</strong> {{ formatDate(review.timestamp) }}</p>
        </div>
      </div>
      <div v-else>
        <p>No reviews yet. Be the first to review this product!</p>
      </div>
  
      <!-- Review Submission Form -->
      <div v-if="loggedIn" class="review-form">
        <h3>Leave a Review</h3>
        <label for="name">Name:</label>
        <input
          v-model="newReview.name"
          type="text"
          id="name"
          name="name"
          placeholder="Your name"
          required
        />
  
        <label for="rating">Rating:</label>
        <select v-model="newReview.rating" id="rating" name="rating" required>
          <option disabled value="">Select a rating</option>
          <option value="1">1 - Poor</option>
          <option value="2">2 - Fair</option>
          <option value="3">3 - Good</option>
          <option value="4">4 - Very Good</option>
          <option value="5">5 - Excellent</option>
        </select>
  
        <label for="comment">Comment:</label>
        <textarea
          v-model="newReview.comment"
          id="comment"
          name="comment"
          placeholder="Write your review"
          required
        ></textarea>
  
        <button @click="submitReview">Submit Review</button>
      </div>
    </div>
  </template>
  
  <script>
  import { computed, ref, watch, onMounted } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    name: 'Reviews',
    props: {
      productId: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      const store = useStore();
      const reviews = computed(() => store.getters.productReviews(props.productId) || []);
      const newReview = ref({
        name: '',
        comment: '',
        rating: '',
      });
      const loggedIn = computed(() => store.state.isLoggedIn);
  
      const submitReview = () => {
        if (!newReview.value.name || !newReview.value.comment || !newReview.value.rating) {
          alert('Please fill in all fields');
          return;
        }
  
        const review = {
          ...newReview.value,
          timestamp: new Date().toISOString(),
        };
  
        store.dispatch('addReview', { productId: props.productId, review });
        newReview.value = { name: '', comment: '', rating: '' };
      };
  
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      };
  
      watch(() => props.productId, () => {
        store.dispatch('fetchReviews', props.productId);
      });
  
      onMounted(() => {
        store.dispatch('fetchReviews', props.productId);
      });
  
      return {
        reviews,
        newReview,
        loggedIn,
        submitReview,
        formatDate,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  