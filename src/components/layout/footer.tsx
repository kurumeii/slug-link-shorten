import Link from "next/link"
import { type FC } from "react"
import { Icons } from "../icons/Icons"
import { buttonVariants } from "../ui/button"
import { cn } from "~/lib/utils"
import ThemeSelect from "../theme-changer/ThemeSelect"

const Footer: FC = () => {
  return (
    <div className='fixed bottom-0 mb-6 mt-6 w-full text-muted-foreground'>
      <div className='container mx-auto flex items-center justify-between'>
        <div className='flex items-center space-x-1'>
          <ThemeSelect />
        </div>
        <div className='flex items-center space-x-1'>
          <p>⚡ Made by love using</p>
          <div className='flex items-center space-x-1'>
            <Link href='https://create.t3.gg/' rel='noreferrer' target='_blank'>
              T3 Stack
            </Link>
            <Icons.external className='h-3 w-3' />
          </div>
        </div>
        <div className='flex gap-2'>
          <Link
            href='https://twitter.com/Kurumeii'
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
            <Icons.twitter className='h-5 w-5 ' />
          </Link>
          <Link
            href='https://facebook.com/nguyenphuc.hoanganh98/'
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
            <Icons.facebook className='h-5 w-5 ' />
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
    </div>
  )
}

export default Footer
