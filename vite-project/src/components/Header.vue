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

        <!-- User actions -->
        <div v-if="isLoggedIn">
          <span class="text-white mr-4">Welcome, {{ username }}</span>
          <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
        </div>
        <div v-else>
          <router-link to="/login">
            <button class="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
          </router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { useRouter } from "vue-router";
import { ref, computed } from "vue";

export default {
  name: "Header",
  setup() {
    const router = useRouter();
    const isLoggedIn = ref(!!localStorage.getItem('jwt'));
    const username = ref(localStorage.getItem('username') || '');

    const handleClick = () => {
      const sorting = localStorage.getItem('sorting') || 'default';
      const filterItem = localStorage.getItem('filterItem') || 'All categories';

      localStorage.setItem('previousPageState', JSON.stringify({ sorting, filterItem }));
    };

    const logout = () => {
      localStorage.removeItem('jwt');
      localStorage.removeItem('username');
      isLoggedIn.value = false;
      username.value = '';
      router.push('/');
    };

    return {
      isLoggedIn,
      username,
      handleClick,
      logout,
    };
  },
};
</script>

<style scoped>
/* Add any scoped styles for this component here */
</style>
