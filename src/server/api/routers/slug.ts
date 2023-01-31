import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const slugRouter = createTRPCRouter({
  checkSlug: publicProcedure
    .input(z.object({ slug: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const exists = await ctx.prisma.linkPage.findFirst({
        where: {
          slug: input.slug,
        },
      });

      return exists ? true : false;
    }),

  createSlug: protectedProcedure
    .input(z.object({ slug: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.linkPage
        .create({
          data: {
            slug: input.slug,
            user: {
              connect: {
                id: ctx.session.user.id,
              },
            },
          },
        })
        .catch((err) => {
          console.log(err);
        });
    }),
});
