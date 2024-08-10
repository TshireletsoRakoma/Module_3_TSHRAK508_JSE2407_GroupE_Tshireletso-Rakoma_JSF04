<template>
  <div class="product-card p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
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
      <button
        @click="navigateToProduct"
        class="view-details-button bg-blue-500 text-white px-4 py-2 rounded"
      >
        View Details
      </button>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

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
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();

    /**
     * Navigates to the detailed view of the product.
     */
    const navigateToProduct = () => {
      router.push(`/product/${props.product.id}`);
    };

    return {
      navigateToProduct,
    };
  },
};
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

.view-details-button {
  margin-top: 0.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.view-details-button:hover {
  background-color: #0056b3;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}
</style>
