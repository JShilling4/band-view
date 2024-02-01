export enum RouteNames {
  Dashboard = "Dashboard",
  Songs = "Songs",
  Sets = "Sets",
  Setlists = "Setlists",
  Settings = "Settings",
  Rehearsal = "Rehearsal",
}

export const RoutePath: { [key in RouteNames]: string } = {
  [RouteNames.Dashboard]: "/",
  [RouteNames.Songs]: "/songs",
  [RouteNames.Sets]: "/sets",
  [RouteNames.Setlists]: "/setlists",
  [RouteNames.Settings]: "/settings",
  [RouteNames.Rehearsal]: "/rehearsal",
};
