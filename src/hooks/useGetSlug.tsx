import { api } from "~/utils/api"

export default function useGetSlug(slugId: string) {
  return api.slug.getSlug.useQuery(
    {
      slugId,
    },
    {
      enabled: slugId !== "",
      staleTime: 20 * 1000,
    }
  )
}
