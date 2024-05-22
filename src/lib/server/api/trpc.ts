import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";

import type { Context } from "./context";

export const t = initTRPC.context<Context>().create({ transformer: superjson });

export const auth = t.middleware(({ next, ctx }) => {
  // if (!ctx.user?.id) {
  //   throw new TRPCError({ code: "UNAUTHORIZED" });
  // }

  return next({
    ctx: {
      prisma: ctx.prisma,
      // user: ctx.user,
      // tenant: ctx.tenant ?? { id: ctx.user.id, role: "owner" },
    },
  });
});

// import { initTRPC } from "@trpc/server";
// import superjson from "superjson";
// import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
// import { prisma } from "../db";

// type CreateContextOptions = Record<string, never>;

// const createInnerTRPCContext = (_opts: CreateContextOptions) => {
//   return {
//     prisma,
//   };
// };

// export const createTRPCContext = (_opts: CreateNextContextOptions) => {
//   return createInnerTRPCContext({});
// };

// const t = initTRPC.context<typeof createTRPCContext>().create({
//   transformer: superjson,
//   errorFormatter({ shape }) {
//     return shape;
//   },
// });

// export const createTRPCRouter = t.router;
// export const publicProcedure = t.procedure;
