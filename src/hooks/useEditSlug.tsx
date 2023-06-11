import { useToast } from "~/components/ui/use-toast"
import { api } from "~/utils/api"

export default function useEditSlug() {
  const { toast } = useToast()
  const apiContext = api.useContext()
  return api.slug.editSlug.useMutation({
    onError: (err) =>
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      }),
    onSuccess: async () => {
      toast({
        title: "Congratz",
        description: "Link has been edited successfully",
        variant: "success",
      })
      await apiContext.slug.invalidate()
      await apiContext.dashboard.invalidate()
    },
  })
}
