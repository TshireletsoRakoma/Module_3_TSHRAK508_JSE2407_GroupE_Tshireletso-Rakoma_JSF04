<template>
  <div class="reviews-container">
    <h2>Customer Reviews</h2>
    <div v-if="reviews.length > 0">
      <div v-for="review in reviews" :key="review.id" class="review-item">
        <p><strong>{{ review.username }}:</strong> {{ review.review }}</p>
        <p><strong>Rating:</strong> {{ review.rating }} / 5</p>
        <p><strong>Date:</strong> {{ formatDate(review.date) }}</p>
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
        v-model="newReview.username"
        type="text"
        id="name"
        name="name"
        placeholder="Your name"
        required
      />

      <label for="rating">Rating:</label>
      <select v-model="newReview.rating" id="rating" name="rating" required>
        <option disabled value="">Select a rating</option>
        <option v-for="rating in 5" :key="rating" :value="rating">{{ rating }} - {{ getRatingText(rating) }}</option>
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
      type: [String,Number],
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const reviews = computed(() => store.getters.productReviews(props.productId) || []);
    console.log(reviews)
    const newReview = ref({
      name: '',
      comment: '',
      rating: '',
    });
    const loggedIn = computed(() => store.state.isLoggedIn);

    const submitReview = () => {
      // if (!newReview.value.name || !newReview.value.comment || !newReview.value.rating) {
      //   alert('Please fill in all fields');
      //   return;
      // }

      const review = {
        ...newReview.value,
        timestamp: new Date().toISOString(),
      };

      store.dispatch('submitReview', { productId: props.productId, review });
      newReview.value = { name: '', comment: '', rating: '' };
    };

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    };

    const getRatingText = (rating) => {
      switch (rating) {
        case 1: return 'Poor';
        case 2: return 'Fair';
        case 3: return 'Good';
        case 4: return 'Very Good';
        case 5: return 'Excellent';
        default: return '';
      }
    };

    watch(() => props.productId, () => {
      store.dispatch('fetchReviews', props.productId);
    });

    onMounted(() => {
  console.log('Fetched Reviews:', reviews.value);
  store.dispatch('fetchReviews', props.productId);
});


    return {
      reviews,
      newReview,
      loggedIn,
      submitReview,
      formatDate,
      getRatingText,
    };
  },
};
</script>

<style scoped>
.reviews-container {
  font-family: Arial, sans-serif;
  margin: 20px;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.review-item {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.review-item p {
  margin: 5px 0;
}

.review-form {
  margin-top: 20px;
}

.review-form h3 {
  font-size: 1.2rem;
  margin-bottom: 15px;
}

.review-form label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.review-form input,
.review-form select,
.review-form textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.review-form button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.review-form button:hover {
  background-color: #0056b3;
}

.review-form textarea {
  height: 100px;
}
</style>
