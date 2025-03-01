export const ROUTE_NAMES = {
  Dashboard: "Dashboard",
  Songs: "Songs",
  Sets: "Sets",
  Setlists: "Setlists",
  Settings: "Settings",
  Rehearsal: "Rehearsal",
  Shows: "Shows",
  Venues: "Venues",
  CMS: "CMS",
  NotFound: "NotFound",
} as const;

type RouteNameKey = keyof typeof ROUTE_NAMES;
export type RouteName = (typeof ROUTE_NAMES)[RouteNameKey];

export const ROUTE_PATHS = {
  [ROUTE_NAMES.Dashboard]: "/",
  [ROUTE_NAMES.Songs]: "/songs",
  [ROUTE_NAMES.Sets]: "/sets",
  [ROUTE_NAMES.Setlists]: "/setlists",
  [ROUTE_NAMES.Settings]: "/settings",
  [ROUTE_NAMES.Rehearsal]: "/rehearsal",
  [ROUTE_NAMES.Shows]: "/shows",
  [ROUTE_NAMES.Venues]: "/venues",
  [ROUTE_NAMES.CMS]: "/cms",
  [ROUTE_NAMES.NotFound]: "/:pathMatch(.*)*",
} as const satisfies Record<RouteNameKey, string>;

type RoutePathKey = keyof typeof ROUTE_PATHS;
export type RoutePath = (typeof ROUTE_PATHS)[RoutePathKey];
