import typescriptEslint from "@typescript-eslint/eslint-plugin"

export default [
  { ignores: ["node_modules/", "dist/", "bin/"] },
  ...typescriptEslint.configs["flat/recommended"],
]
