import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier/flat";
import { defineConfig, globalIgnores } from "eslint/config";

/** @type {import('eslint').Linter.Config[]} */
export default defineConfig(
  globalIgnores([
    ".prettierrc.*",
    "postcss.config.*",
    "tailwind.config.*",
    "vite.config.*",
    "node_modules",
    "dist",
    "coverage",
    "eslint.config.*",
    "**/node_modules/**",
    "**/build/**",
    "**/dist/**",
    "contracts/**",
    ".react-router",
    "react-router.config.*",
    ".netlify",
    "wagmi.config.*",
  ]),

  // Base config for all files
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        ...globals.es2021,
      },
    },
  },

  // ESLint recommended rules
  js.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.cloudflare.json",
      },
    },
    rules: {
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          allowNumber: true,
        },
      ],
    },
  },

  // React config
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
    },
    settings: {
      react: {
        version: "detect",
      },
      formComponents: ["Form"],
      linkComponents: [
        { name: "Link", linkAttribute: "to" },
        { name: "NavLink", linkAttribute: "to" },
      ],
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
    },
  },

  // Node config for config files
  {
    files: ["eslint.config.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  // Prettier config (must be last)
  prettier,
);
