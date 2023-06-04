import { type MotionProps } from "framer-motion"
import { type FC, type ReactNode } from "react"
import { motion } from "framer-motion"

type Props = {
  children: ReactNode
  delay?: number
}

const config: MotionProps = {
  initial: "initial",
  animate: {
    translateY: 0,
    opacity: 1,
  },
  transition: {
    duration: 0.5,
    delay: 500,
  },
}

const SlideUp: FC<Props> = ({ children, delay }) => {
  return (
    <motion.div
      {...config}
      transition={{
        ...config.transition,
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  )
}

export default SlideUp
