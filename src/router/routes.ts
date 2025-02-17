import NotFound from "@/views/NotFound.vue";
import { RouteRecordRaw } from "vue-router";
import { RouteNames, RoutePath } from "@/types";

const publicRoutes: Array<RouteRecordRaw> = [
  {
    path: RoutePath.Dashboard,
    name: RouteNames.Dashboard,
    component: () => import("@/views/DashboardView.vue"),
    meta: {
      requiresAuth: false,
      title: "Dashboard",
    },
  },
];

const contentRoutes: Array<RouteRecordRaw> = [
  {
    path: RoutePath.Songs,
    name: RouteNames.Songs,
    component: () => import("@/views/SongView.vue"),
    props: (route) => ({
      pageTitle: "Songs",
      status: route.query.status,
    }),
    meta: {
      requiresAuth: false,
      title: "Songs",
    },
  },
  {
    path: RoutePath.Setlists,
    name: RouteNames.Setlists,
    component: () => import("@/views/SetlistView.vue"),
    props: (route) => ({
      pageTitle: "Setlists",
      name: route.query.name,
    }),
    meta: {
      requiresAuth: false,
      title: "Setlists",
    },
  },
  {
    path: RoutePath.Shows,
    name: RouteNames.Shows,
    component: () => import("@/views/ShowView.vue"),
    props: (route) => ({
      pageTitle: "Shows",
      range: route.query.range,
    }),
    meta: {
      requiresAuth: false,
      title: "Shows",
    },
  },
  {
    path: RoutePath.Venues,
    name: RouteNames.Venues,
    component: () => import("@/views/VenueView.vue"),
    props: () => ({ pageTitle: "Venues" }),
    meta: {
      requiresAuth: false,
      title: "Venues",
    },
  },
  {
    path: RoutePath.Rehearsal,
    name: RouteNames.Rehearsal,
    component: () => import("@/views/RehearsalView.vue"),
    props: { pageTitle: "Rehearsal" },
    meta: {
      requiresAuth: false,
      title: "Rehearsal",
    },
  },
];

const adminRoutes: Array<RouteRecordRaw> = [
  {
    path: RoutePath.Settings,
    name: RouteNames.Settings,
    component: () => import("@/views/SettingsView.vue"),
    props: { pageTitle: "Settings" },
    meta: {
      requiresAuth: false,
      title: "Settings",
    },
  },
  {
    path: RoutePath.CMS,
    name: RouteNames.Cms,
    component: () => import("@/views/WebsiteCms.vue"),
    props: () => ({ pageTitle: "CMS" }),
    meta: {
      requiresAuth: true,
      title: "CMS",
    },
  },
];

// Combine all routes
export const routes: Array<RouteRecordRaw> = [
  ...publicRoutes,
  ...contentRoutes,
  ...adminRoutes,
  {
    path: RoutePath.NotFound,
    name: RouteNames.NotFound,
    component: NotFound,
    meta: {
      title: "Page Not Found",
    },
  },
];
