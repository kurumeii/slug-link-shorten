import { useEffect, type FC, useState } from "react"
import useCustomTheme from "~/hooks/useCustomTheme"
import { Icons } from "../icons/Icons"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

const ThemeSelect: FC = () => {
  const { changeTheme, isSystemDevice, isDarkTheme } = useCustomTheme()
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e?.metaKey || e?.ctrlKey) && e?.key === "l") {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='sm'>
          {isSystemDevice ? (
            <Icons.systemThemeIcon className='' />
          ) : isDarkTheme ? (
            <Icons.darkThemeIcon className='' />
          ) : (
            <Icons.lightThemeIcon className='' />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' sideOffset={20}>
        <DropdownMenuItem onClick={() => changeTheme("light")}>
          <Icons.lightThemeIcon className='mr-2 h-4 w-4' />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeTheme("dark")}>
          <Icons.darkThemeIcon className='mr-2 h-4 w-4' />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeTheme("system")}>
          <Icons.systemThemeIcon className='mr-2 h-4 w-4' />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ThemeSelect
