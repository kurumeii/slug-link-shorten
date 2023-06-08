import Link from "next/link"
import { useRouter } from "next/router"
import { buttonVariants } from "~/components/ui/button"
import { ToastAction } from "~/components/ui/toast"
import { useToast } from "~/components/ui/use-toast"
import { cn } from "~/lib/utils"
import { api } from "~/utils/api"

export default function useCreateSlug() {
  const { toast } = useToast()
  const { push } = useRouter()
  return api.slug.createSlug.useMutation({
    onError: () =>
      toast({
        title: "Error",
        description:
          "Slug already exists. Please try another one or click 'Randomize' button.",
        variant: "destructive",
      }),
    onSuccess: ({ id }) => {
      toast({
        title: "Successful",
        description: "Link has created successfully, go check this out",
        action: (
          <ToastAction
            altText="Let's go"
            onClick={() => void push(`/slug/${id}`)}
          >
            Let&apos;s go
          </ToastAction>
        ),
        variant: "success",
        duration: 10 * 1000,
      })
      void push("/dashboard")
    },
  })
}
