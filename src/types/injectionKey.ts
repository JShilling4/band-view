import { QVueGlobals } from "quasar";
import { InjectionKey } from "vue";

export const quasarIK = Symbol() as InjectionKey<QVueGlobals>;
export const isAdminIK = Symbol() as InjectionKey<boolean>;
