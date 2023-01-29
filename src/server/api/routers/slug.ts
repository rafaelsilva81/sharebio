import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const slugRouter = createTRPCRouter({
  getSlug: protectedProcedure.query(async ({ ctx }) => {
    const slug = await ctx.prisma.slug.findFirst({
      where: {
        User: {
          every: {
            id: ctx.session.user.id,
          },
        },
      },
    });

    return slug;
  }),

  checkSlug: publicProcedure
    .input(z.object({ slug: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const exists = await ctx.prisma.slug.findFirst({
        where: {
          url: input.slug,
        },
      });

      return exists ? true : false;
    }),

  createSlug: protectedProcedure
    .input(z.object({ slug: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const slug = await ctx.prisma.slug.create({
        data: {
          url: input.slug,
          User: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });

      return slug;
    }),
});
