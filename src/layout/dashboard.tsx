import { type FC, type ReactNode } from "react"
import { Separator } from "~/components/ui/separator"

type Props = {
  children: ReactNode
}

const DashboardLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <div className='container mt-5 px-5'>
        <div className='mx-auto flex items-center justify-between px-5 pb-3 '>
          <h1 className='text-3xl'>Dashboard</h1>
        </div>
        <Separator />
        <div className='mx-auto px-4'>{children}</div>
      </div>
    </>
  )
}

export default DashboardLayout
