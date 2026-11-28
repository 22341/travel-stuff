import globals from "globals";
import tseslint from "typescript-eslint";
import eslintReact from "@eslint-react/eslint-plugin";

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
  {
    rules: {
      // Not in "recommended"; enabled to match what eslint-plugin-react(-hooks) covered.
      "@eslint-react/dom-no-unsafe-target-blank": "error",
      "@eslint-react/refs": "error",
      "@eslint-react/immutability": "error",
      "@eslint-react/globals": "error",
      "@eslint-react/unsupported-syntax": "warn",
    },
  },
]);
