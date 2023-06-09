import Link from "next/link"
import { Icons } from "../icons/Icons"
import ThemeSelect from "../theme-changer/ThemeSelect"

const Footer = () => {
  return (
    <footer className='z-20 flex w-full items-end justify-end px-6 py-3 text-muted-foreground'>
      <div className='container mx-auto flex flex-row-reverse items-center justify-between'>
        <div className='flex items-center space-x-1'>
          <ThemeSelect />
        </div>
        <div className='hidden items-center space-x-1 md:flex'>
          <span>⚡ Made by using</span>
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
