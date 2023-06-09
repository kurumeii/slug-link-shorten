import { zodResolver } from "@hookform/resolvers/zod"
import { nanoid } from "@reduxjs/toolkit"
import { type GetServerSideProps, type NextPage } from "next"
import Head from "next/head"
import { useCallback } from "react"
import { useForm } from "react-hook-form"
import { Icons } from "~/components/icons/Icons"
import PaginationHead from "~/components/pagination-head/PaginationHead"
import { Button } from "~/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import useCreateSlug from "~/hooks/useCreateSlug"
import { LinkSchemas, type CreateLinkInput } from "~/schema/schema"
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
  const createSlug = useCreateSlug()

  const form = useForm<CreateLinkInput>({
    resolver: zodResolver(LinkSchemas.createLink),
    defaultValues: {
      description: "",
      slug: "",
      url: "",
    },
  })

  const onSubmitFn = useCallback(
    (data: CreateLinkInput) => {
      if (data.slug === data.url) {
        form.setError("slug", {
          type: "validate",
          message: "The URL and the slug cannot be the same",
        })
      } else {
        createSlug.mutate({
          description: form.getValues("description"),
          slug: form.getValues("slug"),
          url: form.getValues("url"),
        })
      }
    },
    [createSlug, form]
  )

  const randomizeSlug = () => {
    const random = nanoid(10)
    form.setValue("slug", random)
    form.clearErrors("slug")
  }

  return (
    <>
      <Head>
        <title>Create new slug</title>
      </Head>
      <div className='mx-auto w-full max-w-2xl px-4'>
        <PaginationHead
          pages={[
            { title: "dashboard", url: "/dashboard" },
            { title: "create-new" },
          ]}
        />
        <br />
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
                  <FormLabel htmlFor='url'>Enter the URL:</FormLabel>
                  <FormControl>
                    <div className='relative inline-flex w-full'>
                      <Input
                        id='url'
                        type='text'
                        className='py-2 pl-10 pr-3'
                        placeholder='Https://'
                        autoComplete='off'
                        {...field}
                      />
                      <span className='absolute inset-y-0 left-0 flex items-center justify-center pl-3 pr-2'>
                        <Icons.www className='h-5 w-5' stroke={1.5} />
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
                  <FormLabel htmlFor='slug'>Custom slug:</FormLabel>
                  <FormControl>
                    <div className='relative inline-flex w-full gap-2'>
                      <Input
                        id='slug'
                        type='text'
                        autoComplete='off'
                        {...field}
                      />
                      <Button
                        type='button'
                        variant='secondary'
                        onClick={randomizeSlug}
                      >
                        <Icons.randomize className='mr-2 h-5 w-5' />
                        Randomize
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Type the slug you want or chooes random characters
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
                  <FormLabel htmlFor='description'>
                    Description (optional):{" "}
                  </FormLabel>
                  <FormControl>
                    <div className='relative inline-flex w-full'>
                      <Textarea
                        id='description'
                        placeholder='Describe something about the link'
                        autoComplete='off'
                        className='h-36 max-h-52'
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-end'>
              <Button
                type='submit'
                variant={"secondary"}
                disabled={createSlug.isLoading}
              >
                {createSlug.isLoading ? (
                  <Icons.loader className='mr-2' />
                ) : (
                  <Icons.rocket className='mr-2 h-5 w-5' />
                )}
                {createSlug.isLoading ? "Creating..." : "Continue"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  )
}

export default CreateNewPage
