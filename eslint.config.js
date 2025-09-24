import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint-config/flat";

export default defineConfig([
  {
    files: ["**/*.js", "**/*.mjs", "**/*.cjs", "**/*.ts", "**/*.tsx"],
    plugins: {
      ts: tseslint.plugin,
      react: pluginReact
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      pluginReact.configs.recommended,
    ],
    languageOptions: {
      globals: {
        ...globals.browser
      },
      parserOptions: {
        'project': ['./tsconfig.json']
      }
    },
    rules: {
      'react/react-in-jsx-scope': 'off'
    }
  }
]);