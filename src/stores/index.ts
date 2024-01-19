import { createPinia } from "pinia";

const pinia = createPinia();

export * from "./member.store";
export * from "./set.store";
export * from "./song.store";

export default pinia;
