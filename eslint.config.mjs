import js from "@eslint/js"
import typescriptParser from "@typescript-eslint/parser"
import typescriptEslint from "@typescript-eslint/eslint-plugin"
import importX from "eslint-plugin-import-x"

import { dirname } from "path"
import { FlatCompat } from "@eslint/eslintrc"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  ...compat.extends(
    "eslint:recommended",
    "plugin:n/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ),
  {
    plugins: {
      "@typescript-eslint": typescriptEslint,
      "import-x": importX,
    },
    languageOptions: {
      parser: typescriptParser,
    },
    rules: {
      quotes: ["error", "double"],
      "max-len": ["error", { code: 88 }],
      "prefer-const": "error",
      "no-unused-vars": "off",
      "no-unused-expressions": "error",
      "n/no-missing-import": "off",
      "n/no-extraneous-import": "off",
      "n/no-unpublished-import": "off",
      "@typescript-eslint/no-unused-vars": ["error", { args: "all" }],
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
]
