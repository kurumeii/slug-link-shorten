import { useRouter } from "next/router"
import { useToast } from "~/components/ui/use-toast"
import { api } from "~/utils/api"

export default function useCreateSlug() {
  const { toast } = useToast()
  const { push } = useRouter()
  return api.slug.createSlug.useMutation({
    onError: (err) =>
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      }),
    onSuccess: ({ id }) => {
      toast({
        title: "Successful",
        description: "Link has created successfully with id " + id,
        variant: "success",
      })
      void push("/dashboard")
    },
  })
}
