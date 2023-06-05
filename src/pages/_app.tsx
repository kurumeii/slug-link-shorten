import { type Session } from "next-auth"
import { type AppType } from "next/app"
import Head from "next/head"
import { type NextRouter } from "next/router"
import ProviderWrapper from "~/components/provider/ProviderWrapper"
import "~/styles/globals.css"
import { api } from "~/utils/api"

const MyApp: AppType<{ session?: Session }> = ({
  Component,
  pageProps: { session, ...pageProps },
  router,
}) => {
  const route = (router as NextRouter).route
  return (
    <>
      <Head>
        <link rel='icon' href='/img/favicon.ico' />
      </Head>
      <ProviderWrapper session={session} routerKey={route}>
        <Component {...pageProps} />
      </ProviderWrapper>
    </>
  )
}

export default api.withTRPC(MyApp)
