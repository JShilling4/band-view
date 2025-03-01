import App from "./App.vue";
import { createApp } from "vue";
import { Quasar, quasarConfig } from "@/plugins/quasar";
import { FontAwesomeIcon, initFontAwesome } from "@/plugins/font-awesome";
import router from "@/router";
import pinia from "@/stores";

const initializeApp = () => {
  try {
    initFontAwesome();
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
