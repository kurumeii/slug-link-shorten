import { TRPCError } from "@trpc/server"
import { LinkSchemas } from "~/schema/schema"
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc"

export const slugRouter = createTRPCRouter({
  createSlug: protectedProcedure
    .input(LinkSchemas.createLink)
    .mutation(async ({ ctx, input }) => {
      try {
        const findExistSlug = await ctx.prisma.link.count({
          where: {
            slug: input.slug,
          },
        })
        if (findExistSlug > 0)
          throw new TRPCError({
            code: "BAD_REQUEST",
            message:
              "Slug already exists. Please try another one or click 'Randomize' button.",
          })
        return await ctx.prisma.link.create({
          data: {
            slug: input.slug,
            url: input.url,
            description: input.description,
            creatorId: ctx.session.user.id,
          },
        })
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
        })
      }
    }),
})
