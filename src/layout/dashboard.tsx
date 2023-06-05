import Link from "next/link"
import { type ReactNode, type FC } from "react"
import { Icons } from "~/components/icons/Icons"
import { buttonVariants } from "~/components/ui/button"
import { cn } from "~/lib/utils"

type Props = {
  children: ReactNode
}

const DashboardLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <div className='mt-5 border-b-2 border-border'>
        <div className='container  mx-auto flex items-center justify-between px-5 pb-3 md:px-0 '>
          <h1 className='text-3xl'>Dashboard</h1>
          <Link
            href='/dashboard/create-new'
            className={cn(
              buttonVariants({
                variant: "secondary",
              })
            )}
          >
            <Icons.plus className='mr-2' />
            Create new link
          </Link>
        </div>
      </div>
      <div className='container mx-auto pl-4 pr-4 md:pl-0 md:pr-0'>
        {children}
      </div>
    </>
  )
}

export default DashboardLayout
