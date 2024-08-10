<template>
  <div class="p-6">
    <div class="controls mb-4 flex flex-wrap gap-4">
      <!-- Sorting Dropdown -->
      <select
        v-model="sorting"
        class="control-item p-2 border rounded"
        @change="saveStateToLocalStorage"
      >
        <option value="default">Default</option>
        <option value="low">Price: Low to High</option>
        <option value="high">Price: High to Low</option>
      </select>

      <!-- Search Input -->
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Search products..."
        class="control-item p-2 border rounded flex-1"
        @input="saveStateToLocalStorage"
      />

      <!-- Categories Dropdown -->
      <select
        v-model="filterItem"
        class="control-item p-2 border rounded"
        @change="saveStateToLocalStorage"
      >
        <option value="All categories">All categories</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
    </div>

    <!-- Display Loading, Error, or Products -->
    <div v-if="loading">
      <p>Loading...</p>
    </div>
    <div v-else-if="error">
      <p class="text-red-500">{{ error }}</p>
    </div>
    <div v-else-if="filteredProducts.length === 0">
      <p>No products available.</p>
    </div>
    <div v-else class="grid-container">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import ProductCard from "./ProductCard.vue";

/**
 * ProductList component displays a list of products with search, sorting, and filtering options.
 *
 * @component
 * @example
 * <ProductList />
 *
 * @returns {Object} - Contains reactive properties, computed properties, and methods for the component.
 * @returns {Ref<Array>} products - The list of products fetched from the API.
 * @returns {Ref<boolean>} loading - A boolean indicating whether the products are loading.
 * @returns {Ref<string|null>} error - The error message if the data fetching fails.
 * @returns {Ref<Array>} categories - The list of unique product categories.
 * @returns {Ref<string>} searchTerm - The current search term used to filter products.
 * @returns {Ref<string>} sorting - The current sorting option for the products.
 * @returns {Ref<string>} filterItem - The current category filter applied to the products.
 * @returns {ComputedRef<Array>} filteredProducts - The filtered and sorted list of products based on search, sorting, and category filter.
 * @returns {Function} saveStateToLocalStorage - Saves the current state (search term, sorting, and filter) to local storage.
 */
export default {
  name: "ProductList",
  components: {
    ProductCard,
  },
  setup() {
    // Reactive properties
    const products = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const categories = ref([]);
    const searchTerm = ref(localStorage.getItem("searchTerm") || "");
    const sorting = ref(localStorage.getItem("sorting") || "default");
    const filterItem = ref(localStorage.getItem("filterItem") || "All categories");

    /**
     * Fetches product data from the API and updates the reactive properties.
     *
     * @returns {Promise<void>} - A promise that resolves when the products are fetched.
     */
    const fetchProducts = async () => {
      loading.value = true;
      error.value = null;
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        products.value = data;
        const uniqueCategories = [...new Set(data.map((product) => product.category))];
        categories.value = uniqueCategories;
      } catch (err) {
        error.value = err.message;
      } finally {
        loading.value = false;
      }
    };

    /**
     * Filters and sorts the list of products based on search term, sorting option, and category filter.
     *
     * @returns {Array} - The filtered and sorted list of products.
     */
    const filteredProducts = computed(() => {
      let filtered = products.value.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.value.toLowerCase()) &&
          (filterItem.value === "All categories" || product.category === filterItem.value)
      );

      if (sorting.value === "low") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sorting.value === "high") {
        filtered.sort((a, b) => b.price - a.price);
      }

      return filtered;
    });

    /**
     * Saves the current state (search term, sorting, and filter) to local storage.
     */
    const saveStateToLocalStorage = () => {
      localStorage.setItem("searchTerm", searchTerm.value);
      localStorage.setItem("sorting", sorting.value);
      localStorage.setItem("filterItem", filterItem.value);
    };

    // Fetch products when component is mounted
    onMounted(() => {
      fetchProducts();
    });

    // Expose reactive data and computed properties to the template
    return {
      products,
      loading,
      error,
      categories,
      searchTerm,
      sorting,
      filterItem,
      filteredProducts,
      saveStateToLocalStorage,
    };
  },
};
</script>

<style scoped>
/**
 * Styles for the ProductList component.
 */
.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.control-item {
  flex: 1;
  min-width: 150px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .controls {
    flex-wrap: nowrap;
  }

  .control-item {
    flex: none;
    width: auto;
  }
}
</style>
