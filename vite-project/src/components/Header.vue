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
        <div v-if="isLoggedIn" class="flex items-center space-x-4">
          <transition name="fade-slide">
            <span
              v-if="showWelcomeMessage"
              class="welcome-message text-white"
              :style="{ animationPlayState: animationPaused ? 'paused' : 'running' }"
            >
              Welcome, {{ username }}
            </span>
          </transition>
          <span class="text-white">Items in Cart: {{ cartItemCount }}</span>
          <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
          <!-- CartButton component -->
          <CartButton />
          <!-- WishListButton component -->
          <WishListButton />
        </div>
        <div v-else class="flex items-center space-x-4">
          <router-link to="/login">
            <button class="bg-blue-500 text-white px-4 py-2 rounded">Logout</button>
          </router-link>
          <!-- CartButton component next to Login button -->
          <CartButton />
          <!-- WishListButton component -->
          <WishListButton />
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { useRouter } from 'vue-router';
import { computed, ref, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import WishListButton from './WishList2.vue'; // Fix the casing of the file name
import CartButton from './CartButton.vue';




export default {
  name: 'Header',
  components: {
    CartButton,
    WishListButton // Register WishListButton component
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    const isLoggedIn = computed(() => store.getters.isLoggedIn);
    const username = computed(() => store.getters.username);
    const cartItemCount = computed(() => store.getters.cartItemCount);
    const showWelcomeMessage = ref(false);
    const animationPaused = ref(true);

    const handleClick = () => {
      const sorting = localStorage.getItem('sorting') || 'default';
      const filterItem = localStorage.getItem('filterItem') || 'All categories';
      localStorage.setItem(
        'previousPageState',
        JSON.stringify({ sorting, filterItem })
      );
    };

    const logout = () => {
      store.dispatch('logout');
      showWelcomeMessage.value = false;
      router.push('/login');
    };

    const startAnimation = () => {
      showWelcomeMessage.value = true;
      animationPaused.value = false;
      setTimeout(() => {
        showWelcomeMessage.value = false;
      }, 3000);
    };

    onMounted(() => {
      if (isLoggedIn.value) {
        startAnimation();
      }
    });

    watch(() => store.getters.isLoggedIn, (newVal) => {
      if (newVal) {
        startAnimation();
      } else {
        showWelcomeMessage.value = false;
      }
    });

    return {
      isLoggedIn,
      username,
      cartItemCount,
      showWelcomeMessage,
      animationPaused,
      handleClick,
      logout,
    };
  },
};
</script>

<style scoped>
.welcome-message {
  display: inline-block;
  white-space: nowrap;
  padding: 0.5rem 1rem;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
}

@keyframes slideOut {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-100%);
    opacity: 0;
  }
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.5s;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
}

.welcome-message {
  animation: slideOut 3s forwards;
}
</style>
