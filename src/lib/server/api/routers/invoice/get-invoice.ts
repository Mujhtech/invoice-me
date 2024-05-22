import { z } from "zod";
import { t } from "../../trpc";
import { db } from "@/lib/server/db";

export const getInvoice = t.procedure
  .input(
    z.object({
      cid: z.string(),
    })
  )
  .query(async ({ ctx, input }) => {
    const invoice = await db.query.invoices.findFirst({
      where: (table, { and, eq, isNull }) =>
        and(eq(table.id, input.cid), isNull(table.deletedAt)),
    });

    if (!invoice) {
      throw new Error("Invoice not found");
    }

    const items = await db.query.invoiceItems.findMany({
      where: (table, { and, eq, isNull }) =>
        and(eq(table.invoiceId, invoice.id), isNull(table.deletedAt)),
    });

    const user = await db.query.invoiceUsers.findFirst({
      where: (table, { and, eq, isNull }) =>
        and(eq(table.id, invoice.invoiceUserId!), isNull(table.deletedAt)),
    });

    const client = await db.query.invoiceClients.findFirst({
      where: (table, { and, eq, isNull }) =>
        and(eq(table.id, invoice.invoiceClientId!), isNull(table.deletedAt)),
    });

    return {
      ...invoice,
      startDate: new Date(invoice.startDate),
      endDate: new Date(invoice.endDate),
      template: invoice.template as
        | "template_1"
        | "template_2"
        | "template_3"
        | "template_4",
      items: items.map((item) => ({
        ...item,
        price: parseFloat(item.price),
        tax: parseFloat(item.tax),
        discount: parseFloat(item.discount),
        totalAmount: parseFloat(item.price) * item.quantity,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        deletedAt: item.deletedAt,
      })),
      client: {
        ...client!,
        companyName: client?.companyName ?? undefined,
        phoneNumber: client?.phoneNumber ?? undefined,
        address2: client?.address2 ?? undefined,
        createdAt: client?.createdAt,
        updatedAt: client?.updatedAt,
        deletedAt: client?.deletedAt,
      },
      user: {
        ...user!,
        companyName: user?.companyName ?? undefined,
        phoneNumber: user?.phoneNumber ?? undefined,
        address2: user?.address2 ?? undefined,
        createdAt: user?.createdAt,
        updatedAt: user?.updatedAt,
        deletedAt: user?.deletedAt,
      },
    };
  });
