DO $$ BEGIN
 CREATE TYPE "public"."invoiceStatus" AS ENUM('created', 'drafted', 'paid');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "invoice_clients" (
	"id" text PRIMARY KEY NOT NULL,
	"firstname" text NOT NULL,
	"lastname" text NOT NULL,
	"email" text NOT NULL,
	"state" text NOT NULL,
	"city" text NOT NULL,
	"postalCode" text NOT NULL,
	"address" text NOT NULL,
	"address2" text,
	"phoneNumber" text,
	"country" text NOT NULL,
	"companyName" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "invoice_items" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"price" numeric NOT NULL,
	"tax" numeric NOT NULL,
	"discount" numeric NOT NULL,
	"amount" numeric NOT NULL,
	"invoiceId" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "invoice_users" (
	"id" text PRIMARY KEY NOT NULL,
	"firstname" text NOT NULL,
	"lastname" text NOT NULL,
	"email" text NOT NULL,
	"state" text NOT NULL,
	"city" text NOT NULL,
	"postalCode" text NOT NULL,
	"address" text NOT NULL,
	"address2" text,
	"phoneNumber" text,
	"country" text NOT NULL,
	"companyName" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "invoices" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"invoiceNumber" text NOT NULL,
	"template" text NOT NULL,
	"currency" text NOT NULL,
	"memo" text,
	"startDate" text NOT NULL,
	"endDate" text NOT NULL,
	"status" "invoiceStatus" DEFAULT 'created' NOT NULL,
	"invoiceClientId" text,
	"invoiceUserId" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invoice_items" ADD CONSTRAINT "invoice_items_invoiceId_invoices_id_fk" FOREIGN KEY ("invoiceId") REFERENCES "public"."invoices"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invoices" ADD CONSTRAINT "invoices_invoiceClientId_invoice_clients_id_fk" FOREIGN KEY ("invoiceClientId") REFERENCES "public"."invoice_clients"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invoices" ADD CONSTRAINT "invoices_invoiceUserId_invoice_users_id_fk" FOREIGN KEY ("invoiceUserId") REFERENCES "public"."invoice_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
