"use client";

import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Plus, Trash, X } from "lucide-react";
import React, { useState, useTransition } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import ClientForm from "./client-form";
import InformationForm from "./information-form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { format } from "date-fns";
import InvoiceForm, { invoiceFormSchema } from "./invoice-form";
import { formatCurrency } from "@/lib/currency";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Invoice,
  InvoiceItem,
  InvoiceUserOrClient,
} from "@/lib/server/api/routers/type";
import { useRouter } from "next/navigation";
import { trpc } from "@/lib/server/api/client";
import { ModeToggle } from "@/components/mode-toggle";
import TemplateOne from "./_templates/template-one";

const supportedCurrencies = [
  {
    name: "Nigeria Naira",
    code: "NGN",
  },
  {
    name: "United States Dollar",
    code: "USD",
  },
  {
    name: "Europeans Euro",
    code: "EUR",
  },
];

export default function Editor({
  data,
  editorMode,
}: {
  data?: Invoice & {
    items: InvoiceItem[];
    client: InvoiceUserOrClient;
    user: InvoiceUserOrClient;
  };
  editorMode: boolean;
}) {
  const router = useRouter();
  const [invoices, setInvoices] = useState(
    data?.items ?? [
      {
        title: "",
        quantity: 1,
        price: 0,
        tax: 0,
        totalAmount: 0,
        discount: 0,
        amount: 0,
      },
    ]
  );
  const [client, setClient] = useState<InvoiceUserOrClient | null | undefined>(
    data?.client || null
  );

  const [information, setInformation] = useState<
    InvoiceUserOrClient | null | undefined
  >(data?.user || null);

  const [invoice, setInvoiceDetail] = useState<
    z.infer<typeof invoiceFormSchema>
  >({
    invoiceNumber: data?.invoiceNumber ?? "1",
    issueDate: data?.startDate ?? new Date(),
    dueDate: data?.endDate ?? new Date(),
  });

  const [invoiceTitle, setInvoiceTitle] = useState<string>(
    data?.title ?? " Untitled"
  );

  const [memo, setMemo] = useState<string>(data?.memo ?? " ");

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [currency, setCurrency] = useState<string>(data?.currency ?? "USD");

  const invoiceMutation = trpc.invoice.create.useMutation();

  const onSaved = async () => {
    startTransition(async () => {
      try {
        toast.loading("Saving invoice...", {
          duration: 2000,
        });
        const data = await invoiceMutation.mutateAsync({
          title: invoiceTitle,
          invoiceNumber: invoice.invoiceNumber,
          endDate: invoice.dueDate,
          startDate: invoice.issueDate,
          status: "created",

          currency: currency,
          template: "template_1",
          memo: memo,
          user: information!,
          client: client!,
          items: invoices.map((inv) => ({
            title: inv.title ?? "",
            price: inv.price,
            quantity: inv.quantity,
            discount: inv.discount,
            tax: inv.tax,
          })),
        });
        toast.success("Invoice saved!!!");
        router.push(`/editor/${data.id}`);
      } catch (err: any) {
        throw err;
      }
    });
  };

  return (
    <main className="h-full max-h-full overflow-hidden">
      <header className="bg-background py-4 px-4 z-10 top-0 fixed w-full">
        <div className="w-full flex justify-between items-center">
          <div className="flex">
            <Button
              onClick={() => {
                router.push("/");
              }}
              variant="outline"
              className="rounded-full !h-8 !w-8 !py-0 !px-0 !p-2"
            >
              <X />
            </Button>
          </div>
          <div className="flex-1 flex-row justify-center items-center">
            <div className="flex flex-row justify-center items-center">
              <h1
                onClick={() => {
                  if (editorMode) {
                    setIsEditingTitle(true);
                  }
                }}
                className={cn(
                  "font-geist-sans text-center text-3xl font-black text-muted-foreground",
                  isEditingTitle && editorMode && "hidden"
                )}
              >
                {invoiceTitle}
              </h1>
              {editorMode && (
                <input
                  type="text"
                  placeholder=""
                  defaultValue={invoiceTitle}
                  onChange={(e) => setInvoiceTitle(e.target.value)}
                  onBlur={() => setIsEditingTitle(false)}
                  className={cn(
                    "text-3xl font-geist-sans text-center font-black ring-offset-0 ring-offset-transparent text-muted-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0",
                    isEditingTitle ? "block" : "hidden"
                  )}
                />
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <ModeToggle />
            {editorMode && (
              <Button
                onClick={() => onSaved()}
                variant="secondary"
                disabled={isPending}
              >
                Save
              </Button>
            )}
            <Button variant="secondary" disabled={isPending}>
              Share
            </Button>
          </div>
        </div>
      </header>
      <section className="max-w-5xl h-full mx-auto overflow-y-auto">
        <div className="mt-24 relative flex flex-row">
          <TemplateOne
            client={client}
            information={information}
            invoice={invoice}
            items={invoices}
            memo={memo}
            currency={currency}
            updateMemo={setMemo}
            updateInformation={(value) => setInformation(value)}
            updateInvoice={(value) => setInvoiceDetail(value)}
            updateClient={(value) => setClient(value)}
            updateItems={(value) => setInvoices(value)}
            editorMode={editorMode}
          />
          {editorMode && (
            <div className="ml-8 max-w-[300px]">
              <div className="bg-background fixed min-w-[280px] p-4 border border-primary">
                <div className="flex flex-col">
                  <h3>Settings</h3>

                  <div className="mt-6 flex flex-col">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="justify-between"
                        >
                          {currency
                            ? supportedCurrencies.find(
                                (cur) => cur.code === currency
                              )?.name
                            : "Select currency..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="p-0">
                        <Command>
                          <CommandInput placeholder="Search currency..." />
                          <CommandList>
                            <CommandEmpty>No currency found.</CommandEmpty>
                            <CommandGroup>
                              {supportedCurrencies.map((cur) => (
                                <CommandItem
                                  key={cur.code}
                                  value={cur.code}
                                  onSelect={(currentValue) => {
                                    setCurrency(cur.code);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      currency === cur.code
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {cur.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
