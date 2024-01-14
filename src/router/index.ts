import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
import NotFound from "@/views/NotFound.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/songs",
    name: "Songs",
    component: () => import("@/views/Songs.vue"),
  },
  {
    path: "/sets",
    name: "Sets",
    component: () => import("@/views/Sets.vue"),
  },
  {
    path: "/setlists",
    name: "Setlists",
    component: () => import("@/views/Setlists.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
