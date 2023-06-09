import { type FC, type ReactNode } from "react"
import Footer from "~/components/layout/footer"
import Header from "~/components/layout/header"

type Props = {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className='flex h-screen flex-col'>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
