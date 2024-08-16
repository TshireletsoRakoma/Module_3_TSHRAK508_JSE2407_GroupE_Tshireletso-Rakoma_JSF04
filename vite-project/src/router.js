// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import ProductList from './components/ProductList.vue';
import ProductDetails from './components/ProductDetail.vue';
import Login from './components/Login.vue';
import Cart from '../src/pages/Cart.vue';
import WishList from './components/WishList2.vue';
import StarRating from './components/StarRating.vue';

const routes = [
  { path: '/', name: 'ProductList', component: ProductList },
  { path: '/product/:id', name: 'ProductDetails', component: ProductDetails },
  { path: '/login', name: 'Login', component: Login },
  { path: '/cart', name: 'Cart', component: Cart},
  { path: '/wishlist', name: 'WishList', component: WishList},
  {
  path: '/wishlist',
  component: () => import('./components/WishList2.vue')
},

{ path: '/StarRating', name: 'StarRating', component: StarRating}

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
