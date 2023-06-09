import { type FC, type ReactNode } from "react"
import Footer from "~/components/layout/footer"
import Header from "~/components/layout/header"
import { ScrollArea } from "~/components/ui/scroll-area"

type Props = {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <ScrollArea>
      <div className='flex h-screen flex-col'>
        <Header />
        {children}
        <Footer />
      </div>
    </ScrollArea>
  )
}

export default Layout
