// Vue core imports
import App from "./App.vue";
// FontAwesome imports
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createApp } from "vue";
import "@quasar/extras/fontawesome-v6/fontawesome-v6.css";
// Quasar imports
import { Notify, Quasar, QuasarPluginOptions } from "quasar";
import "quasar/dist/quasar.css";
import iconSet from "quasar/icon-set/fontawesome-v6";
import router from "@/router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHand } from "@fortawesome/free-regular-svg-icons";
import { faBars, faCircle, faPencil, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import pinia from "@/stores";

// Setup FontAwesome
const setupFontAwesome = () => {
  library.add(faPencil, faTrash, faTimes, faBars, faCircle, faHand);
};

// Quasar configuration
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

// Initialize app
const initializeApp = () => {
  try {
    setupFontAwesome();

    const app = createApp(App);
    app.component("FontAwesomeIcon", FontAwesomeIcon);
    app.use(router);
    app.use(pinia);
    app.use(Quasar, quasarConfig);
    app.mount("#app");
  } catch (error) {
    console.error("Failed to initialize application:", error);
    throw error;
  }
};

initializeApp();
