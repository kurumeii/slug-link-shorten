import { twMerge } from "tailwind-merge"
import { type ClassNameValue } from "tailwind-merge/dist/lib/tw-join"

export function cn(...classLists: ClassNameValue[]) {
  return twMerge(classLists)
}
