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
import Checkout from './components/Checkout.vue'; // Make sure the path and name match

const routes = [
  { path: '/', name: 'ProductList', component: ProductList }, // Main page
  { path: '/login', name: 'Login', component: Login },
  { path: '/product/:id', name: 'ProductDetails', component: ProductDetails },
  { path: '/cart', name: 'Cart', component: Cart, meta: { requiresAuth: true } }, // Protected route
  { path: '/wishlist', name: 'WishList', component: WishList, meta: { requiresAuth: true } }, // Protected route
  { path: '/star-rating', name: 'StarRating', component: StarRating },
  { path: '/reviews', name: 'Reviews', component: Reviews },
  { path: '/reviews/:id', name: 'ReviewDetails', component: Reviews },
  { path: '/comparison', name: 'Comparison', component: Comparison, meta: { requiresAuth: true } }, // Protected route
  { path: '/checkout', name: 'Checkout', component: Checkout, meta: { requiresAuth: true } }, // Updated route path
  { path: '/:catchAll(.*)', redirect: '/' }, // Redirect to main page for undefined paths
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.isLoggedIn; // Vuex state

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'Login', query: { redirect: to.fullPath } });
  } else {
    next(); // Proceed to the route
  }
});

export default router;
