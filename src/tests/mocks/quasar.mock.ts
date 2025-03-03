import { config } from "@vue/test-utils";
import cloneDeep from "lodash/cloneDeep";
import { Quasar, QuasarPluginOptions } from "quasar";
import { beforeAll, afterAll } from "vitest";

export function installQuasarPlugin(options?: Partial<QuasarPluginOptions>) {
  const globalConfigBackup = cloneDeep(config.global);

  beforeAll(() => {
    config.global.plugins.unshift([Quasar, options]);
    config.global.provide = {
      ...config.global.provide,
    };
  });

  afterAll(() => {
    config.global = globalConfigBackup;
  });
}
