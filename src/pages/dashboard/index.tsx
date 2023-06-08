import { zodResolver } from "@hookform/resolvers/zod"
import { type GetServerSideProps, type NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { Icons } from "~/components/icons/Icons"
import DashboardData from "~/components/slug-data/DashboardData"
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"
import { buttonVariants } from "~/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import useGetLink from "~/hooks/useGetLink"
import DashboardLayout from "~/layout/dashboard"
import { cn } from "~/lib/utils"
import { LinkSchemas, type FilterLinkInput } from "~/schema/schema"
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
  const searchRef = useRef<HTMLInputElement | null>(null)

  const form = useForm<FilterLinkInput>({
    resolver: zodResolver(LinkSchemas.filterLink),
    defaultValues: {
      filter: "",
    },
  })
  const getLink = useGetLink(form.getValues("filter"))

  const onSubmitFn = (data: FilterLinkInput) => {
    console.log(JSON.stringify(data, null, 2))
  }

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e?.metaKey || e?.ctrlKey) && e?.key === "f") {
        e.preventDefault()
        searchRef.current?.focus()
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  if (getLink.error) {
    return (
      <div className='container w-full px-5'>
        <Alert variant={"destructive"}>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{getLink.error.message}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <DashboardLayout>
        <div className='container my-3 flex flex-col gap-3 md:flex-row md:items-center'>
          <Form {...form}>
            <form
              noValidate
              onSubmit={(event) => void form.handleSubmit(onSubmitFn)(event)}
              className='min-w-fit flex-1'
            >
              <FormField
                name='filter'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className='relative inline-flex w-full '>
                        <Input
                          id='search'
                          type='text'
                          placeholder='Search for links'
                          className='py-2 pl-10 pr-3'
                          autoComplete='off'
                          {...field}
                          ref={(el) => {
                            field.ref(el)
                            searchRef.current = el
                          }}
                        />
                        <span className='absolute inset-y-0 left-0 flex items-center justify-center pl-3 pr-2'>
                          <Icons.search className='h-5 w-5' />
                        </span>
                        <span className='absolute inset-y-0 right-0 flex items-center justify-center pl-3 pr-2'>
                          <kbd className='pointer-events-none mx-3 my-2 select-none p-1 text-xs text-muted-foreground'>
                            CTRL + F
                          </kbd>
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <Link
            href='/dashboard/create-new'
            className={cn(
              buttonVariants({
                variant: "secondary",
              })
            )}
          >
            <Icons.plus className='mr-2' />
            Create new link
          </Link>
        </div>
        {getLink.isLoading && (
          <div className='mt-8 flex flex-col items-center justify-center'>
            <p className='mb-2'>Loading your links...</p>
            <Icons.loader />
          </div>
        )}
        {getLink.data?.links?.length === 0 ? (
          <div className='flex flex-col items-center justify-center'>
            <Icons.empty className='h-20 w-20 stroke-1 text-muted-foreground' />
            <p className='mb-4 text-xl'>It&apos;s kinda empty</p>
          </div>
        ) : (
          <DashboardData />
        )}
      </DashboardLayout>
    </>
  )
}

export default DashboardPage
