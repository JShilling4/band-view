import { IconClasses, NavItem } from "@/core/models";
import { ROUTE_NAMES, ROUTE_PATHS } from "@/router";

const navigationConfig: NavItem[] = [
  {
    routeName: ROUTE_NAMES.Dashboard,
    label: ROUTE_NAMES.Dashboard,
    routePath: ROUTE_PATHS.Dashboard,
    link: null,
    icon: {
      classes: [...IconClasses.Dashboard],
      color: "yellow-6",
    },
    requiresAuth: false,
    requiredRoles: [],
  },
  {
    routeName: ROUTE_NAMES.Rehearsal,
    label: ROUTE_NAMES.Rehearsal,
    routePath: ROUTE_PATHS.Rehearsal,
    link: null,
    icon: {
      classes: [...IconClasses.Rehearsal],
      color: "green-5",
    },
    requiresAuth: false,
    requiredRoles: [],
  },
  {
    routeName: ROUTE_NAMES.Songs,
    label: ROUTE_NAMES.Songs,
    routePath: ROUTE_PATHS.Songs,
    link: null,
    icon: {
      classes: [...IconClasses.Music],
      color: "blue-5",
    },
    requiresAuth: false,
    requiredRoles: [],
  },
  {
    routeName: ROUTE_NAMES.Setlists,
    label: ROUTE_NAMES.Setlists,
    routePath: ROUTE_PATHS.Setlists,
    link: null,
    icon: {
      classes: [...IconClasses.Paste],
      color: "purple-4",
    },
    requiresAuth: false,
    requiredRoles: [],
  },
  {
    routeName: ROUTE_NAMES.Shows,
    label: ROUTE_NAMES.Shows,
    routePath: ROUTE_PATHS.Shows,
    link: null,
    icon: {
      classes: [...IconClasses.Calendar],
      color: "teal-4",
    },
    requiresAuth: false,
    requiredRoles: [],
  },
  {
    routeName: ROUTE_NAMES.Venues,
    label: ROUTE_NAMES.Venues,
    routePath: ROUTE_PATHS.Venues,
    link: null,
    icon: {
      classes: [...IconClasses.Landmark],
      color: "red-4",
    },
    requiresAuth: false,
    requiredRoles: [],
  },
  {
    routeName: ROUTE_NAMES.CMS,
    label: ROUTE_NAMES.CMS,
    routePath: ROUTE_PATHS.CMS,
    link: null,
    icon: {
      classes: [...IconClasses.Globe],
      color: "orange-6",
    },
    requiresAuth: true,
    requiredRoles: ["admin"],
  },
];

export default navigationConfig;
