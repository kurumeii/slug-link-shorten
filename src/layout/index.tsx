import { type FC, type ReactNode } from "react"
import Footer from "~/components/layout/footer"
import Header from "~/components/layout/header"
import { ScrollArea } from "~/components/ui/scroll-area"

type Props = {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className='flex h-screen flex-col'>
      <Header />
      <ScrollArea className='flex-1'>{children}</ScrollArea>
      <Footer />
    </div>
  )
}

export default Layout
