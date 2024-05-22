import { z } from "zod";
import { t } from "../../trpc";
import { customAlphabet } from "nanoid";
import {
  InvoiceItemSchema,
  InvoiceSchema,
  InvoiceUserOrClientSchema,
} from "../type";
import { db, schema } from "@/lib/server/db";

export const nanoid = customAlphabet(
  "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
);

export const createInvoice = t.procedure

  .input(
    InvoiceSchema.extend({
      client: InvoiceUserOrClientSchema,
      user: InvoiceUserOrClientSchema,
      items: z.array(InvoiceItemSchema),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const invoiceId = `inv_${nanoid(22)}`;
    const userId = `usr_${nanoid(22)}`;
    const clientId = `clt_${nanoid(22)}`;

    await db.insert(schema.invoiceClients).values({
      id: clientId,
      firstname: input.client.firstname,
      lastname: input.client.lastname,
      companyName: input.client.companyName,
      email: input.client.email,
      country: input.client.country,
      state: input.client.state,
      city: input.client.city,
      postalCode: input.client.postalCode,
      address: input.client.address,
      address2: input.client.address2,
      phoneNumber: input.client.phoneNumber,
    });

    await db.insert(schema.invoiceUsers).values({
      id: userId,
      firstname: input.user.firstname,
      lastname: input.user.lastname,
      companyName: input.user.companyName,
      email: input.user.email,
      country: input.user.country,
      state: input.user.state,
      city: input.user.city,
      postalCode: input.user.postalCode,
      address: input.user.address,
      address2: input.user.address2,
      phoneNumber: input.user.phoneNumber,
    });

    await db.insert(schema.invoices).values({
      id: invoiceId,
      title: input.title,
      invoiceNumber: input.invoiceNumber,
      currency: input.currency,
      startDate: input.startDate.toString(),
      endDate: input.endDate.toString(),
      invoiceClientId: clientId,
      invoiceUserId: userId,
      status: input.status as "created" | "drafted" | "paid",
      template: input.template.toString(),
      memo: input.memo,
    });

    await Promise.all(
      input.items.map((item) => {
        const itemId = `itm_${nanoid(22)}`;

        return db.insert(schema.invoiceItems).values({
          id: itemId,
          invoiceId: invoiceId,
          title: item.title,
          price: item.price.toString(),
          quantity: item.quantity,
          discount: item.discount.toString(),
          tax: item.tax.toString(),
        });
      })
    );

    return {
      id: invoiceId,
    };
  });
