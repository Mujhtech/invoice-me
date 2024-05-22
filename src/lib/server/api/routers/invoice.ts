// import { z } from "zod";
// import { t } from "../trpc";
// import { customAlphabet } from "nanoid";
// import {
//   InvoiceItemSchema,
//   InvoiceSchema,
//   InvoiceUserOrClientSchema,
// } from "./type";

// export const nanoid = customAlphabet(
//   "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
// );

// export const invoiceRouter = createTRPCRouter({
//   /**
//    * Queries
//    */
//   getInvoice: publicProcedure
//     .input(
//       z.object({
//         cid: z.string(),
//       })
//     )
//     .query(({ input, ctx }) => {
//       return ctx.prisma.invoice.findFirst({
//         where: {
//           cid: input.cid,
//         },
//         include: {
//           items: true,
//           client: true,
//           user: true,
//         },
//       });
//     }),
//   //   drafts: publicProcedure.query(({ ctx }) => {
//   //     return ctx.prisma.post.findMany({
//   //       where: {
//   //         published: false,
//   //       },
//   //       include: {
//   //         author: true,
//   //       },
//   //     });
//   //   }),
//   //   postById: publicProcedure
//   //     .input(
//   //       z.object({
//   //         id: z.number(),
//   //       })
//   //     )
//   //     .query(({ ctx, input }) => {
//   //       return ctx.prisma.post.findUnique({
//   //         where: {
//   //           id: input.id,
//   //         },
//   //         include: {
//   //           author: true,
//   //         },
//   //       });
//   //     }),
//   /**
//    * This query isn't used in the app but it's useful for learning how to filter data with Prisma
//    */
//   //   filterPosts: publicProcedure
//   //     .input(
//   //       z.object({
//   //         searchString: z.string().nullable(),
//   //       })
//   //     )
//   //     .query(({ ctx, input }) => {
//   //       const or = input.searchString
//   //         ? {
//   //             OR: [
//   //               { title: { contains: input.searchString } },
//   //               { content: { contains: input.searchString } },
//   //             ],
//   //           }
//   //         : {};
//   //       return prisma.post.findMany({
//   //         where: { ...or },
//   //       });
//   //     }),
//   /**
//    * mutations
//    */
//   createInvoice: publicProcedure
//     .input(InvoiceSchema)
//     .mutation(({ input, ctx }) => {
//       return ctx.prisma.invoice.create({
//         data: {
//           cid: `inv_${nanoid(22)}`,
//           title: input.title,
//           invoiceNumber: input.invoiceNumber,
//           currency: input.currency,
//           startDate: input.startDate,
//           endDate: input.endDate,
//           invoiceClientId: input.invoiceClientId,
//           invoiceUserId: input.invoiceUserId,
//           status: input.status,
//           template: input.template,
//           memo: input.memo,
//         },
//       });
//     }),
//   createInvoiceItem: publicProcedure
//     .input(InvoiceItemSchema)
//     .mutation(({ input, ctx }) => {
//       return ctx.prisma.invoiceItem.create({
//         data: {
//           invoiceId: input.invoiceId,
//           title: input.title,
//           price: input.price,
//           quantity: input.quantity,
//           discount: input.discount,
//           tax: input.tax,
//         },
//       });
//     }),
//   createInvoiceClient: publicProcedure
//     .input(InvoiceUserOrClientSchema)
//     .mutation(({ input, ctx }) => {
//       return ctx.prisma.invoiceClientInformation.create({
//         data: {
//           firstname: input.firstname,
//           lastname: input.lastname,
//           companyName: input.companyName,
//           email: input.email,
//           country: input.country,
//           state: input.state,
//           city: input.city,
//           postalCode: input.postalCode,
//           address: input.address,
//           address2: input.address2,
//           phoneNumber: input.phoneNumber,
//         },
//       });
//     }),
//   createInvoiceUser: publicProcedure
//     .input(InvoiceUserOrClientSchema)
//     .mutation(({ input, ctx }) => {
//       return ctx.prisma.invoiceUserInformation.create({
//         data: {
//           firstname: input.firstname,
//           lastname: input.lastname,
//           companyName: input.companyName,
//           email: input.email,
//           country: input.country,
//           state: input.state,
//           city: input.city,
//           postalCode: input.postalCode,
//           address: input.address,
//           address2: input.address2,
//           phoneNumber: input.phoneNumber,
//         },
//       });
//     }),
//   //   deletePost: publicProcedure
//   //     .input(
//   //       z.object({
//   //         id: z.number(),
//   //       })
//   //     )
//   //     .mutation(({ ctx, input }) => {
//   //       return ctx.prisma.post.delete({
//   //         where: {
//   //           id: input.id,
//   //         },
//   //       });
//   //     }),
// });
