import { Analytics } from "@vercel/analytics/react"
import { type Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { DefaultSeo } from "next-seo"
import { ThemeProvider } from "next-themes"
import Progressbar from "nextjs-progressbar"
import { type FC, type PropsWithChildren } from "react"
import Layout from "~/layout"
import nextFonts from "~/lib/fonts"
import nextSeoConfig from "~/lib/next-seo.config"
import { progressbarConfig, themeConfig } from "~/lib/theme"
import { cn } from "~/lib/utils"
import { Toaster } from "../Toaster"
import Appear from "../framer-motions/Appear"
import { ScrollArea } from "../ui/scroll-area"

type Props = PropsWithChildren & {
  session?: Session
  routerKey?: string
}

const ProviderWrapper: FC<Props> = ({ children, routerKey, session }) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider {...themeConfig}>
        <Progressbar {...progressbarConfig} />
        <DefaultSeo {...nextSeoConfig} />
        <Toaster />
        <Analytics />
        <ScrollArea className='max-w-screen h-screen'>
          <Layout>
            <Appear routerKey={routerKey}>
              <main
                className={cn(
                  nextFonts,
                  "flex h-full flex-col font-sans antialiased"
                )}
              >
                {children}
              </main>
            </Appear>
          </Layout>
        </ScrollArea>
      </ThemeProvider>
    </SessionProvider>
  )
}

export default ProviderWrapper
