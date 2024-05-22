import { z } from "zod";

export const InvoiceUserOrClientSchema = z.object({
  id: z.string().optional(),
  firstname: z.string(),
  lastname: z.string(),
  companyName: z.string().optional(),
  email: z.string(),
  country: z.string(),
  state: z.string(),
  city: z.string(),
  postalCode: z.string(),
  address: z.string(),
  address2: z.string().optional(),
  phoneNumber: z.string().optional(),
  createdAt: z.date().nullable().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
});

export type InvoiceUserOrClient = z.infer<typeof InvoiceUserOrClientSchema>;

export const InvoiceItemSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  price: z.number(),
  quantity: z.number(),
  discount: z.number(),
  tax: z.number(),
  totalAmount: z.number().default(0),
  createdAt: z.date().nullable().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
});

export type InvoiceItem = z.infer<typeof InvoiceItemSchema>;

export const InvoiceSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  invoiceNumber: z.string(),
  currency: z.string(),
  template: z.enum(["template_1", "template_2", "template_3", "template_4"]),
  status: z.string().default("created"),
  startDate: z.date(),
  endDate: z.date(),

  memo: z.string().nullable().optional(),
  createdAt: z.date().nullable().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
});

export type Invoice = z.infer<typeof InvoiceSchema>;
