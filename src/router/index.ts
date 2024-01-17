import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import NotFound from "@/views/NotFound.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    props: { pageTitle: "Dashboard" },
  },
  {
    path: "/songs",
    name: "Songs",
    component: () => import("@/views/Songs.vue"),
    props: (route) => {
      return { pageTitle: "Songs", status: route.query.status };
    },
  },
  {
    path: "/sets",
    name: "Sets",
    component: () => import("@/views/Sets.vue"),
    props: (route) => {
      return { pageTitle: "Sets", status: route.query.name };
    },
  },
  {
    path: "/setlists",
    name: "Setlists",
    component: () => import("@/views/Setlists.vue"),
    props: { pageTitle: "Setlists" },
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("@/views/Settings.vue"),
    props: { pageTitle: "Settings" },
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
