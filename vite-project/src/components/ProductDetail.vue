<template>
  <main class="product-detail-container">
    <!-- Spinner Container -->
    <div v-if="loading" class="spinner-overlay">
      <div class="spinner"></div>
    </div>

    <!-- Product Details -->
    <div v-else-if="error" class="text-red-500">Error: {{ error }}</div>
    <div v-else-if="product" class="product-detail">
      <img :src="product.image" :alt="product.title" class="product-image" />
      <h1 class="product-title">{{ product.title }}</h1>
      <p class="product-description">{{ product.description }}</p>
      <p class="product-price">${{ product.price }}</p>
      <p class="product-category">{{ product.category }}</p>

      <!-- Star Rating Component -->
      <StarRating
        :rating="product.rating.rate"
        :editable="true"
        @update:rating="updateRating"
      />

      <!-- Show Reviews Link -->
      <a href="#" @click.prevent="toggleReviews" class="show-reviews-link">
        {{ showReviews ? 'Hide Reviews' : 'Show Reviews' }}
      </a>

      <!-- Reviews Section -->
      <div v-if="showReviews" class="reviews-list">
        <Reviews :productId="product.id.toString()" />
      </div>

      

      <!-- Add to Cart Button -->
      <button class="add-to-cart-btn" @click="handleAddToCart">
        <img src="../assets/Add2.svg" alt="Add to Cart" class="cart-icon" />
        {{ buttonText }}
      </button>
    </div>
    <router-link to="/" class="back-link">Back to products</router-link>
  </main>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from 'vuex';
import StarRating from '../components/StarRating.vue';
import Reviews from '../components/Reviews.vue'; // Import Reviews component

export default {
  name: "ProductDetail",
  components: { StarRating, Reviews },
  setup() {
    const route = useRoute();
    const store = useStore();
    const id = route.params.id;

    const product = ref(null);
    const loading = ref(true);
    const error = ref(null);
    const buttonText = ref('Add to Cart');
    const currentReview = ref({
      name: '',
      comment: '',
      rating: 0,
    });
    const editingReview = ref(null); // Track the review being edited
    const loggedIn = ref(true); // Simulate logged-in status
    const showReviews = ref(false); // Manage visibility of reviews section

    const fetchProduct = async (id) => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) throw new Error("Data fetching failed");
        const data = await response.json();
        product.value = data;
        store.dispatch('fetchReviews', id); // Fetch reviews from Vuex store
      } catch (err) {
        error.value = err.message;
      } finally {
        loading.value = false;
      }
    };

    const handleAddToCart = () => {
      store.dispatch('addToCart', {
        productId: product.value.id,
        productPrice: product.value.price,
        productQuantity: 1,
        productTitle: product.value.title,
        productImage: product.value.image,
      });
      buttonText.value = 'Added';
      setTimeout(() => {
        buttonText.value = 'Add to Cart';
      }, 900);
    };

    const submitReview = () => {
      if (!currentReview.value.name || !currentReview.value.comment || !currentReview.value.rating) {
        alert('Please fill all fields');
        return;
      }

      const review = {
        ...currentReview.value,
        timestamp: new Date().toISOString(),
        isEditable: true,
      };

      // Store review in Vuex store
      store.dispatch('addReview', { productId: id, review });

      // Clear form fields
      currentReview.value = { name: '', comment: '', rating: 0 };
      editingReview.value = null;

      // Notify success
      alert('Review submitted successfully');
    };

    const updateExistingReview = () => {
      if (!currentReview.value.name || !currentReview.value.comment || !currentReview.value.rating) {
        alert('Please fill all fields');
        return;
      }

      const updatedReview = {
        ...editingReview.value,
        ...currentReview.value,
      };

      // Update review in Vuex store
      store.dispatch('updateReview', { productId: id, review: updatedReview });

      // Clear form fields
      currentReview.value = { name: '', comment: '', rating: 0 };
      editingReview.value = null;

      // Notify success
      alert('Review updated successfully');
    };

    const removeReview = (timestamp) => {
      store.dispatch('deleteReview', { productId: id, timestamp });
    };

    const editReview = (review) => {
      currentReview.value = { ...review };
      editingReview.value = review;
    };

    const toggleReviews = () => {
      showReviews.value = !showReviews.value;
    };

    const sortedReviews = computed(() => {
      return store.getters.productReviews(id).slice().sort((a, b) => b.rating - a.rating || new Date(b.timestamp) - new Date(a.timestamp)) || [];
    });

    const updateRating = (newRating) => {
      product.value.rating.rate = newRating;
      store.dispatch('addRating', { productId: id, rating: newRating });
    };

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    };

    onMounted(() => {
      fetchProduct(id);
    });

    return {
      product,
      loading,
      error,
      buttonText,
      currentReview,
      editingReview,
      loggedIn,
      showReviews,
      handleAddToCart,
      submitReview,
      updateExistingReview,
      removeReview,
      editReview,
      toggleReviews,
      sortedReviews,
      updateRating,
      formatDate,
    };
  },
};
</script>


<style scoped>
.product-detail-container {
  padding: 20px;
}

.spinner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #007bff;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.product-detail {
  text-align: center;
}

.product-image {
  max-width: 30%;
  height: auto;
}

.product-title {
  font-size: 24px;
  font-weight: bold;
}

.product-description {
  font-size: 16px;
  margin: 10px 0;
}

.product-price {
  font-size: 20px;
  color: #007bff;
}

.product-category {
  font-size: 14px;
  color: #666;
}

.add-to-cart-btn {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
}

.add-to-cart-btn .cart-icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.add-to-cart-btn:hover {
  background-color: #0056b3;
}

.review-form button.submit-btn {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Add box shadow */
  transition: background-color 0.3s, box-shadow 0.3s;
}

.review-form button.submit-btn:hover {
  background-color: #0056b3;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15); /* Darker shadow on hover */
}

.review-form {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center the form horizontally */
}

.review-form input, 
.review-form textarea {
  width: 100%;
  max-width: 350px; /* Set the same max-width for uniformity */
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.review-form .rating-input {
  margin: 10px 0;
}

.review-item {
  margin-bottom: 20px;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.review-author {
  font-weight: bold;
}

.review-comment {
  width: 100%;
  max-width: 350px; /* Set the same max-width as input fields */
  padding: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Add box shadow */
  margin: 10px 0; /* Add some margin to separate comments */
}


.back-link {
  display: inline-block;
  margin-top: 20px;
  color: #007bff;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}

.show-reviews-link {
  cursor: pointer;
  color: #007bff;
  text-decoration: underline;
  margin-top: 1em;
}

.reviews-list {
  margin-top: 1em;
}

.review-item {
  margin-bottom: 1em;
}

.review-form {
  margin-top: 2em;
}
</style>
