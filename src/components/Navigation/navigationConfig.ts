import { IconClasses, NavItem, RouteNames, RoutePath } from "@/types";

const navigationConfig: NavItem[] = [
  // {
  //   routeName: RouteNames.Dashboard,
  //   label: RouteNames.Dashboard,
  //   routePath: RoutePath.Dashboard,
  //   link: null,
  //   icon: {
  //     classes: [...IconClasses.Dashboard],
  //     color: "red-6",
  //   },
  // },
  {
    routeName: RouteNames.Rehearsal,
    label: RouteNames.Rehearsal,
    routePath: RoutePath.Rehearsal,
    link: null,
    icon: {
      classes: [...IconClasses.Rehearsal],
      color: "green-5",
    },
    requiresAuth: false,
    requiredRoles: [],
  },
  {
    routeName: RouteNames.Songs,
    label: RouteNames.Songs,
    routePath: RoutePath.Songs,
    link: null,
    icon: {
      classes: [...IconClasses.Music],
      color: "blue-5",
    },
    requiresAuth: false,
    requiredRoles: [],
  },
  {
    routeName: RouteNames.Setlists,
    label: RouteNames.Setlists,
    routePath: RoutePath.Setlists,
    link: null,
    icon: {
      classes: [...IconClasses.Paste],
      color: "purple-4",
    },
    requiresAuth: false,
    requiredRoles: [],
  },
  {
    routeName: RouteNames.Shows,
    label: RouteNames.Shows,
    routePath: RoutePath.Shows,
    link: null,
    icon: {
      classes: [...IconClasses.Calendar],
      color: "teal-4",
    },
    requiresAuth: false,
    requiredRoles: [],
  },
  {
    routeName: RouteNames.Venues,
    label: RouteNames.Venues,
    routePath: RoutePath.Venues,
    link: null,
    icon: {
      classes: [...IconClasses.Landmark],
      color: "red-4",
    },
    requiresAuth: false,
    requiredRoles: [],
  },
  {
    routeName: RouteNames.Cms,
    label: RouteNames.Cms,
    routePath: RoutePath.CMS,
    link: null,
    icon: {
      classes: [...IconClasses.Globe],
      color: "orange-4",
    },
    requiresAuth: true,
    requiredRoles: ["admin"],
  },
];

export default navigationConfig;
