import { type FC } from "react"
import { type ToggleModal } from "~/types"
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"

type Props = {
  toggleModal: ToggleModal
}

const EditSlugModal: FC<Props> = () => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you sure absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  )
}

export default EditSlugModal
