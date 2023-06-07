import { type NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import DashboardLayout from "~/layout/dashboard"

const SlugPage: NextPage = () => {
  const { query } = useRouter()
  const slugId = query.slugId as string

  return (
    <>
      <Head>
        <title>Slug id {slugId}</title>
      </Head>
      <DashboardLayout>asdasdsad</DashboardLayout>
    </>
  )
}

export default SlugPage
