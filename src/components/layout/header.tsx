import Image from "next/image"
import Link from "next/link"
import { type FC } from "react"
import AuthSection from "../auth-section/AuthSection"
import CommandMenu from "../command/CommandMenu"
const Header: FC = () => {
  return (
    <header className='sticky top-0 z-20 w-full px-5 py-4 backdrop-blur-sm transition-all'>
      <div className='container mx-auto flex items-center justify-between px-4 md:px-0'>
        <Link href='/'>
          <div className='flex cursor-pointer items-center transition-all'>
            <Image
              src='/img/logo.png'
              alt='Logo'
              height={200}
              width={200}
              className='h-8 w-8'
            />
            <h1 className='ml-2 mr-2 text-xl'>slug</h1>
          </div>
        </Link>
        <div className='flex items-center justify-center gap-2 space-x-3'>
          <AuthSection />
          <CommandMenu />
        </div>
      </div>
    </header>
  )
}

export default Header
