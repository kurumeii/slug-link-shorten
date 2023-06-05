import { type GetServerSideProps, type NextPage } from "next"
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
  return <div>DashboardPage</div>
}

export default DashboardPage
