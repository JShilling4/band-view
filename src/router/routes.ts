// import Dashboard from "@/views/DashboardView.vue";
import NotFound from "@/views/NotFound.vue";
import { RouteRecordRaw } from "vue-router";
import { RouteNames, RoutePath } from "@/types";

export const routes: Array<RouteRecordRaw> = [
  {
    path: RoutePath.Dashboard,
    name: RouteNames.Dashboard,
    // component: Dashboard,
    // props: { pageTitle: "Dashboard" },
    redirect: { name: RouteNames.Rehearsal },
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: RoutePath.Songs,
    name: RouteNames.Songs,
    component: () => import("@/views/SongView.vue"),
    props: (route) => {
      return { pageTitle: "Songs", status: route.query.status };
    },
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: RoutePath.Setlists,
    name: RouteNames.Setlists,
    component: () => import("@/views/SetlistView.vue"),
    props: (route) => {
      return { pageTitle: "Setlists", name: route.query.name };
    },
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: RoutePath.Settings,
    name: RouteNames.Settings,
    component: () => import("@/views/SettingsView.vue"),
    props: { pageTitle: "Settings" },
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: RoutePath.Rehearsal,
    name: RouteNames.Rehearsal,
    component: () => import("@/views/RehearsalView.vue"),
    props: { pageTitle: "Rehearsal" },
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: RoutePath.Shows,
    name: RouteNames.Shows,
    component: () => import("@/views/ShowView.vue"),
    props: (route) => {
      return { pageTitle: "Shows", range: route.query.range };
    },
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: RoutePath.Venues,
    name: RouteNames.Venues,
    component: () => import("@/views/VenueView.vue"),
    props: () => {
      return { pageTitle: "Venues" };
    },
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: RoutePath.CMS,
    name: RouteNames.Cms,
    component: () => import("@/views/WebsiteCms.vue"),
    props: () => {
      return { pageTitle: "CMS" };
    },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];
