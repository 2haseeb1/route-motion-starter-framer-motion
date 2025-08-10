// eslint.config.js
import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

export default [
  { ignores: ["dist/**"] },
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: "module",
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      // React 17+ এ এগুলো অফ রাখা যায়
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",

      // JSX-এ ব্যবহারের ক্ষেত্রে ভ্যারিয়েবলকে "used" ধরে
      "react/jsx-uses-vars": "error",

      // আপনার ইগনোর প্যাটার্ন রাখতে চাইলে:
      "no-unused-vars": ["warn", { varsIgnorePattern: "^_" }],

      // vite react-refresh সতর্কতা
      "react-refresh/only-export-components": "warn",
    },
    settings: { react: { version: "detect" } },
  },
];