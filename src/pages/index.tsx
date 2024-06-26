import { type NextPage } from "next"
import Link from "next/link"
import React from "react"
import SlideUp from "~/components/framer-motions/SlideUp"
import { Icons } from "~/components/icons/Icons"
import { buttonVariants } from "~/components/ui/button"
import { cn } from "~/configs/lib/helpers"

const HomePage: NextPage = () => {
  return (
    <>
      <div className='flex flex-col items-center justify-center pb-20 pt-20 transition-all duration-100'>
        <SlideUp>
          <h1 className='m-2 text-center text-3xl md:mb-5 md:text-6xl'>
            Open Source Link Shortener
          </h1>
        </SlideUp>
        <SlideUp delay={0.2}>
          <h3 className='mb-6 text-xl text-muted-foreground md:text-2xl'>
            unlimited links & custom slugs
          </h3>
        </SlideUp>
        <SlideUp delay={0.4}>
          <div className='flex'>
            <Link
              href='/dashboard'
              className={cn(
                buttonVariants({
                  variant: "ghost",
                })
              )}
            >
              <Icons.rocket className='mr-2' />
              Getting Started
            </Link>
            <Link
              href='https://github.com/kurumeii/slug-link-shorten'
              target='_blank'
              rel='noreferrer'
              className={cn(
                buttonVariants({
                  variant: "ghost",
                })
              )}
            >
              <Icons.gitHub className='mr-2' />
              Source code
            </Link>
          </div>
        </SlideUp>
      </div>
    </>
  )
}

export default HomePage
