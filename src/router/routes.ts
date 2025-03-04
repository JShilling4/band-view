import NotFound from "@/views/NotFound.vue";
import { RouteRecordRaw } from "vue-router";
import { ROUTE_NAMES, ROUTE_PATHS } from "./types";

const publicRoutes: Array<RouteRecordRaw> = [
  {
    path: ROUTE_PATHS.Dashboard,
    name: ROUTE_NAMES.Dashboard,
    component: () => import("@/modules/dashboard/views/DashboardView.vue"),
    props: () => ({
      pageTitle: "Dashboard",
    }),
    meta: {
      requiresAuth: false,
      title: "Dashboard",
    },
  },
];

const contentRoutes: Array<RouteRecordRaw> = [
  {
    path: ROUTE_PATHS.Songs,
    name: ROUTE_NAMES.Songs,
    component: () => import("@/modules/song/views/SongView.vue"),
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
    path: ROUTE_PATHS.Setlists,
    name: ROUTE_NAMES.Setlists,
    component: () => import("@/modules/setlist/views/SetlistView.vue"),
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
    path: ROUTE_PATHS.Shows,
    name: ROUTE_NAMES.Shows,
    component: () => import("@/modules/show/views/ShowView.vue"),
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
    path: ROUTE_PATHS.Venues,
    name: ROUTE_NAMES.Venues,
    component: () => import("@/modules/venue/views/VenueView.vue"),
    props: () => ({ pageTitle: "Venues" }),
    meta: {
      requiresAuth: false,
      title: "Venues",
    },
  },
  {
    path: ROUTE_PATHS.Rehearsal,
    name: ROUTE_NAMES.Rehearsal,
    component: () => import("@/modules/rehearsal/views/RehearsalView.vue"),
    props: { pageTitle: "Rehearsal" },
    meta: {
      requiresAuth: false,
      title: "Rehearsal",
    },
  },
];

const adminRoutes: Array<RouteRecordRaw> = [
  {
    path: ROUTE_PATHS.Settings,
    name: ROUTE_NAMES.Settings,
    component: () => import("@/views/SettingsView.vue"),
    props: { pageTitle: "Settings" },
    meta: {
      requiresAuth: false,
      title: "Settings",
    },
  },
  {
    path: ROUTE_PATHS.CMS,
    name: ROUTE_NAMES.CMS,
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
    path: ROUTE_PATHS.NotFound,
    name: ROUTE_NAMES.NotFound,
    component: NotFound,
    meta: {
      title: "Page Not Found",
    },
  },
];
