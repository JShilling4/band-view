import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import pinia from "@/stores";
import { Quasar } from "quasar";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faPencil,
  faTrash,
  faTimes,
  faBars,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import "quasar/dist/quasar.css";

library.add(faPencil, faTrash, faTimes, faBars, faCircle);

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.use(pinia);
app.use(Quasar, {});
app.mount("#app");
