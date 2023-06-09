import { TRPCError } from "@trpc/server"
import { LinkSchemas } from "~/schema/schema"
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc"

export const dashboardRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(LinkSchemas.filterLink)
    .query(async ({ ctx, input }) => {
      try {
        const links = await ctx.prisma.link.findMany({
          where: {
            creatorId: ctx.session.user.id,
            AND:
              input.filter !== ""
                ? [
                    {
                      OR: [
                        {
                          url: { contains: input.filter, mode: "insensitive" },
                        },
                        {
                          slug: { contains: input.filter, mode: "insensitive" },
                        },
                        {
                          description: {
                            contains: input.filter,
                            mode: "insensitive",
                          },
                        },
                      ],
                    },
                  ]
                : undefined,
          },
          select: {
            creatorId: true,
            description: true,
            id: true,
            slug: true,
            url: true,
          },
        })
        if (!links)
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Can't find anything",
          })
        return {
          links,
        }
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
        })
      }
    }),
})
