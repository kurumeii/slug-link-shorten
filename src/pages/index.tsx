import { Check, ChevronDownIcon, ChevronsUpDown } from "lucide-react"
import { type NextPage } from "next"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"
import { Button } from "~/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/command"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"
import { Separator } from "~/components/ui/separator"
import { Textarea } from "~/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip"
import { cn } from "~/lib/utils"

const themes: Array<{
  value: string
  label: string
}> = [
  {
    value: "light",
    label: "Light",
  },
  {
    value: "dark",
    label: "Dark",
  },
  {
    value: "system",
    label: "System",
  },
]

const Home: NextPage = () => {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [value, setValue] = useState<string | null>()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
    setValue(theme)
  }, [theme])

  if (!mounted) {
    return null
  }
  return (
    <>
      <div className='container flex max-w-3xl flex-col items-center justify-center gap-12 px-4 py-16 '>
        <h1 className='text-5xl font-extrabold tracking-tight '>
          Show case <span className='text-purple-600'>T3</span> UI
        </h1>
        <div className='items flex flex-col gap-3'>
          <section className='flex flex-col items-center gap-x-2'>
            <h3 className='text-3xl font-bold uppercase tracking-wide'>
              Button
            </h3>
            <ol className='grid grid-flow-col gap-2'>
              <li>
                <Button variant={"default"}>Default</Button>
              </li>
              <li>
                <Button variant={"secondary"}>secondary</Button>
              </li>
              <li>
                <Button variant={"success"}>success</Button>
              </li>
              <li>
                <Button variant={"destructive"}>destructive</Button>
              </li>
              <li>
                <Button variant={"ghost"}>ghost</Button>
              </li>
              <li>
                <Button variant={"link"}>link</Button>
              </li>
              <li>
                <Button variant={"outline"}>outline</Button>
              </li>
            </ol>
          </section>
          <Separator />
          <section className='flex flex-col items-center gap-x-2'>
            <h3 className='text-3xl font-bold uppercase tracking-wide'>
              Input
            </h3>
            <ol className='grid w-full grid-flow-row gap-3.5'>
              <li>
                <div className='grid w-full items-center gap-1.5'>
                  <Label htmlFor='email-2'>Email</Label>
                  <Input type='email' id='email-2' placeholder='Email' />
                  <Alert variant={"destructive"}>
                    <AlertTitle>ERROR</AlertTitle>
                    <AlertDescription>
                      Enter your email address.
                    </AlertDescription>
                  </Alert>
                </div>
              </li>
              <li>
                <div className='grid w-full items-center gap-1.5'>
                  <Label htmlFor='text'>Text</Label>
                  <Input type='text' id='text' placeholder='Text' />
                  <Alert variant={"success"}>
                    <AlertTitle>NICE</AlertTitle>
                    <AlertDescription>Really cool</AlertDescription>
                  </Alert>
                </div>
              </li>
              <li>
                <div className='grid w-full items-center gap-1.5'>
                  <Label htmlFor='description'>Description</Label>
                  <Textarea id='description' placeholder='Description' />
                  <Alert variant={"default"}>
                    <AlertTitle>Should write something</AlertTitle>
                    <AlertDescription>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Illo odit sed temporibus odio nulla optio rerum veritatis,
                      eum assumenda praesentium. Explicabo vitae error inventore
                      rem dicta ipsam expedita culpa similique!
                    </AlertDescription>
                  </Alert>
                </div>
              </li>
            </ol>
          </section>
          <Separator />
          <section className='flex flex-col items-center gap-x-2'>
            <h3 className='text-3xl font-bold uppercase tracking-wide'>
              Dropdown
            </h3>
            <ol className='grid grid-flow-row gap-3.5'>
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant={"secondary"} rounded className='h-fit p-2'>
                      <ChevronDownIcon className='h-5 w-5 ' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            </ol>
          </section>
          <Separator />
          <section className='flex flex-col items-center gap-x-2'>
            <h3 className='text-3xl font-bold uppercase tracking-wide'>
              Combobox
            </h3>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  role='combobox'
                  aria-expanded={open}
                  className='w-[200px] justify-between'
                >
                  {value
                    ? themes.find((val) => val.value === value)?.label
                    : "Select theme..."}
                  <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-[200px] p-0'>
                <Command>
                  <CommandInput placeholder='Search for theme...' />
                  <CommandEmpty>No theme found.</CommandEmpty>
                  <CommandGroup>
                    {themes.map((val) => (
                      <CommandItem
                        key={val.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue)
                          setTheme(val.value)
                          setOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === val.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {val.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </section>
          <Separator />
          <section className='flex flex-col items-center gap-x-2'>
            <h3 className='text-3xl font-bold uppercase tracking-wide'>Text</h3>
            <ol className='grid w-full grid-flow-col gap-2'>
              <li>
                Muted:
                <div className='flex h-32 w-full items-center justify-center bg-muted text-muted-foreground'>
                  Background
                </div>
              </li>
              <li>
                Popover:
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className='flex h-32 w-full items-center justify-center bg-popover text-popover-foreground'>
                        Popover
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add to library</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
            </ol>
          </section>
          <Separator />
        </div>
      </div>
    </>
  )
}

export default Home
