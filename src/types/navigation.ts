import { AppIcon, ExternalLink, RouteNames } from "@/types";

export interface NavItem {
  label: string;
  routeName: RouteNames | null;
  routePath: string | null;
  link: ExternalLink | null;
  icon: AppIcon;
}
