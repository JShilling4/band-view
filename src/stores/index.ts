import { createPinia } from "pinia";

const pinia = createPinia();

export * from "./member.store";
export * from "./user.store";
export * from "./contact.store";

export default pinia;
