import { type ThemeProviderProps } from "next-themes/dist/types"
import { type NextNProgressProps } from "nextjs-progressbar"

export const themeConfig: ThemeProviderProps = {
  storageKey: "slug-theme",
  attribute: "class",
  disableTransitionOnChange: true,
  enableColorScheme: true,
  enableSystem: true,
  defaultTheme: "system",
  themes: ["dark", "light", "system"],
}

export const progressbarConfig: NextNProgressProps = {
  height: 5,
  showOnShallow: true,
  startPosition: 0.3,
  stopDelayMs: 200,
  color: "#a21caf",
}
