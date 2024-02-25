enum RouteNames {
  Dashboard = "Dashboard",
  Songs = "Songs",
  Sets = "Sets",
  Setlists = "Setlists",
  Settings = "Settings",
  Rehearsal = "Rehearsal",
  Shows = "Shows",
  Venues = "Venues",
}

const RoutePath: { [key in RouteNames]: string } = {
  [RouteNames.Dashboard]: "/",
  [RouteNames.Songs]: "/songs",
  [RouteNames.Sets]: "/sets",
  [RouteNames.Setlists]: "/setlists",
  [RouteNames.Settings]: "/settings",
  [RouteNames.Rehearsal]: "/rehearsal",
  [RouteNames.Shows]: "/shows",
  [RouteNames.Venues]: "/venues",
};

export { RouteNames, RoutePath };
