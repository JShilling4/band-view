import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Dashboard from "@/views/DashboardView.vue";
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
    component: () => import("@/views/SongsView.vue"),
    props: (route) => {
      return { pageTitle: "Songs", status: route.query.status };
    },
  },
  {
    path: "/sets",
    name: "Sets",
    component: () => import("@/views/SetsView.vue"),
    props: (route) => {
      return { pageTitle: "Sets", name: route.query.name };
    },
  },
  {
    path: "/setlists",
    name: "Setlists",
    component: () => import("@/views/SetlistsView.vue"),
    props: (route) => {
      return { pageTitle: "Setlists", name: route.query.name };
    },
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("@/views/SettingsView.vue"),
    props: { pageTitle: "Settings" },
  },
  {
    path: "/rehearsal",
    name: "Rehearsal",
    component: () => import("@/views/RehearsalView.vue"),
    props: { pageTitle: "Rehearsal" },
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
