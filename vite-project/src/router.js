import { createRouter, createWebHistory } from "vue-router";
import ProductList from "./components/ProductList.vue";
import ProductDetails from "./components/ProductDetail.vue";
import Header from "./components/Header.vue"

const routes = [
  { path: "/", name: "ProductList", component: ProductList },
  { path: "/product/:id", name: "ProductDetails", component: ProductDetails },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
