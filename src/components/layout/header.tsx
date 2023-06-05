import Image from "next/image"
import Link from "next/link"
import { type FC } from "react"
import { cn } from "~/lib/utils"
import { Icons } from "../icons/Icons"
import { buttonVariants } from "../ui/button"
const Header: FC = () => {
  return (
    <header className='sticky top-0 z-20 w-full bg-secondary/60 px-5 py-4 backdrop-blur-md transition-all'>
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
        <div className='flex items-center space-x-6'>
          <Link
            href='/signin'
            className={cn(
              buttonVariants({
                variant: "outline",
              })
            )}
          >
            Sign in
          </Link>

          <Link
            href='https://github.com/kurumeii/slug-link-shorten'
            rel='noreferrer'
            target='_blank'
            className={cn(
              buttonVariants({
                variant: "outline",
                rounded: true,
              }),
              "h-fit p-2 transition-transform hover:scale-110"
            )}
          >
            <Icons.gitHub className='h-5 w-5' />
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
