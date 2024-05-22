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

export const updateInvoice = t.procedure

  .input(
    InvoiceSchema.extend({
      client: InvoiceUserOrClientSchema,
      user: InvoiceUserOrClientSchema,
      items: z.array(InvoiceItemSchema),
    })
  )
  .mutation(async ({ ctx, input }) => {});
