import { QVueGlobals } from "quasar";
import { InjectionKey } from "vue";

export const qInjectionKey = Symbol() as InjectionKey<QVueGlobals>;
