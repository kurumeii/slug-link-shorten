import { z } from "zod"

export const LinkSchemas = {
  link: z.object({
    id: z.number(),
    url: z.string(),
    slug: z.string(),
    description: z.string(),
  }),
  createLink: z.object({
    url: z.string(),
    slug: z.string(),
    description: z.string(),
  }),
  editLink: z.object({
    url: z.string(),
    slug: z.string(),
    description: z.string(),
  }),
  filterLink: z.object({
    filter: z.string(),
  }),
  getSingleLink: z.object({
    linkId: z.number(),
  }),
}

export type LinkSchema = z.infer<(typeof LinkSchemas)["link"]>
export type CreateLinkInput = z.infer<(typeof LinkSchemas)["createLink"]>
export type EditLinkInput = z.infer<(typeof LinkSchemas)["editLink"]>
export type FilterLinkInput = z.infer<(typeof LinkSchemas)["filterLink"]>
