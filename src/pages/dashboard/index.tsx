import { type GetServerSideProps, type NextPage } from "next"
import Head from "next/head"
import DashboardLayout from "~/layout/dashboard"
import { getServerAuthSession } from "~/server/auth"

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx)
  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: true,
      },
    }
  }
  return {
    props: {
      session,
    },
  }
}

const DashboardPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <DashboardLayout>asdasdasd</DashboardLayout>
    </>
  )
}

export default DashboardPage
