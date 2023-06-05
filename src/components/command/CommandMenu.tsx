import { useEffect, useState, type FC } from "react"
import useCustomTheme from "~/hooks/useCustomTheme"
import { Icons, type MyIcon } from "../icons/Icons"
import { Button } from "../ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command"
import { useRouter } from "next/router"

const commandData: Array<{
  title: string
  href: string
  icon: MyIcon
}> = [
  { title: "Create new", href: "/dashboard/create-new", icon: Icons.plus },
  {
    title: "To dashboard",
    href: "/dashboard/create-new",
    icon: Icons.dashboard,
  },
  {
    title: "Report a bug",
    href: "https://github.com/kurumeii/slug-link-shorten/issues/new",
    icon: Icons.dashboard,
  },
  {
    title: "To the source code",
    href: "https://github.com/kurumeii/slug-link-shorten",
    icon: Icons.gitHub,
  },
  {
    title: "To my twitter page",
    href: "https://twitter.com/Kurumeii",
    icon: Icons.twitter,
  },
  {
    title: "To my facebook page",
    href: "https://facebook.com/nguyenphuc.hoanganh98/",
    icon: Icons.facebook,
  },
]

const CommandMenu: FC = () => {
  const [open, setOpen] = useState(false)
  const { changeTheme } = useCustomTheme()
  const { push } = useRouter()
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
        <Icons.command className='h-5 w-5' />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder='Type a command or search...' />
        <CommandList>
          <CommandEmpty>No command found.</CommandEmpty>
          <CommandGroup heading='Links'>
            {commandData.map(({ icon: Icon, title, href }, idx) => (
              <CommandItem key={idx} onSelect={() => void push(href)}>
                <Icon className='mr-2 h-4 w-4' />
                <span className='capitalize'>{title}</span>
              </CommandItem>
            ))}
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