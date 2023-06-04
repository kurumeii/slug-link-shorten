import { Ring } from "@uiball/loaders"
import { type FC } from "react"
import { cn } from "~/lib/utils"

type LoaderProp = {
  className?: string
  size?: number
  speed?: number
  lineWeight?: number
}

const Loader: FC<LoaderProp> = (props) => {
  const { className, size = 22, speed = 2, lineWeight = 3.5 } = props
  return (
    <div className={cn(className)}>
      <Ring size={size} speed={speed} lineWeight={lineWeight} />
    </div>
  )
}

export default Loader
