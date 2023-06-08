import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { type FilterLinkInput } from "~/schema/schema"
import { api } from "~/utils/api"
import { useAppDispatch } from "./useRedux"
import { setSlugData } from "~/slices/slugSlice"

export default function useGetLink(filter: FilterLinkInput["filter"]) {
  const { status } = useSession()
  const dispatch = useAppDispatch()

  const getAllQuery = api.dashboard.getAll.useQuery(
    {
      filter,
    },
    {
      enabled: status === "authenticated",
      staleTime: 20 * 1000,
    }
  )

  useEffect(() => {
    if (getAllQuery.data) {
      dispatch(
        setSlugData({
          slugData: getAllQuery.data.links,
        })
      )
    }
  }, [dispatch, getAllQuery.data, getAllQuery.data?.links])

  return getAllQuery
}
