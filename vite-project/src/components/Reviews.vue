<template>
  <div class="reviews-container">
    <!-- Heading for the Reviews Section -->
    <h2>Customer Reviews</h2>
    
    <!-- Sorting Options -->
    <div v-if="reviews.length > 0" class="sorting-options">
      <label for="sortReviews">Sort by:</label>
      <select v-model="sortOption" id="sortReviews">
        <option value="date">Date</option>
        <option value="rating">Rating</option>
      </select>
    </div>

    <!-- Reviews Display -->
    <div v-if="sortedReviews.length > 0">
      <div v-for="review in sortedReviews" :key="review.id" class="review-item">
        <!-- Display Reviewer's Name and Comment -->
        <p><strong>{{ review.username }}:</strong> {{ review.comment }}</p>
        
        <!-- Display Reviewer's Rating and Date -->
        <p><strong>Rating:</strong> {{ review.rating }} / 5</p>
        <p><strong>Date:</strong> {{ formatDate(review.date) }}</p>

        <!-- Edit/Delete Options for Logged-In Users -->
        <div v-if="loggedIn && review.username === currentUsername" class="review-actions">
          <button @click="editReview(review)">Edit</button>
          <button @click="deleteReview(review.id)">Delete</button>
        </div>
      </div>
    </div>
    <div v-else>
      <!-- Message if there are no reviews -->
      <p>No reviews yet. Be the first to review this product!</p>
    </div>

    <!-- Review Submission Form -->
    <div v-if="loggedIn" class="review-form">
      <!-- Form Heading Changes Based on Edit Mode -->
      <h3>{{ editMode ? 'Edit Your Review' : 'Leave a Review' }}</h3>
      
      <!-- Reviewer's Name Field -->
      <label for="name">Name:</label>
      <input
        v-model="newReview.username"
        type="text"
        id="name"
        name="name"
        placeholder="Your name"
        required
        :readonly="editMode" 
      />

      <!-- Rating Selection -->
      <label for="rating">Rating:</label>
      <select v-model="newReview.rating" id="rating" name="rating" required>
        <option disabled value="">Select a rating</option>
        <option v-for="rating in 5" :key="rating" :value="rating">{{ rating }} - {{ getRatingText(rating) }}</option>
      </select>

      <!-- Comment Textarea -->
      <label for="comment">Comment:</label>
      <textarea
        v-model="newReview.comment"
        id="comment"
        name="comment"
        placeholder="Write your review"
        required
      ></textarea>

      <!-- Submit/Update Button -->
      <button @click="submitReview">{{ editMode ? 'Update Review' : 'Submit Review' }}</button>
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
      type: [String, Number],
      required: true, // Ensure productId is required
    },
  },
  setup(props) {
    const store = useStore(); // Access Vuex store

    // Retrieve reviews for the given productId
    const reviews = computed(() => store.getters.productReviews(props.productId) || []);
    
    // New review object, initially empty
    const newReview = ref({
      id: null, // ID for review, used when editing
      username: '', // Name of the reviewer
      comment: '', // Comment content
      rating: '', // Rating value
    });

    const loggedIn = computed(() => store.state.isLoggedIn); // Check if user is logged in
    const currentUsername = computed(() => store.state.username); // Get the current logged-in username
    const sortOption = ref('date'); // Default sorting by date
    const editMode = ref(false); // Toggle edit mode for reviews

    // Sorted reviews based on selected option (date or rating)
    const sortedReviews = computed(() => {
      return reviews.value.slice().sort((a, b) => {
        if (sortOption.value === 'rating') {
          return b.rating - a.rating; // Sort by rating in descending order
        } else {
          return new Date(b.date) - new Date(a.date); // Sort by date in descending order
        }
      });
    });

    // Function to handle review submission
    const submitReview = () => {
      const review = {
        ...newReview.value, // Spread operator to copy newReview object
        date: new Date().toISOString(), // Add current date to the review
      };

      if (editMode.value) {
        // If in edit mode, dispatch updateReview action
        store.dispatch('updateReview', { productId: props.productId, review });
        editMode.value = false; // Exit edit mode after updating
      } else {
        // Otherwise, submit a new review
        store.dispatch('submitReview', { productId: props.productId, review });
      }

      // Reset the review form fields after submission or update
      newReview.value = { id: null, username: '', comment: '', rating: '' };
    };

    // Format the date to a more readable format
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    };

    // Get the textual representation of rating
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

    // Function to handle editing of a review
    const editReview = (review) => {
      newReview.value = { ...review }; // Populate form with existing review data
      editMode.value = true; // Enable edit mode
    };

    // Function to handle deletion of a review
    const deleteReview = (reviewId) => {
      store.dispatch('deleteReview', { productId: props.productId, reviewId });
    };

    // Watch for changes in productId prop and fetch reviews when it changes
    watch(() => props.productId, () => {
      store.dispatch('fetchReviews', props.productId);
    });

    // Fetch reviews when the component is mounted
    onMounted(() => {
      store.dispatch('fetchReviews', props.productId);
    });

    return {
      reviews,
      sortedReviews,
      newReview,
      loggedIn,
      currentUsername,
      sortOption,
      submitReview,
      editMode,
      editReview,
      deleteReview,
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

/* Styles for the Heading */
h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

/* Styles for Sorting Options */
.sorting-options {
  margin-bottom: 15px;
}

/* Styles for Each Review Item */
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

/* Styles for Edit/Delete Actions */
.review-actions {
  margin-top: 10px;
}

.review-actions button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
}

.review-actions button:hover {
  background-color: #0056b3;
}

/* Styles for the Review Submission Form */
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
