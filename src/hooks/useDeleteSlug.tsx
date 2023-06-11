import { useToast } from "~/components/ui/use-toast"
import { api } from "~/utils/api"
import useGetAll from "./useGetAll"

export default function useDeleteSlug() {
  const { toast } = useToast()
  const { refetch } = useGetAll("")
  return api.slug.deleteSlug.useMutation({
    onError: (err) =>
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      }),
    onSuccess: async () => {
      toast({
        title: "Successful",
        description: "Link deleted successfully",
        variant: "success",
      })
      await refetch()
    },
  })
}
