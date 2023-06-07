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
        <title>Slug link</title>
      </Head>
      <div className='container flex w-full flex-1 items-center'>
        Slug id: {slugId}
      </div>
    </>
  )
}

export default SlugPage
