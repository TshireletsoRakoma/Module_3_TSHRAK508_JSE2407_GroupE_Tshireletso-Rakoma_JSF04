<template>
  <header class="sticky z-50 top-0">
    <nav class="bg-gray-500 border-gray-200">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <!-- Link to the home page with state preservation -->
        <router-link to="/" @click.native="handleClick">
          <button class="flex items-center space-x-3 rtl:space-x-reverse">
            <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">SwiftCart</span>
          </button>
        </router-link>

        <!-- Mobile menu button -->
        <button
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",

  methods: {
    /**
     * Handle the click event on the "SwiftCart" button.
     * 
     * This method saves the current sorting and filter states to localStorage
     * before navigating to the home page.
     */
    handleClick() {
      const sorting = localStorage.getItem('sorting') || 'default';
      const filterItem = localStorage.getItem('filterItem') || 'All categories';

      localStorage.setItem('previousPageState', JSON.stringify({ sorting, filterItem }));
    },
  },
};
</script>

<style scoped>
/* You can add any scoped styles for this component here */
</style>
