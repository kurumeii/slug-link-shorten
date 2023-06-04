import { motion, type MotionProps } from "framer-motion"
import { type FC } from "react"

type Props = {
  routerKey?: string
  children: React.ReactNode
}

const config: MotionProps = {
  initial: "initial",
  animate: "animate",
  variants: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
  },
}

const Appear: FC<Props> = ({ routerKey, children }) => {
  return (
    <motion.div key={routerKey} {...config}>
      {children}
    </motion.div>
  )
}

export default Appear
