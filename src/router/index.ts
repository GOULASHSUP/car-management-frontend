import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Admin from "../views/Admin.vue";
import Auth from "../views/Auth.vue";
import CarDetails from "../views/CarDetails.vue";

const routes = [
  { path: "/", component: Home }, // Homepage - Lists All the Cars
  { path: "/admin", component: Admin, meta: { requiresAuth: true } }, // Admin - CRUD Cars (Requires Authentication)
  { path: "/auth", component: Auth }, // Login & Register (For the Admin to login or register)
  { path: "/cars/:id", component: CarDetails }, // Single Car Detail Page
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const token = localStorage.getItem("token");

  if (to.meta.requiresAuth && !token) {
    next("/auth");
  } else {
    next();
  }
});

export default router;