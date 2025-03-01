import { AppIcon, ExternalLink } from "@/core/models";
import { type RouteName } from "@/router";

export interface NavItem {
  label: string;
  routeName: RouteName | null;
  routePath: string | null;
  link: ExternalLink | null;
  icon: AppIcon;
  requiresAuth: boolean;
  requiredRoles: string[];
}
