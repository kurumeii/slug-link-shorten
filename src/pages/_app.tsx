import { type Session } from "next-auth"
import { type AppType } from "next/app"
import Head from "next/head"
import ProviderWrapper from "~/components/provider/ProviderWrapper"
import "~/styles/globals.css"
import { api } from "~/utils/api"

const MyApp: AppType<{ session?: Session }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Head>
        <link rel='icon' href='/img/favicon.ico' />
      </Head>
      <ProviderWrapper session={session}>
        <Component {...pageProps} />
      </ProviderWrapper>
    </>
  )
}

export default api.withTRPC(MyApp)
