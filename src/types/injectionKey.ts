import { InjectionKey } from "vue";
import { QVueGlobals } from "quasar";

export const quasarIK = Symbol() as InjectionKey<QVueGlobals>;
