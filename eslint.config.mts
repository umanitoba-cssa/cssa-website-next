import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // ---------------------------------------
  // Base JS rules
  // ---------------------------------------
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      sourceType: "module",
      globals: globals.browser,
    },
    ...js.configs.recommended,
  },

  // ---------------------------------------
  // TypeScript + React files
  // ---------------------------------------
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: globals.browser,
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react: reactPlugin,
      "react-hooks": reactHooks,
    },

    // Extend recommended TS + React configs
    rules: {
      ...tseslint.configs.recommended.rules,
      ...reactPlugin.configs.flat.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      "react/react-in-jsx-scope": "off", // Warning not relevant in React 18+

      // Optional: modern JSX transform + no unnecessary fragments
      "react/jsx-uses-react": "off",
      "react/jsx-fragments": ["warn", "syntax"],
    },

    settings: {
      react: {
        version: "detect", // automatically detect React version
      },
    },
  },
]);
