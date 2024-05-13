import { type GetServerSideProps, type NextPage } from "next"
import { type BuiltInProviderType } from "next-auth/providers"
import { signIn } from "next-auth/react"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Icons } from "~/components/icons/Icons"
import { Button } from "~/components/ui/button"
import { useToast } from "~/components/ui/use-toast"
import { getServerAuthSession } from "~/server/auth"

type InitState = {
  provider?: BuiltInProviderType
  status: boolean
}

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
  const [isLoading, setLoading] = useState<InitState>({
    provider: undefined,
    status: false,
  })
  const { push, query } = useRouter()
  const { toast } = useToast()
  const errorMessage = query.error as string

  const handleSignIn = async (provider: BuiltInProviderType) => {
    try {
      setLoading({
        provider,
        status: true,
      })
      const result = await signIn(provider, {
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
      setLoading({
        provider: undefined,
        status: false,
      })
    }
  }

  useEffect(() => {
    if (errorMessage) {
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    }
  }, [errorMessage, toast])

  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <div className='container mt-16 flex flex-col items-center justify-center gap-2 px-4'>
        <h1 className='mb-8 text-4xl'>👋 Welcome</h1>
        <Button
          onClick={() => void handleSignIn("github")}
          disabled={isLoading.provider === "github" && isLoading.status}
        >
          {isLoading.provider === "github" && isLoading.status ? (
            <Icons.loader className='mr-2 h-5 w-5' />
          ) : (
            <Icons.gitHub className='mr-2 h-5 w-5' />
          )}
          Sign in with GitHub
        </Button>
        <Button
          onClick={() => void handleSignIn("google")}
          disabled={isLoading.provider === "google" && isLoading.status}
        >
          {isLoading.provider === "google" && isLoading.status ? (
            <Icons.loader className='mr-2 h-5 w-5' />
          ) : (
            <Icons.google className='mr-2 h-5 w-5' />
          )}
          Sign in with google
        </Button>
      </div>
    </>
  )
}

export default SigninPage
