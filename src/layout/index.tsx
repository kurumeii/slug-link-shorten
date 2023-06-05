import { type FC, type ReactNode } from "react"
import Footer from "~/components/layout/footer"
import Header from "~/components/layout/header"

type Props = {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <div className='flex-1'>{children}</div>
      <Footer />
    </>
  )
}

export default Layout
