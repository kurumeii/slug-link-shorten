import { useToast } from "~/components/ui/use-toast"
import { api } from "~/utils/api"
import useGetLink from "./useGetLink"

export default function useDeleteSlug() {
  const { toast } = useToast()
  const { refetch } = useGetLink("")
  return api.slug.deleteSlug.useMutation({
    onError: (err) =>
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      }),
    onSuccess: async () => {
      await refetch()
    },
  })
}
