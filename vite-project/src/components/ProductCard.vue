<template>
  <div class="product-card p-4 border rounded-lg  hover:shadow-xl transition-shadow duration-300">
    <img
      :src="product.image"
      :alt="product.title"
      class="product-image w-full h-48 object-contain mb-4 rounded"
    />
    <div class="product-info">
      <h2 class="product-title text-lg font-semibold mb-2">
        {{ product.title }}
      </h2>
      <p class="product-price text-gray-600 mb-2">
        ${{ product.price }}
      </p>
      <p class="product-category text-gray-500 text-sm mb-2">
        {{ product.category }}
      </p>
      <div class="flex items-center justify-between">
        <button
          @click="navigateToProduct(product)"
          class="view-details-button bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          View Details
        </button>
        <button
          @click="toggleFavorite(product)"
          class="favorite-button"
          type="button"
        >
          <svg
            :class="{ 'text-red-500': isFavorite }"
            class="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
        <button
          class="compare-button bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          @click="handleAddToComparison"
        >
          {{ buttonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

/**
 * ProductCard component displays individual product details in a card format.
 * 
 * @component
 * @example
 * <ProductCard :product="product" />
 * 
 * @prop {Object} product - The product object to be displayed.
 * @prop {string} product.id - The unique identifier of the product.
 * @prop {string} product.title - The title of the product.
 * @prop {string} product.image - The URL of the product's image.
 * @prop {number} product.price - The price of the product.
 * @prop {string} product.category - The category of the product.
 */
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const isFavorite = ref(false);
    const buttonText = ref('Add to Compare');

    /**
     * Navigates to the detailed view of the product.
     */
    const navigateToProduct = (product) => {
      router.push(`/product/${product.id}`);
    };

    /**
     * Toggles the favorite state of the product.
     */
    const toggleFavorite = (product) => {
      isFavorite.value = !isFavorite.value;
      handleAddToWishList(product);
    };

    /**
     * Handles adding the product to the wishlist.
     */
    const handleAddToWishList = (product) => {
      store.dispatch('addToWishlist', {
        productId: product.id,
        productPrice: product.price,
        productQuantity: 1,
        productTitle: product.title,
        productImage: product.image,
      });
    };

    /**
     * Handles adding the product to the comparison list.
     */
    const handleAddToComparison = () => {
      store.dispatch('addToComparison', {
        productId: props.product.id,
        productPrice: props.product.price,
        productQuantity: 1,
        productTitle: props.product.title,
        productImage: props.product.image,
      });
      buttonText.value = 'Added';
      setTimeout(() => {
        buttonText.value = 'Add to Comparison';
      }, 900);
    };

    return {
      navigateToProduct,
      toggleFavorite,
      handleAddToComparison,
      isFavorite,
      buttonText,
    };
  },
}
</script>


<style scoped>
/**
 * Styles for the ProductCard component.
 */
.product-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  background-color: #b0eeff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  cursor: pointer;
  height: 100%;
}

.product-card:hover {
  transform: scale(1.05);
}

.product-image {
  width: 100%;
  height: 192px; /* Match h-48 from Tailwind (12rem) */
  object-fit: contain;
  border-radius: 8px 8px 0 0;
}

.product-info {
  text-align: center;
  width: 100%;
}

.product-title {
  font-size: 1.2rem;
  margin: 0.5rem 0;
}

.product-price {
  color: #2c3e50;
  font-weight: bold;
  margin-bottom: 1rem;
}

.view-details-button,
.favorite-button,
.compare-button {
  font-size: 0.875rem; /* Slightly smaller font size */
  padding: 0.375rem 0.75rem; /* Reduced padding for a more compact button */
  border-radius: 4px; /* Slightly smaller border radius */
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  margin: 0.25rem; /* Space between buttons */
}

.view-details-button {
  background-color: #007bff;
  color: white;
}

.view-details-button:hover {
  background-color: #0056b3;
}

.favorite-button {
  background: none;
  color: #333;
  transition: color 0.2s;
}

.favorite-button svg {
  width: 20px; /* Smaller icon size */
  height: 20px;
  transition: color 0.2s;
}

.compare-button {
  background-color: #48bb78;
  color: white;
}

.compare-button:hover {
  background-color: #38a169;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}
</style>

