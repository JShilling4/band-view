export enum IconNames {
  Dashboard = "Dashboard",
  Music = "Music",
  File = "File",
  Paste = "Paste",
  R = "R",
  Calendar = "Calendar",
}

export const IconClasses: { [key in IconNames]: string[] } = {
  [IconNames.Dashboard]: ["fa-solid", "fa-grip"],
  [IconNames.Music]: ["fa-solid", "fa-music"],
  [IconNames.File]: ["fa-solid", "fa-file"],
  [IconNames.Paste]: ["fa-solid", "fa-paste"],
  [IconNames.R]: ["fa-solid", "fa-registered"],
  [IconNames.Calendar]: ["fa-solid", "fa-calendar-days"],
};

export interface AppIcon {
  classes: string[];
  color: string;
}
