const tsParser = require("@typescript-eslint/parser");
const deprecationPlugin = require("eslint-plugin-deprecation");

module.exports = [
  {
    files: ["src/**/*.js"],
    ignores: ["build/**"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.deprecated.json",
        sourceType: "script",
        ecmaVersion: 2020
      }
    },
    plugins: {
      deprecation: deprecationPlugin
    },
    rules: {
      "deprecation/deprecation": "error"
    }
  }
];
