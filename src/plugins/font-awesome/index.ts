import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHand } from "@fortawesome/free-regular-svg-icons";
import {
  faBars,
  faCircle,
  faPencil,
  faTimes,
  faTrash,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";

const initFontAwesome = () => {
  library.add(faPencil, faTrash, faTimes, faBars, faCircle, faHand, faCopy);
};

export { initFontAwesome, FontAwesomeIcon };
