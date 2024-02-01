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
      classes: [...IconClasses.R],
      color: "green-5",
    },
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
  },
  {
    routeName: RouteNames.Sets,
    label: RouteNames.Sets,
    routePath: RoutePath.Sets,
    link: null,
    icon: {
      classes: [...IconClasses.File],
      color: "orange-5",
    },
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
  },
  {
    routeName: null,
    label: "Calendar",
    routePath: null,
    link: {
      href: "http://www.steelerailband.com/shows",
      target: "_blank",
    },
    icon: {
      classes: [...IconClasses.Calendar],
      color: "teal-4",
    },
  },
];

export default navigationConfig;
