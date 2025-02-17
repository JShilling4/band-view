import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/user.store";
import { RouteNames } from "@/types";
import { routes } from "./routes";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // Update page title
  document.title = `Band View - ${to.meta.title || ""}`;

  // Check auth requirements
  if (to.meta.requiresAuth) {
    const userStore = useUserStore();
    if (!userStore.isAuthenticated) {
      next({ name: RouteNames.Dashboard });
      return;
    }
  }

  next();
});

export default router;
