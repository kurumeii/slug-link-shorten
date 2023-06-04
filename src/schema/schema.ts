import { z } from "zod"

const LinkSchemas = {
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

export type LinkSchema = z.TypeOf<(typeof LinkSchemas)["link"]>
export type CreateLinkInput = z.TypeOf<(typeof LinkSchemas)["createLink"]>
export type EditLinkInput = z.TypeOf<(typeof LinkSchemas)["editLink"]>
export type FilterLinkInput = z.TypeOf<(typeof LinkSchemas)["filterLink"]>
