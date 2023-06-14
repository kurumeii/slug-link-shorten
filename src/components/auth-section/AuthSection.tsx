import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { cn } from "~/lib/utils"
import { Icons } from "../icons/Icons"
import { Button, buttonVariants } from "../ui/button"

const AuthSection = () => {
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
              <Icons.hashtag className='mr-2 hidden h-5 w-5 md:block' />
              <Icons.userPlaceholder className='h-5 w-5 md:hidden' />
              <span className='hidden md:block'>{data?.user?.username}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='md:w-40 lg:w-52'>
            <DropdownMenuLabel className='md:hidden'>
              Hey, {data?.user?.username ?? data?.user?.email}
            </DropdownMenuLabel>
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
              onClick={() => void signOut({ callbackUrl: "/" })}
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
