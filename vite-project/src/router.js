// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import ProductList from './components/ProductList.vue';
import ProductDetails from './components/ProductDetail.vue';
import Login from './components/Login.vue';
import Cart from './pages/Cart.vue';
import WishList from './components/WishList2.vue';
import StarRating from './components/StarRating.vue';
import Reviews from './components/Reviews.vue';

const routes = [
  { path: '/', name: 'ProductList', component: ProductList },
  { path: '/product/:id', name: 'ProductDetails', component: ProductDetails },
  { path: '/login', name: 'Login', component: Login },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/wishlist', name: 'WishList', component: WishList },
  { path: '/star-rating', name: 'StarRating', component: StarRating },
  { path: '/reviews', name: 'Reviews', component: Reviews },
  { path: '/reviews/:id', name: 'ReviewDetails', component: Reviews },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('jwt');
  if (to.name !== 'Login' && !isAuthenticated) {
    next({ name: 'Login', query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;
