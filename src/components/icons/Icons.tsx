import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandTabler,
  IconBrandTwitter,
  IconDashboard,
  IconHash,
  IconListDetails,
  IconLoader2,
  IconLogin,
  IconLogout,
  IconRocket,
  IconSearch,
  IconStar,
  IconSunset2,
  type TablerIconsProps,
} from "@tabler/icons-react"
import {
  BugIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CloudMoonIcon,
  CommandIcon,
  ExternalLinkIcon,
  MonitorSmartphoneIcon,
  PlusIcon,
  UserIcon,
  type Icon as LucideIcon,
  LayoutDashboardIcon,
  LayoutGridIcon,
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
  search: IconSearch,
  dashboardLayout: LayoutGridIcon,
  listLayout: IconListDetails,
}
