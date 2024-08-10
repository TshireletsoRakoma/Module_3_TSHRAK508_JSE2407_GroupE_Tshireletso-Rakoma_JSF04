import { createRouter, createWebHistory } from "vue-router";
import ProductList from "./components/ProductList.vue";
import ProductDetails from "./components/ProductDetail.vue";
import Login from "./components/Login.vue";

const routes = [
  { path: "/", name: "ProductList", component: ProductList },
  { path: "/product/:id", name: "ProductDetails", component: ProductDetails },
  { path: "/login", name: "Login", component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("jwt");
  if (to.name !== "Login" && !isAuthenticated) {
    next({ name: "Login", query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;
