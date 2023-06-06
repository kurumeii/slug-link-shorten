import { type FC } from "react"
import { useAppSelector } from "~/hooks/useRedux"
import DashboardData from "./DashboardData"
import ListData from "./ListData"

const SlugData: FC = () => {
  const { mode } = useAppSelector((s) => s.layout)
  if (mode === "Dashboard") return <DashboardData />
  if (mode === "List") return <ListData />
}

export default SlugData
