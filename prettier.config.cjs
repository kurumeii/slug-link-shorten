/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  jsxSingleQuote: true,
  semi: false,
}

module.exports = config
