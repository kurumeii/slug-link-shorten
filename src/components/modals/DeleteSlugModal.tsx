import { zodResolver } from "@hookform/resolvers/zod"
import { nanoid } from "@reduxjs/toolkit"
import { useEffect, useState, type FC } from "react"
import { useForm } from "react-hook-form"
import { type z } from "zod"
import { LinkSchemas } from "~/schema/schema"
import { type ToggleModal } from "~/types"
import { Icons } from "../icons/Icons"
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import useDeleteSlug from "~/hooks/useDeleteSlug"

const slugZodchema = LinkSchemas.link.pick({ slug: true })
type SlugSchemas = z.infer<typeof slugZodchema>

type Props = {
  toggleModal: ToggleModal
  slugId: string
}

const DeleteSlugModal: FC<Props> = ({ toggleModal, slugId }) => {
  const [random, setRandom] = useState("")
  const deleteSlug = useDeleteSlug()
  const form = useForm<SlugSchemas>({
    resolver: zodResolver(slugZodchema),
    defaultValues: {
      slug: "",
    },
  })
  useEffect(() => {
    const randomize = nanoid(5)
    setRandom(randomize)
  }, [])

  const onSubmitFn = (data: SlugSchemas) => {
    if (data.slug !== random) {
      form.setError("slug", {
        message: "Does not match, please check again",
        type: "validate",
      })
    } else {
      toggleModal({ modalType: "delete", state: false })
      deleteSlug.mutate({
        slugId,
      })
    }
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action is irreversible.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <div className='mb-5'>
        <p>Enter the following to confirm:</p>
        <span className='text-sm text-muted-foreground'>{random}</span>
        <Form {...form}>
          <form
            noValidate
            onSubmit={(event) => void form.handleSubmit(onSubmitFn)(event)}
            className='flex h-full flex-1 flex-col pt-3'
          >
            <FormField
              name='slug'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id='slug-confirm'
                      type='text'
                      placeholder='...'
                      autoComplete='off'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex w-full flex-1 items-center justify-end gap-2'>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button variant='destructive' type='submit'>
                <Icons.delete className='mr-2 h-5 w-5' />
                Delete link
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AlertDialogContent>
  )
}

export default DeleteSlugModal
