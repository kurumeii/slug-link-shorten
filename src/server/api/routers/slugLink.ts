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
  editSlug: protectedProcedure
    .input(LinkSchemas.editLink)
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.link.update({
          where: {
            id: input.slugId,
          },
          data: {
            url: input.url,
            description: input.description,
          },
        })
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error as string,
        })
      }
    }),
  getSlug: protectedProcedure
    .input(LinkSchemas.getSingleLink)
    .query(async ({ ctx, input }) => {
      try {
        const data = await ctx.prisma.link.findUnique({
          where: {
            id: input.slugId,
          },
        })
        if (!data)
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Cannot find the data",
          })
        return {
          ...data,
        }
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error as string,
        })
      }
    }),
})
