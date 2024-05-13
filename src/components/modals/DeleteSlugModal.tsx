import { zodResolver } from "@hookform/resolvers/zod"
import { nanoid } from "@reduxjs/toolkit"
import { useEffect, useState, type FC } from "react"
import { useForm } from "react-hook-form"
import { LinkSchemas, type DeleteSlug } from "~/configs/schema/schema"
import useDeleteSlug from "~/hooks/useDeleteSlug"
import { useAppDispatch } from "~/hooks/useRedux"
import { dashboardSlice, useDashboardSelector } from "~/slices/dashboard"
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

type Props = {
  slugId: string
}

const DeleteSlugModal: FC<Props> = ({ slugId }) => {
  const [random, setRandom] = useState("")
  const deleteSlug = useDeleteSlug()
  const { modalStates } = useDashboardSelector()
  const dispatch = useAppDispatch()
  const form = useForm<DeleteSlug>({
    resolver: zodResolver(LinkSchemas.deleteSlug),
    defaultValues: {
      slug: "",
    },
  })
  useEffect(() => {
    const randomize = nanoid(5)
    setRandom(randomize)
  }, [modalStates.delete])

  useEffect(() => {
    if (modalStates.delete) {
      form.reset()
    }
  }, [form, modalStates.delete])

  const onSubmitFn = (data: DeleteSlug) => {
    if (data.slug !== random) {
      form.setError("slug", {
        message: "Does not match, please check again",
        type: "validate",
      })
    } else {
      dispatch(
        dashboardSlice.actions.toggleModal({
          name: "delete",
          status: false,
        })
      )
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
              <Button
                variant='destructive'
                type='submit'
                disabled={deleteSlug.isLoading}
              >
                {deleteSlug.isLoading ? (
                  <>
                    <Icons.loader className='mr-2' />
                    Deleting your link
                  </>
                ) : (
                  <>
                    <Icons.delete className='mr-2 h-5 w-5' />
                    Delete link
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AlertDialogContent>
  )
}

export default DeleteSlugModal
