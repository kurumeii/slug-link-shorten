import { type ThemeProviderProps } from "next-themes/dist/types"
import { type NextNProgressProps } from "nextjs-progressbar"

export const themeConfig: ThemeProviderProps = {
  storageKey: "slug-theme",
  attribute: "class",
  disableTransitionOnChange: false,
  enableColorScheme: true,
  enableSystem: true,
  defaultTheme: "system",
  themes: ["dark", "light", "system"],
}

export const progressbarConfig: NextNProgressProps = {
  height: 3,
  showOnShallow: true,
  startPosition: 0,
  stopDelayMs: 200,
  options: {
    showSpinner: true,
  },
  color: "#86198f",
}
