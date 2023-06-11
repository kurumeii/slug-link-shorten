import Link from "next/link"
import { type FC } from "react"
import { Icons } from "../icons/Icons"
import ThemeSelect from "../theme-changer/ThemeSelect"

const Footer: FC = () => {
  return (
    <footer className='z-20 flex w-full items-end justify-end px-6 py-3 text-muted-foreground'>
      <div className='container mx-auto flex flex-row-reverse items-center justify-between'>
        <div className='flex items-center space-x-1'>
          <ThemeSelect />
        </div>
        <div className='flex items-center space-x-1 '>
          <p>⚡ Made by using</p>
          <div className='flex items-center space-x-1'>
            <Link
              href='https://create.t3.gg/'
              rel='noreferrer'
              target='_blank'
              className='font-semibold'
            >
              T3 Stack
            </Link>
            <Icons.external className='h-3 w-3' />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
