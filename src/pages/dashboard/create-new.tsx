import { zodResolver } from "@hookform/resolvers/zod"
import { type GetServerSideProps, type NextPage } from "next"
import Head from "next/head"
import { useForm } from "react-hook-form"
import { Icons } from "~/components/icons/Icons"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import { type CreateLinkInput, LinkSchemas } from "~/schema/schema"
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
    props: { session },
  }
}

const CreateNewPage: NextPage = () => {
  const form = useForm<CreateLinkInput>({
    resolver: zodResolver(LinkSchemas.createLink),
    defaultValues: {
      description: "",
      slug: "",
      url: "",
    },
  })

  const onSubmitFn = (data: CreateLinkInput) => {
    console.log(JSON.stringify(data, null, 2))
  }

  return (
    <>
      <Head>
        <title>Create new slug</title>
      </Head>
      <div className='mx-auto w-full max-w-2xl px-4'>
        <Card className='w-full'>
          <CardHeader>
            <CardTitle>Create new slug</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                noValidate
                onSubmit={(event) => void form.handleSubmit(onSubmitFn)(event)}
                className='flex flex-1 flex-col gap-3'
              >
                <FormField
                  name='url'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className='relative inline-flex w-full'>
                          <Input
                            id='url'
                            type='text'
                            className='py-2 pl-10 pr-3'
                            placeholder='The URL you want to shorten'
                            autoComplete='off'
                            {...field}
                          />
                          <span className='absolute inset-y-0 left-0 flex items-center justify-center pl-3 pr-2'>
                            <Icons.www className='h-5 w-5' />
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name='slug'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className='relative inline-flex w-full gap-2'>
                          <Input
                            id='slug'
                            type='text'
                            placeholder='The slug you want to shorten'
                            autoComplete='off'
                            {...field}
                          />
                          <Button type='button'>
                            <Icons.randomize className='mr-2 h-5 w-5' />
                            Randomize
                          </Button>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Result: https://slug.vercel.app/s/
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name='description'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className='relative inline-flex w-full'>
                          <Textarea
                            id='description'
                            placeholder='Describe something about the link'
                            autoComplete='off'
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default CreateNewPage
