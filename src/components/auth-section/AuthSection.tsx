import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { type FC } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { cn } from "~/lib/utils"
import { Icons } from "../icons/Icons"
import { Button, buttonVariants } from "../ui/button"

const AuthSection: FC = () => {
  const { status, data } = useSession()
  return (
    <>
      {status === "loading" ? (
        <Icons.loader className='mr-2' />
      ) : status === "unauthenticated" ? (
        <Link
          href={"/signin"}
          className={cn(
            buttonVariants({
              variant: "ghost",
            }),
            "w-full"
          )}
        >
          <Icons.signIn className='mr-2 h-5 w-5' />
          Sign in
        </Link>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"}>
              <Icons.hashtag className='mr-2 h-5 w-5' />
              {data?.user?.username}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='md:w-40 lg:w-52'>
            <Link href='/dashboard' passHref legacyBehavior>
              <DropdownMenuItem>
                Dashboard
                <DropdownMenuShortcut>
                  <Icons.dashboard className='h-5 w-5' />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='text-destructive focus:bg-destructive focus:text-destructive-foreground'
              onClick={() => void signOut({ callbackUrl: "/signin" })}
            >
              Sign out
              <DropdownMenuShortcut>
                <Icons.signOut className='h-5 w-5' />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  )
}

export default AuthSection
