import Clipboard from "clipboard";

export function useClipboard() {
  return {
    toClipboard(text: string, container?: HTMLElement) {
      return new Promise((resolve, reject) => {
        // make fake element
        const fakeEl = document.createElement("button");
        // setup a new Clipboard.js
        const clipboard = new Clipboard(fakeEl, {
          text: () => text,
          action: () => "copy",
          container: container !== undefined ? container : document.body,
        });
        clipboard.on("success", (e) => {
          clipboard.destroy();
          resolve(e);
        });
        clipboard.on("error", (e) => {
          clipboard.destroy();
          reject(e);
        });
        // simulate click
        fakeEl.click();
      });
    },
  };
}
