import { TRPCError } from "@trpc/server"
import { LinkSchemas } from "~/schema/schema"
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc"

export const slugRouter = createTRPCRouter({
  createSlug: protectedProcedure
    .input(LinkSchemas.createLink)
    .mutation(async ({ ctx, input }) => {
      try {
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
          message: error as string,
        })
      }
    }),
  deleteSlug: protectedProcedure
    .input(LinkSchemas.getSingleLink)
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.link.delete({
          where: {
            id: input.slugId,
          },
        })
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error as string,
        })
      }
    }),
})
