import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandTabler,
  IconBrandTwitter,
  IconHash,
  IconLoader2,
  IconLogin,
  IconLogout,
  IconRocket,
  IconStar,
  IconSunset2,
  type TablerIconsProps,
} from "@tabler/icons-react"
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CloudMoonIcon,
  ExternalLinkIcon,
  MonitorSmartphoneIcon,
  UserIcon,
  type Icon as LucideIcon,
  CommandIcon,
  PlusIcon,
  BugIcon,
} from "lucide-react"
import { cn } from "~/lib/utils"

export type MyIcon = LucideIcon & TablerIconsProps

export const Icons = {
  external: ExternalLinkIcon,
  gitHub: IconBrandGithub,
  twitter: IconBrandTwitter,
  facebook: IconBrandFacebook,
  userPlaceholder: UserIcon,
  signIn: IconLogin,
  signOut: IconLogout,
  rocket: IconRocket,
  star: IconStar,
  chevronDown: ChevronDownIcon,
  chevronUp: ChevronUpIcon,
  darkThemeIcon: CloudMoonIcon,
  lightThemeIcon: IconSunset2,
  systemThemeIcon: MonitorSmartphoneIcon,
  loader: (props: TablerIconsProps) => (
    <IconLoader2 className={cn(props.className, "animate-spin")} {...props} />
  ),
  check: CheckIcon,
  hashtag: IconHash,
  dashboard: IconBrandTabler,
  command: CommandIcon,
  plus: PlusIcon,
  bug: BugIcon,
}
