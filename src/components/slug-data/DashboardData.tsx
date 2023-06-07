import { zodResolver } from "@hookform/resolvers/zod"
import { nanoid } from "@reduxjs/toolkit"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { type z } from "zod"
import { useAppSelector } from "~/hooks/useRedux"
import { LinkSchemas } from "~/schema/schema"
import { Icons } from "../icons/Icons"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog"
import { Button } from "../ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { useToast } from "../ui/use-toast"

const slugZodchema = LinkSchemas.link.pick({ slug: true })
type SlugSchemas = z.infer<typeof slugZodchema>

const DashboardData = () => {
  const [random, setRandom] = useState("")
  const { slugData } = useAppSelector((s) => s.slugs)
  const { toast } = useToast()
  const { push } = useRouter()

  const form = useForm<SlugSchemas>({
    resolver: zodResolver(slugZodchema),
    defaultValues: {
      slug: "",
    },
  })

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

  useEffect(() => {
    const randomize = nanoid(5)
    setRandom(randomize)
  }, [])

  const onSubmitFn = (data: SlugSchemas) => {
    console.log(JSON.stringify(data, null, 2))
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
                <AlertDialog>
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
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem className='text-destructive focus:bg-destructive focus:text-destructive-foreground'>
                            Delete
                            <DropdownMenuShortcut>
                              <Icons.delete className='ml-2 h-4 w-4' />
                            </DropdownMenuShortcut>
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
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
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action is irreversible.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <div className='mb-5'>
                        <p>Enter the following to confirm:</p>
                        <span className='text-muted-foreground'>{random}</span>
                        <Form {...form}>
                          <form
                            noValidate
                            onSubmit={(event) =>
                              void form.handleSubmit(onSubmitFn)(event)
                            }
                            className='flex h-full flex-1 flex-col'
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
                              <Button variant='secondary' type='button'>
                                Cancel
                              </Button>
                              <Button variant='destructive' type='submit'>
                                Delete link
                              </Button>
                            </div>
                          </form>
                        </Form>
                      </div>
                    </AlertDialogContent>
                  </Dialog>
                </AlertDialog>
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
