export enum IconNames {
  Calendar = "Calendar",
  Dashboard = "Dashboard",
  File = "File",
  Handle = "Handle",
  Landmark = "Landmark",
  Music = "Music",
  Paste = "Paste",
  Rehearsal = "Rehearsal",
  User = "User",
  YouTube = "YouTube",
}

export const IconClasses: { [key in IconNames]: string[] } = {
  [IconNames.Calendar]: ["fa-solid", "fa-calendar-days"],
  [IconNames.Dashboard]: ["fa-solid", "fa-grip"],
  [IconNames.File]: ["fa-solid", "fa-file"],
  [IconNames.Handle]: ["fa-solid", "fa-grip-lines"],
  [IconNames.Landmark]: ["fa-solid", "fa-landmark"],
  [IconNames.Music]: ["fa-solid", "fa-music"],
  [IconNames.Paste]: ["fa-solid", "fa-paste"],
  [IconNames.Rehearsal]: ["fa-solid", "fa-registered"],
  [IconNames.User]: ["fa-solid fa-user"],
  [IconNames.YouTube]: ["fa-brands fa-youtube"],
};

export interface AppIcon {
  classes: string[];
  color: string;
}
