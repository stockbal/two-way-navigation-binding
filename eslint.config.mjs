import eslint from "@eslint/js";
import globals from "globals";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  { ignores: ["@cds-models/", "gen/", "**/dist/", "coverage/", "app/**/test"] },
  eslint.configs.recommended,
  {
    files: ["**/*.js"],
    rules: {
      "no-console": "off",
      "require-atomic-updates": "off",
      "require-await": "error",
      "no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "prettier/prettier": "error",
    },
    languageOptions: { globals: { ...globals.node, sap: true } },
    plugins: { prettier: prettierPlugin },
  },
];
