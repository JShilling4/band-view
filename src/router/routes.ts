import { RouteRecordRaw } from "vue-router";
// import Dashboard from "@/views/DashboardView.vue";
import NotFound from "@/views/NotFound.vue";
import { RouteNames, RoutePath } from "@/types";

export const routes: Array<RouteRecordRaw> = [
  {
    path: RoutePath.Dashboard,
    name: RouteNames.Dashboard,
    // component: Dashboard,
    // props: { pageTitle: "Dashboard" },
    redirect: { name: RouteNames.Rehearsal },
  },
  {
    path: RoutePath.Songs,
    name: RouteNames.Songs,
    component: () => import("@/views/SongsView.vue"),
    props: (route) => {
      return { pageTitle: "Songs", status: route.query.status };
    },
  },
  {
    path: RoutePath.Sets,
    name: RouteNames.Sets,
    component: () => import("@/views/SetsView.vue"),
    props: (route) => {
      return { pageTitle: "Sets", name: route.query.name };
    },
  },
  {
    path: RoutePath.Setlists,
    name: RouteNames.Setlists,
    component: () => import("@/views/SetlistsView.vue"),
    props: (route) => {
      return { pageTitle: "Setlists", name: route.query.name };
    },
  },
  {
    path: RoutePath.Settings,
    name: RouteNames.Settings,
    component: () => import("@/views/SettingsView.vue"),
    props: { pageTitle: "Settings" },
  },
  {
    path: RoutePath.Rehearsal,
    name: RouteNames.Rehearsal,
    component: () => import("@/views/RehearsalView.vue"),
    props: { pageTitle: "Rehearsal" },
  },
  {
    path: RoutePath.Shows,
    name: RouteNames.Shows,
    component: () => import("@/views/ShowView.vue"),
    props: (route) => {
      return { pageTitle: "Shows", range: route.query.range };
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];
