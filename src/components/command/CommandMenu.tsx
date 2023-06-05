import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react"
import { useEffect, useState, type FC } from "react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "../ui/command"
import { Icons } from "../icons/Icons"
import { Button } from "../ui/button"
import useCustomTheme from "~/hooks/useCustomTheme"

const CommandMenu: FC = () => {
  const [open, setOpen] = useState(false)
  const { changeTheme } = useCustomTheme()
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e?.metaKey || e?.ctrlKey) && e?.key === "k") {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <Button variant={"ghost"} onClick={() => setOpen(true)}>
        Command
        <kbd className='mx-1.5 inline-flex select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-sm text-muted-foreground opacity-100'>
          <Icons.command className='h-3 w-3' />+ K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder='Type a command or search...' />
        <CommandList>
          <CommandEmpty>No command found.</CommandEmpty>
          <CommandGroup heading='Links'>
            <CommandItem>
              <Icons.plus className='mr-2 h-4 w-4' />
              <span>Create new</span>
            </CommandItem>
            <CommandItem>
              <Icons.dashboard className='mr-2 h-4 w-4' />
              <span>To dashboard</span>
            </CommandItem>
            <CommandItem>
              <Icons.bug className='mr-2 h-4 w-4' />
              <span>Report a bug</span>
            </CommandItem>
            <CommandItem>
              <Icons.gitHub className='mr-2 h-4 w-4' />
              <span>To the source code</span>
            </CommandItem>
            <CommandItem>
              <Icons.twitter className='mr-2 h-4 w-4' />
              <span>To my twitter page</span>
            </CommandItem>
            <CommandItem>
              <Icons.facebook className='mr-2 h-4 w-4' />
              <span>To my facebook page</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading='Settings'>
            <CommandItem onSelect={() => changeTheme("light")}>
              <Icons.lightThemeIcon className='mr-2 h-4 w-4' />
              <span>Set light theme</span>
            </CommandItem>
            <CommandItem onSelect={() => changeTheme("dark")}>
              <Icons.darkThemeIcon className='mr-2 h-4 w-4' />
              <span>Set dark theme</span>
            </CommandItem>
            <CommandItem onSelect={() => changeTheme("system")}>
              <Icons.systemThemeIcon className='mr-2 h-4 w-4' />
              <span>Set theme based on device</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default CommandMenu
