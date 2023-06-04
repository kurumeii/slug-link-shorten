import { type Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { type FC, type PropsWithChildren } from "react"
import { Toaster } from "../Toaster"
import nextFonts from "~/lib/fonts"
import Progressbar from "nextjs-progressbar"
import { DefaultSeo } from "next-seo"
import { Analytics } from "@vercel/analytics/react"
import nextSeoConfig from "~/lib/next-seo.config"
import { ThemeProvider } from "next-themes"
import { progressbarConfig, themeConfig } from "~/lib/theme"

type Props = PropsWithChildren & {
  session?: Session
}

const ProviderWrapper: FC<Props> = ({ session, children }) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider {...themeConfig}>
        <Progressbar {...progressbarConfig} />
        <DefaultSeo {...nextSeoConfig} />
        <Toaster />
        <Analytics />
        <main className={`${nextFonts} font-sans`}>{children}</main>
      </ThemeProvider>
    </SessionProvider>
  )
}

export default ProviderWrapper
