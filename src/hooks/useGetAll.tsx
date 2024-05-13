import { useSession } from "next-auth/react"
import { type FilterLinkInput } from "~/configs/schema/schema"
import { api } from "~/utils/api"

export default function useGetAll(filter: FilterLinkInput["filter"]) {
  const { status } = useSession()
  return api.dashboard.getAll.useQuery(
    {
      filter
    },
    {
      enabled: status === "authenticated",
      staleTime: 20 * 1000,
    }
  )
}
