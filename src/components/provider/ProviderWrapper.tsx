import { Analytics } from "@vercel/analytics/react"
import { type Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { DefaultSeo } from "next-seo"
import { ThemeProvider } from "next-themes"
import Progressbar from "nextjs-progressbar"
import { type FC, type PropsWithChildren } from "react"
import { Provider as ReduxProvider } from "react-redux"
import Layout from "~/layout"
import nextFonts from "~/lib/fonts"
import nextSeoConfig from "~/lib/next-seo.config"
import { progressbarConfig, themeConfig } from "~/lib/theme"
import { cn } from "~/lib/utils"
import { store } from "~/store/store"
import { Toaster } from "../Toaster"
import Appear from "../framer-motions/Appear"

type Props = PropsWithChildren & {
  session?: Session
  routerKey?: string
}

const ProviderWrapper: FC<Props> = ({ children, routerKey, session }) => {
  return (
    <ReduxProvider store={store}>
      <SessionProvider session={session}>
        <ThemeProvider {...themeConfig}>
          <Progressbar {...progressbarConfig} />
          <DefaultSeo {...nextSeoConfig} />
          <Toaster />
          <Analytics />
          <Layout>
            <Appear routerKey={routerKey}>
              <main className={cn(nextFonts, "font-sans antialiased")}>
                {children}
              </main>
            </Appear>
          </Layout>
        </ThemeProvider>
      </SessionProvider>
    </ReduxProvider>
  )
}

export default ProviderWrapper
