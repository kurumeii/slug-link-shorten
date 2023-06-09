import { useRouter } from "next/router"
import { useState, type FC } from "react"
import { useAppSelector } from "~/hooks/useRedux"
import { Icons } from "../icons/Icons"
import { AlertDialog, AlertDialogTrigger } from "../ui/alert-dialog"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Dialog, DialogTrigger } from "../ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

import { type ToggleModal } from "~/types"
import Appear from "../framer-motions/Appear"
import DeleteSlugModal from "../modals/DeleteSlugModal"
import EditSlugModal from "../modals/EditSlugModal"
import { useToast } from "../ui/use-toast"

const DashboardData: FC = () => {
  const { slugData } = useAppSelector((s) => s.slugs)
  const { toast } = useToast()
  const { push } = useRouter()
  const [slugId, setSlugId] = useState("")
  const [modalStates, setModalStates] = useState({
    delete: false,
    edit: false,
  })

  const copyToClipboard = async (txt: string) => {
    const link = `${window.location.origin}/s/${txt}`
    try {
      const clipboardItem = new ClipboardItem({
        "text/plain": new Blob([link], { type: "text/plain" }),
      })
      await navigator.clipboard.write([clipboardItem])
    } catch (error) {
      await navigator.clipboard.writeText(link)
    }
    toast({
      variant: "default",
      description: (
        <span className='inline-flex items-center justify-center'>
          <Icons.congratz className='mr-2' />
          Copied to clipboard
        </span>
      ),
      duration: 2 * 1000,
    })
  }

  const toggleModal: ToggleModal = ({ modalType, state }) =>
    setModalStates((prev) => ({
      ...prev,
      [modalType]: state,
    }))

  return (
    <>
      <div className='grid grid-cols-1 gap-3 py-2 md:grid-cols-2 lg:grid-cols-3'>
        <AlertDialog
          open={modalStates.delete}
          onOpenChange={(state) => toggleModal({ modalType: "delete", state })}
        >
          <Dialog
            open={modalStates.edit}
            onOpenChange={(state) => toggleModal({ modalType: "edit", state })}
          >
            {slugData.map((sd) => (
              <Appear key={sd.id}>
                <Card className='h-full'>
                  <CardHeader>
                    <CardTitle className='inline-flex items-center justify-between gap-2'>
                      <span
                        className='cursor-pointer'
                        onClick={() => void copyToClipboard(sd.slug)}
                      >
                        /s/{sd.slug}
                      </span>

                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Icons.options />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end' className=''>
                          <DropdownMenuItem
                            onClick={() =>
                              void push(
                                `${window.location.origin}/s/${sd.slug}`
                              )
                            }
                          >
                            Open in new tab
                            <DropdownMenuShortcut>
                              <Icons.external className='ml-2 h-4 w-4' />
                            </DropdownMenuShortcut>
                          </DropdownMenuItem>
                          <DialogTrigger
                            asChild
                            onClick={() => setSlugId(sd.id)}
                          >
                            <DropdownMenuItem>
                              Edit
                              <DropdownMenuShortcut>
                                <Icons.edit className='ml-2 h-4 w-4' />
                              </DropdownMenuShortcut>
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <AlertDialogTrigger
                            asChild
                            onClick={() => setSlugId(sd.id)}
                          >
                            <DropdownMenuItem className='text-destructive focus:bg-destructive focus:text-destructive-foreground'>
                              Delete
                              <DropdownMenuShortcut>
                                <Icons.delete className='ml-2 h-4 w-4' />
                              </DropdownMenuShortcut>
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardTitle>
                    <CardDescription className='truncate'>
                      {sd.url}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>{sd.description}</CardFooter>
                </Card>
              </Appear>
            ))}
            <EditSlugModal
              modalState={modalStates.edit}
              toggleModal={toggleModal}
              slugId={slugId}
            />
            <DeleteSlugModal
              modalState={modalStates.delete}
              toggleModal={toggleModal}
              slugId={slugId}
            />
          </Dialog>
        </AlertDialog>
      </div>
    </>
  )
}

export default DashboardData
