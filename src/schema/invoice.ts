import { relations } from "drizzle-orm";
import {
  serial,
  pgTable,
  pgSchema,
  text,
  numeric,
  timestamp,
  decimal,
  primaryKey,
  pgEnum,
  bigint,
} from "drizzle-orm/pg-core";

export const invoiceStatus = pgEnum("invoiceStatus", [
  "created",
  "drafted",
  "paid",
]);

export const invoices = pgTable("invoices", {
  id: text("id").primaryKey().notNull(),
  title: text("title").notNull(),
  invoiceNumber: text("invoiceNumber").notNull(),
  template: text("template").notNull(),
  currency: text("currency").notNull(),
  memo: text("memo"),
  startDate: text("startDate").notNull(),
  endDate: text("endDate").notNull(),
  status: invoiceStatus("status").notNull().default("created"),
  invoiceClientId: text("invoiceClientId").references(() => invoiceClients.id),
  invoiceUserId: text("invoiceUserId").references(() => invoiceUsers.id),

  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
  deletedAt: timestamp("deletedAt"),
});

export const invoiceUsers = pgTable("invoice_users", {
  id: text("id").primaryKey().notNull(),
  firstname: text("firstname").notNull(),
  lastname: text("lastname").notNull(),
  email: text("email").notNull(),
  state: text("state").notNull(),
  city: text("city").notNull(),
  postalCode: text("postalCode").notNull(),
  address: text("address").notNull(),
  address2: text("address2"),
  phoneNumber: text("phoneNumber"),
  country: text("country").notNull(),
  companyName: text("companyName"),

  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
  deletedAt: timestamp("deletedAt"),
});

export const invoiceClients = pgTable("invoice_clients", {
  id: text("id").primaryKey().notNull(),
  firstname: text("firstname").notNull(),
  lastname: text("lastname").notNull(),
  email: text("email").notNull(),
  state: text("state").notNull(),
  city: text("city").notNull(),
  postalCode: text("postalCode").notNull(),
  address: text("address").notNull(),
  address2: text("address2"),
  phoneNumber: text("phoneNumber"),
  country: text("country").notNull(),
  companyName: text("companyName"),

  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
  deletedAt: timestamp("deletedAt"),
});

export const invoiceItems = pgTable("invoice_items", {
  id: text("id").primaryKey().notNull(),
  title: text("title").notNull(),
  price: decimal("price").notNull(),
  tax: decimal("tax").notNull(),
  quantity: bigint("quantity", { mode: "number" }).default(1).notNull(),
  discount: decimal("discount").notNull(),
  invoiceId: text("invoiceId").references(() => invoices.id),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
  deletedAt: timestamp("deletedAt"),
});
