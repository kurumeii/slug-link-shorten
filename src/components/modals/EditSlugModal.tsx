import { type FC } from "react"
import useGetSlug from "~/hooks/useGetSlug"
import { type ToggleModal } from "~/types"
import { Icons } from "../icons/Icons"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import EditSlugForm from "../form/EditSlugForm"
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"

type Props = {
  slugId: string
  toggleModal: ToggleModal
}

const EditSlugModal: FC<Props> = ({ slugId, toggleModal }) => {
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
            <EditSlugForm
              data={data}
              toggleModal={toggleModal}
              slugId={slugId}
            />
          </div>
        )}
      </DialogContent>
    </>
  )
}

export default EditSlugModal
