import { createInvoice } from "./routers/invoice/create-invoice";
import { getInvoice } from "./routers/invoice/get-invoice";
import { t } from "./trpc";

export const appRouter = t.router({
  invoice: t.router({
    create: createInvoice,
    get: getInvoice,
  }),
});

export type AppRouter = typeof appRouter;
