import Link from "next/link"
import { useRouter } from "next/router"
import { buttonVariants } from "~/components/ui/button"
import { useToast } from "~/components/ui/use-toast"
import { cn } from "~/lib/utils"
import { api } from "~/utils/api"

export default function useCreateSlug() {
  const { toast } = useToast()
  const { push } = useRouter()
  return api.slug.createSlug.useMutation({
    onSuccess: ({ id }) => {
      toast({
        title: "Successful",
        description: (
          <div>
            Link has created successfully, go check this out
            <Link
              href={`/slug/${id}`}
              className={cn(
                buttonVariants({
                  variant: "link",
                })
              )}
            >
              Let&apos;s go
            </Link>
          </div>
        ),
        variant: "success",
      })
      void push("/dashboard")
    },
  })
}
