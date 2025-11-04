import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // Update page title
  document.title = `Band View - ${to.meta.title || ""}`;
  next();
});

export * from "./types";
export default router;
