export type ExternalLinkTarget = "_blank" | "_self" | "_parent" | "_top";

export interface ExternalLink {
  href: string;
  target: ExternalLinkTarget;
}
