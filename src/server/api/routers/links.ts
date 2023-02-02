import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

const createLinkSchema = z.object({
  url: z.string(),
  slug: z.string(),
  title: z.string(),
  icon: z.string(),
});

const updateLinkSchema = z.object({
  id: z.string(),
  url: z.string().optional(),
  title: z.string().optional(),
  icon: z.string().optional(),
});

const updateLinkPageShema = z.object({
  slug: z.string(),
  description: z.string().optional(),
  backgroundColor: z.string().optional(),
  backgroundImage: z.string().optional(),
});

export const linkRouter = createTRPCRouter({
  getPersonalLinkPage: protectedProcedure.query(async ({ ctx }) => {
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
          linkPage: {
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

  updateLink: protectedProcedure
    .input(updateLinkSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.link.update({
        where: {
          id: input.id,
        },
        data: {
          url: input.url,
          title: input.title,
          icon: input.icon,
        },
      });
    }),

  getLinkPage: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const links = await ctx.prisma.linkPage.findFirst({
        where: {
          slug: input.slug,
        },
        include: {
          links: true,
          user: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      });

      return links;
    }),

  addClick: publicProcedure
    .input(z.object({ linkId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.link.update({
        where: {
          id: input.linkId,
        },
        data: {
          clicks: {
            increment: 1,
          },
        },
      });
    }),
});
