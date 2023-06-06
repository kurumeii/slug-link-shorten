import { useSession } from "next-auth/react"
import { type FilterLinkInput } from "~/schema/schema"
import { api } from "~/utils/api"

export default function useGetLink(filter: FilterLinkInput["filter"]) {
  const { status } = useSession()
  return api.dashboard.getAll.useQuery(
    {
      filter,
    },
    {
      enabled: status === "authenticated",
    }
  )
}
