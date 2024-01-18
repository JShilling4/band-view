export function openBrowserTab(url: string | null) {
  if (!url) throw "Not a valid url";
  window.open(url, "_blank");
}
