export enum IconNames {
  Dashboard = "Dashboard",
  Music = "Music",
  File = "File",
  Paste = "Paste",
  Register = "R",
  Calendar = "Calendar",
  Landmark = "Landmark",
}

export const IconClasses: { [key in IconNames]: string[] } = {
  [IconNames.Dashboard]: ["fa-solid", "fa-grip"],
  [IconNames.Music]: ["fa-solid", "fa-music"],
  [IconNames.File]: ["fa-solid", "fa-file"],
  [IconNames.Paste]: ["fa-solid", "fa-paste"],
  [IconNames.Register]: ["fa-solid", "fa-registered"],
  [IconNames.Calendar]: ["fa-solid", "fa-calendar-days"],
  [IconNames.Landmark]: ["fa-solid", "fa-landmark"],
};

export interface AppIcon {
  classes: string[];
  color: string;
}
