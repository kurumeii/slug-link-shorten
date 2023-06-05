import { type NextPage } from "next"
import Link from "next/link"
import React from "react"
import { buttonVariants } from "~/components/ui/button"

const HomePage: NextPage = () => {
  return (
    <>
      <div className='container flex max-w-3xl flex-col items-center justify-center gap-12 px-4 py-16'>
        Homepage
        <Link
          href={"/showcase"}
          className={buttonVariants({ variant: "default", size: "lg" })}
        >
          To showcase
        </Link>
      </div>
    </>
  )
}

export default HomePage
