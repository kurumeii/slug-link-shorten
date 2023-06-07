import Link from "next/link"
import { useAppSelector } from "~/hooks/useRedux"
import { Icons } from "../icons/Icons"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { useToast } from "../ui/use-toast"
import { useRouter } from "next/router"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"

const DashboardData = () => {
  const { slugData } = useAppSelector((s) => s.slugs)
  const { toast } = useToast()
  const { push } = useRouter()
  const copyToClipboard = async (txt: string) => {
    const link = `/s/${txt}`
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
      description: "Copied to clipboard",
      duration: 1000,
    })
  }
  return (
    <>
      <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3'>
        {slugData.map((sd) => (
          <Card key={sd.id}>
            <CardHeader>
              <CardTitle className='inline-flex items-center justify-between gap-2'>
                <span
                  className='cursor-pointer'
                  onClick={() => void copyToClipboard(sd.slug)}
                >
                  /s/{sd.slug}
                </span>
                <Dialog>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Icons.options />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end' className=''>
                      <DropdownMenuItem
                        onClick={() => void push(`/s/${sd.slug}`)}
                      >
                        Open in new tab
                        <DropdownMenuShortcut>
                          <Icons.external className='ml-2 h-4 w-4' />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DialogTrigger asChild>
                        <DropdownMenuItem>
                          Edit
                          <DropdownMenuShortcut>
                            <Icons.edit className='ml-2 h-4 w-4' />
                          </DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </DialogTrigger>
                      <DropdownMenuItem className='text-destructive focus:bg-destructive focus:text-destructive-foreground'>
                        Delete
                        <DropdownMenuShortcut>
                          <Icons.delete className='ml-2 h-4 w-4' />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </CardTitle>
              <CardDescription className='truncate'>{sd.url}</CardDescription>
            </CardHeader>
            <CardFooter>{sd.description}</CardFooter>
          </Card>
        ))}
      </div>
    </>
  )
}

export default DashboardData
