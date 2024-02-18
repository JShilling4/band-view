import App from "./App.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createApp } from "vue";
import "@quasar/extras/fontawesome-v6/fontawesome-v6.css";
import { Notify, Quasar } from "quasar";
import "quasar/dist/quasar.css";
import iconSet from "quasar/icon-set/fontawesome-v6";
import router from "@/router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHand } from "@fortawesome/free-regular-svg-icons";
import { faBars, faCircle, faPencil, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import pinia from "@/stores";

library.add(faPencil, faTrash, faTimes, faBars, faCircle, faHand);

const app = createApp(App);
app.component("FontAwesomeIcon", FontAwesomeIcon);
app.use(router);
app.use(pinia);
app.use(Quasar, {
  plugins: { Notify },
  iconSet: iconSet,
  config: {
    notify: {
      position: "top",
    },
  },
});
app.mount("#app");
