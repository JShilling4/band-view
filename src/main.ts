import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import pinia from "@/stores";
import { Quasar } from "quasar";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPencil, faTrash, faTimes, faBars, faCircle } from "@fortawesome/free-solid-svg-icons";
import { faHand } from "@fortawesome/free-regular-svg-icons";
import iconSet from "quasar/icon-set/fontawesome-v6";
import "@quasar/extras/fontawesome-v6/fontawesome-v6.css";
import "quasar/dist/quasar.css";

library.add(faPencil, faTrash, faTimes, faBars, faCircle, faHand);

const app = createApp(App);
app.component("FontAwesomeIcon", FontAwesomeIcon);
app.use(router);
app.use(pinia);
app.use(Quasar, { iconSet: iconSet });
app.mount("#app");
