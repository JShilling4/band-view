import "@quasar/extras/fontawesome-v6/fontawesome-v6.css";
import { Notify, Quasar, QuasarPluginOptions } from "quasar";
import "quasar/dist/quasar.css";
import iconSet from "quasar/icon-set/fontawesome-v6";

const quasarConfig: Partial<QuasarPluginOptions> = {
  plugins: { Notify },
  iconSet: iconSet,
  config: {
    notify: {
      position: "top",
      timeout: 2500, // default timeout in ms
      type: "info" as const, // default notification type
    },
  },
};

export { quasarConfig, Quasar };
