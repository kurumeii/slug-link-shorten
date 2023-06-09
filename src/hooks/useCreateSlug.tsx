import { useRouter } from "next/router"
import { useToast } from "~/components/ui/use-toast"
import { api } from "~/utils/api"
import useGetLink from "./useGetLink"

export default function useCreateSlug() {
  const { toast } = useToast()
  const { push } = useRouter()
  const { refetch } = useGetLink("")
  return api.slug.createSlug.useMutation({
    onError: () =>
      toast({
        title: "Error",
        description:
          "Slug already exists. Please try another one or click 'Randomize' button.",
        variant: "destructive",
      }),
    onSuccess: async () => {
      toast({
        title: "Successful",
        description: "Link has created successfully",
        variant: "success",
        duration: 10 * 1000,
      })
      await refetch()
      await push("/dashboard")
    },
  })
}
