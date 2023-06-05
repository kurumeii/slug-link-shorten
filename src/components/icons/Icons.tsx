import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandTwitter,
  type TablerIconsProps,
} from "@tabler/icons-react"
import { ExternalLinkIcon, type Icon as LucideIcon } from "lucide-react"

export type Icon = LucideIcon & TablerIconsProps

export const Icons = {
  external: ExternalLinkIcon,
  gitHub: IconBrandGithub,
  twitter: IconBrandTwitter,
  facebook: IconBrandFacebook,
}
