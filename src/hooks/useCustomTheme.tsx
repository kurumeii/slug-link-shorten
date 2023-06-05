import { useTheme } from "next-themes"
import { useCallback, useEffect, useState } from "react"

export default function useCustomTheme() {
  const { setTheme, theme } = useTheme()
  const [themeValue, setThemeValue] = useState("")

  useEffect(() => {
    theme && setThemeValue(theme ?? "system")
  }, [theme])

  const isDarkTheme = themeValue === "dark"
  const isSystemDevice = themeValue === "system"
  const isLightTheme = themeValue === "light"

  const changeTheme = useCallback(
    (themeValue?: string) => setTheme(themeValue ?? "system"),
    [setTheme]
  )

  return {
    theme: themeValue,
    isDarkTheme,
    isSystemDevice,
    isLightTheme,
    changeTheme,
  }
}
