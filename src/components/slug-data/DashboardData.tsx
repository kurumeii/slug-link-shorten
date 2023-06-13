import { useState } from "react"
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

import useGetAll from "~/hooks/useGetAll"
import { type ToggleModal } from "~/types"
import Appear from "../framer-motions/Appear"
import DeleteSlugModal from "../modals/DeleteSlugModal"
import EditSlugModal from "../modals/EditSlugModal"
import { Button } from "../ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"
import { useToast } from "../ui/use-toast"

const DashboardData = () => {
  const { toast } = useToast()
  const [slugId, setSlugId] = useState("")
  const [modalStates, setModalStates] = useState({
    delete: false,
    edit: false,
  })
  const { data } = useGetAll("")
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

  const toggleModal: ToggleModal = ({ modalType, state }) => {
    setModalStates((prev) => ({
      ...prev,
      [modalType]: state,
    }))
  }

  const slugData = data && data.links

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
            {slugData?.map((sd) => (
              <Appear key={sd.id}>
                <Card className='h-full'>
                  <CardHeader>
                    <CardTitle className='inline-flex items-center justify-between gap-2'>
                      <a
                        className='flex cursor-pointer items-center gap-2'
                        href={`${window.location.origin}/s/${sd.slug}`}
                        target='_blank'
                      >
                        /s/{sd.slug}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant={"ghost"}
                                className='h-fit w-fit p-2'
                                onClick={() => void copyToClipboard(sd.slug)}
                              >
                                <Icons.clipboard className='h-5 w-5' />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Click to copy to clipboard</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </a>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Icons.options />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end' className=''>
                          <a
                            href={`${window.location.origin}/s/${sd.slug}`}
                            target='_blank'
                          >
                            <DropdownMenuItem>
                              Open in new tab
                              <DropdownMenuShortcut>
                                <Icons.external className='ml-2 h-4 w-4' />
                              </DropdownMenuShortcut>
                            </DropdownMenuItem>
                          </a>
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
            <EditSlugModal toggleModal={toggleModal} slugId={slugId} />
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
