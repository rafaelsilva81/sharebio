import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

const createLinkSchema = z.object({
  url: z.string(),
  slug: z.string(),
  title: z.string(),
  icon: z.string(),
});

const updateLinkPageShema = z.object({
  slug: z.string(),
  description: z.string().optional(),
  backgroundColor: z.string().optional(),
  backgroundImage: z.string().optional(),
});

export const linkRouter = createTRPCRouter({
  getLinkPage: protectedProcedure.query(async ({ ctx }) => {
    const links = await ctx.prisma.linkPage.findFirst({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        links: true,
      },
    });

    return links;
  }),

  addLink: protectedProcedure
    .input(createLinkSchema)
    .mutation(async ({ ctx, input }) => {
      const newlink = await ctx.prisma.link.create({
        data: {
          url: input.url,
          icon: input.icon,
          title: input.title,
          LinkPage: {
            connect: {
              slug: input.slug,
            },
          },
        },
      });

      return newlink;
    }),

  updateLinkPageOptions: protectedProcedure
    .input(updateLinkPageShema)
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.linkPage.update({
        where: {
          slug: input.slug,
        },
        data: {
          description: input.description,
          backgroundColor: input.backgroundColor,
          backgroundImage: input.backgroundImage,
        },
      });
    }),

  deleteLink: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.link.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
