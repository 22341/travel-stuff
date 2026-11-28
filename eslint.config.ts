import globals from "globals";
import tseslint from "typescript-eslint";
import eslintReact from "@eslint-react/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";

export default tseslint.config([
  {
    ignores: ["node_modules/", "dist/", "coverage/"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  eslintReact.configs["recommended-typescript"],
  reactHooks.configs.flat.recommended,
  eslintReact.configs["disable-conflict-eslint-plugin-react-hooks"],
  {
    rules: {
      // Not in "recommended"; kept for the map links that open in a new tab.
      "@eslint-react/dom-no-unsafe-target-blank": "error",
    },
  },
]);
