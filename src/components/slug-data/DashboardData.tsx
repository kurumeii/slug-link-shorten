import React from "react"
import { useAppSelector } from "~/hooks/useRedux"

const DashboardData = () => {
  const { slugData } = useAppSelector((s) => s.slugs)

  return <div>DashboardData</div>
}

export default DashboardData
