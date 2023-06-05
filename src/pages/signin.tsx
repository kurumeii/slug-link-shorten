import { type GetServerSideProps, type NextPage } from "next"
import { signIn } from "next-auth/react"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"
import { Icons } from "~/components/icons/Icons"
import { Button } from "~/components/ui/button"
import { useToast } from "~/components/ui/use-toast"
import { getServerAuthSession } from "~/server/auth"

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx)
  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    }
  }
  return {
    props: { session },
  }
}

const SigninPage: NextPage = () => {
  const [isLoading, setLoading] = useState(false)
  const { push } = useRouter()
  const { toast } = useToast()

  const handleSignIn = async () => {
    try {
      setLoading(true)
      const result = await signIn("github", {
        redirect: false,
      })
      if (result?.error) {
        toast({
          title: "Error",
          description:
            "An error occurred while logging in. Please create an issue about the problem.",
          variant: "destructive",
        })
      }
      if (result?.ok) {
        await push("/dashboard")
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          "An error occurred while logging in. Please create an issue about the problem.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <div className='container mt-16 flex flex-col items-center justify-center px-4'>
        <h1 className='mb-8 text-4xl'>👋 Welcome</h1>
        <Button onClick={() => void handleSignIn()} disabled={isLoading}>
          {isLoading ? (
            <Icons.loader className='mr-2 h-5 w-5' />
          ) : (
            <Icons.gitHub className='mr-2 h-5 w-5' />
          )}
          Sign in with GitHub
        </Button>
      </div>
    </>
  )
}

export default SigninPage
