export enum IconNames {
  Calendar = "Calendar",
  Dashboard = "Dashboard",
  Download = "Download",
  Edit = "Edit",
  File = "File",
  Globe = "Globe",
  Handle = "Handle",
  Landmark = "Landmark",
  Music = "Music",
  Paste = "Paste",
  Rehearsal = "Rehearsal",
  Delete = "Delete",
  User = "User",
  YouTube = "YouTube",
}

export const IconClasses: { [key in IconNames]: string[] } = {
  [IconNames.Calendar]: ["fa-solid", "fa-calendar-days"],
  [IconNames.Dashboard]: ["fa-solid", "fa-grip"],
  [IconNames.Download]: ["fa-solid", "fa-download", "text-green-9"],
  [IconNames.Edit]: ["fa-solid", "fa-edit", "text-blue-5"],
  [IconNames.File]: ["fa-solid", "fa-file"],
  [IconNames.Handle]: ["fa-solid", "fa-grip-lines"],
  [IconNames.Landmark]: ["fa-solid", "fa-landmark"],
  [IconNames.Music]: ["fa-solid", "fa-music"],
  [IconNames.Paste]: ["fa-solid", "fa-paste"],
  [IconNames.Rehearsal]: ["fa-solid", "fa-registered"],
  [IconNames.User]: ["fa-solid fa-user"],
  [IconNames.YouTube]: ["fa-brands fa-youtube"],
  [IconNames.Delete]: ["fa-solid", "fa-trash-alt", "text-red-5"],
  [IconNames.Globe]: ["fa-solid", "fa-globe"],
};

export interface AppIcon {
  classes: string[];
  color: string;
}
