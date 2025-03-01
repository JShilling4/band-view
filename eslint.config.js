import pluginVue from "eslint-plugin-vue";
import pluginJs from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,vue}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: { parser: tseslint.parser },
      // necessary for auto-imports in SFCs
      globals: {
        ref: "readonly",
        computed: "readonly",
        watch: "readonly",
        watchEffect: "readonly",
        provide: "readonly",
        inject: "readonly",
        reactive: "readonly",
      },
    },
  },
  eslintPluginPrettier,
  {
    rules: {
      "vue/multi-word-component-names": "off",
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],
    },
  },
];
