import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { LinkSchemas, type EditLinkInput } from "~/schema/schema"

import { type FC } from "react"
import useEditSlug from "~/hooks/useEditSlug"
import { type ToggleModal } from "~/types"
import { type RouterOutputs } from "~/utils/api"
import { Icons } from "../icons/Icons"
import { Button } from "../ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"

type EditProps = {
  data: RouterOutputs["slug"]["getSlug"]
  slugId: string
  toggleModal: ToggleModal
}

const EditSlugForm: FC<EditProps> = ({ data, slugId, toggleModal }) => {
  const editSlug = useEditSlug()
  const form = useForm<EditLinkInput>({
    resolver: zodResolver(LinkSchemas.editLink.omit({ slugId: true })),
    defaultValues: {
      url: data.url,
      description: data.description ?? "",
    },
  })

  const onSubmitFn = (data: EditLinkInput) => {
    editSlug.mutate({
      slugId,
      url: data.url,
      description: data.description,
    })
    toggleModal({
      modalType: "edit",
      state: false,
    })
  }
  return (
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
          name='description'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor='description'>
                Description (optional):
              </FormLabel>
              <FormControl>
                <div className='relative inline-flex w-full'>
                  <Textarea
                    id='description'
                    placeholder={
                      field.value === ""
                        ? "Describe something about the link"
                        : field.value
                    }
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
            disabled={editSlug.isLoading}
          >
            {editSlug.isLoading ? (
              <Icons.loader className='mr-2' />
            ) : (
              <Icons.check className='mr-2 h-5 w-5' />
            )}
            {editSlug.isLoading ? "Creating..." : "Continue"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default EditSlugForm
