import { Ring, Ping, Ripples } from "@uiball/loaders"
import { type FC } from "react"
import { cn } from "~/lib/utils"

type LoaderProp = {
  className?: string
  size?: number
  speed?: number
  lineWeight?: number
}

export const RingLoader: FC<LoaderProp> = (props) => {
  const { className, size = 22, speed = 2, lineWeight = 3.5 } = props
  return (
    <div className={cn(className)}>
      <Ring size={size} speed={speed} lineWeight={lineWeight} />
    </div>
  )
}

export const PingLoader: FC<LoaderProp> = (props) => {
  const { className, size = 22, speed = 2 } = props
  return (
    <div className={cn(className)}>
      <Ping size={size} speed={speed} />
    </div>
  )
}
export const RipplesLoader: FC<LoaderProp> = (props) => {
  const { className, size = 22, speed = 2 } = props
  return (
    <div className={cn(className)}>
      <Ripples size={size} speed={speed} />
    </div>
  )
}
