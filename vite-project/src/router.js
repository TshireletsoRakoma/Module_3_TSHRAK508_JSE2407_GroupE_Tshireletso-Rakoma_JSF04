import { createRouter, createWebHistory } from 'vue-router';
import store from './store'; // Import your Vuex store
import ProductList from './components/ProductList.vue';
import ProductDetails from './components/ProductDetail.vue';
import Login from './components/Login.vue';
import Cart from './pages/Cart.vue';
import WishList from './components/WishList2.vue';
import StarRating from './components/StarRating.vue';
import Reviews from './components/Reviews.vue';
import Comparison from './components/Comparison.vue';

const routes = [
  { path: '/', name: 'ProductList', component: ProductList },
  { path: '/product/:id', name: 'ProductDetails', component: ProductDetails },
  { path: '/login', name: 'Login', component: Login },
  { path: '/cart', name: 'Cart', component: Cart, meta: { requiresAuth: true } }, // Protected route
  { path: '/wishlist', name: 'WishList', component: WishList, meta: { requiresAuth: true } }, // Protected route
  { path: '/star-rating', name: 'StarRating', component: StarRating },
  { path: '/reviews', name: 'Reviews', component: Reviews },
  { path: '/reviews/:id', name: 'ReviewDetails', component: Reviews },
  {
    path: '/comparison',
    name: 'Comparison',
    component: Comparison,
    meta: { requiresAuth: true }, // Protected route
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.isLoggedIn; // Use Vuex state

  console.log('Navigating to:', to.fullPath);
  console.log('Is authenticated:', isAuthenticated);

  // Redirect to login if the route requires authentication and the user is not authenticated
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'Login', query: { redirect: to.fullPath } });
  } else {
    next(); // Proceed to the route
  }
});

export default router;
