import { useTheme } from "next-themes"
import { type FC, useEffect, useState } from "react"
import { cn } from "~/lib/utils"
import { type MyIcon, Icons } from "../icons/Icons"
import { Button } from "../ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

const themes: Array<{
  value: string
  label: string
  icon: MyIcon
}> = [
  {
    value: "light",
    label: "Light",
    icon: Icons.lightThemeIcon,
  },
  {
    value: "dark",
    label: "Dark",
    icon: Icons.darkThemeIcon,
  },
  {
    value: "system",
    label: "System",
    icon: Icons.systemThemeIcon,
  },
]

const ThemeCommand: FC = () => {
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
          <Icons.chevronDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder='Search for theme...' />
          <CommandEmpty>No theme found.</CommandEmpty>
          <CommandGroup>
            {themes.map(({ label, value, icon: Icon }) => (
              <CommandItem
                key={value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setTheme(value)
                  setOpen(false)
                }}
              >
                <Icon className={cn("mr-2 h-4 w-4")} />
                {label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default ThemeCommand
