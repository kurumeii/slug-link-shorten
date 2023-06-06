import { zodResolver } from "@hookform/resolvers/zod"
import { type GetServerSideProps, type NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { Icons } from "~/components/icons/Icons"
import { buttonVariants } from "~/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
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

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <DashboardLayout>
        <div className='container my-3 flex flex-row items-center gap-x-3'>
          <Form {...form}>
            <form
              noValidate
              onSubmit={(event) => void form.handleSubmit(onSubmitFn)(event)}
              className='flex-1'
            >
              <FormField
                name='filter'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className='relative inline-flex w-full'>
                        <Input
                          id='search'
                          type='text'
                          placeholder='Search for links'
                          className='py-2 pl-10 pr-3'
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
          <div className='grid grid-cols-2 gap-2 rounded-sm bg-muted px-2 py-3'>
            <div className='rounded-lg bg-secondary text-secondary-foreground'>
              <Icons.dashboardLayout className='h-5 w-5' />
            </div>
            <div className='rounded-lg bg-secondary text-secondary-foreground'>
              <Icons.listLayout className='h-5 w-5' />
            </div>
          </div>
          <Link href='/dashboard/create-new' className={cn(buttonVariants())}>
            <Icons.plus className='mr-2' />
            Create new link
          </Link>
        </div>
      </DashboardLayout>
    </>
  )
}

export default DashboardPage
