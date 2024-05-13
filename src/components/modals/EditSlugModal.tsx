import { type FC } from "react"
import useGetSlug from "~/hooks/useGetSlug"
import EditSlugForm from "../form/EditSlugForm"
import { Icons } from "../icons/Icons"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"

type Props = {
  slugId: string
}

const EditSlugModal: FC<Props> = ({ slugId }) => {
  const { data, isLoading } = useGetSlug(slugId)
  return (
    <>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit the link</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <div className='flex h-full w-full items-center justify-center'>
            <Icons.loader className='h-7 w-7' />
          </div>
        ) : !data ? (
          <div className='flex h-full w-full items-center justify-center'>
            <Alert variant={"destructive"}>
              <AlertTitle>There&apos;s something wrong</AlertTitle>
              <AlertDescription>
                Close this window and try again
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <div className='mb-5'>
            <EditSlugForm slugId={slugId} />
          </div>
        )}
      </DialogContent>
    </>
  )
}

export default EditSlugModal
