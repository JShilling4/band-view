export function openBrowserTab(url: string | null) {
  if (!url) throw "Not a valid url";
  window.open(url, "_blank");
}

export function secToMinSec(seconds: number | null) {
  if (!seconds) return "";
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds / 60) % 60;
  const secs = seconds % 60;

  return [hours, minutes, secs]
    .map((v) => (v < 10 ? "0" + v : v))
    .filter((v, i) => v !== "00" || i > 0)
    .join(":");
}
