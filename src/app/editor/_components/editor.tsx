"use client";

import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Plus, X } from "lucide-react";
import React from "react";
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
import ClientForm, { clientFormSchema } from "./client-form";
import InformationForm, { informationFormSchema } from "./information-form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
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

const supportedCurrencies = [
  {
    name: "Nigeria Naira",
    code: "NGN",
  },
];

export default function Editor() {
  const [invoices, setInvoices] = React.useState([
    {
      description: "",
      unit: 1,
      unitPrice: 100,
      unitTax: 10,
      unitDiscount: 0,
      totalAmount: 110,
    },
  ]);
  const [client, setClient] = React.useState<
    z.infer<typeof clientFormSchema> | null | undefined
  >(undefined);

  const [information, setInformation] = React.useState<
    z.infer<typeof informationFormSchema> | null | undefined
  >(undefined);

  const [invoice, setInvoiceDetail] = React.useState<
    z.infer<typeof invoiceFormSchema>
  >({
    title: "1",
    issueDate: new Date(),
    dueDate: new Date(),
  });

  const [currency, setCurrency] = React.useState<string>("USD");

  return (
    <main className="h-full max-h-full overflow-hidden">
      <header className="bg-background py-4 px-4 z-10 top-0 fixed w-full">
        <div className="w-full flex justify-between items-center">
          <div>
            <Button
              variant="outline"
              className="rounded-full !h-8 !w-8 !py-0 !px-0 !p-2"
            >
              <X />
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary">Save</Button>
            <Button variant="secondary">Share</Button>
          </div>
        </div>
      </header>
      <section className="max-w-5xl h-full mx-auto overflow-y-auto">
        <div className="mt-24 relative flex flex-row">
          <div className="pb-10 max-w-[820px] w-full ">
            <div className="w-full bg-background border-primary border">
              <div className="border-primary border-b border-dotted">
                <div className="pt-8 px-8 pb-4 flex flex-col">
                  <div className="flex justify-end">
                    <h3 className="text-md font-geist-sans font-bold">
                      Invoice
                    </h3>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-1 items-start">
                      <div className="flex gap-2 items-center">
                        <h3 className="text-sm font-geist-sans font-bold">
                          From
                        </h3>
                        <InformationForm
                          defaultValues={information}
                          onFormSubmit={(value) => {
                            setInformation(value);
                          }}
                        />
                      </div>
                      {information && (
                        <>
                          <p className="text-xs">
                            {information.firstname} {information.lastname}
                          </p>
                          <p className="text-xs">{information.address1}</p>
                          {information.address2 && (
                            <p className="text-xs">{information.address2}</p>
                          )}
                          <p className="text-xs">
                            {information.city} {information.state}{" "}
                            {information.postalCode}
                          </p>
                          <p className="text-xs">{information.country}</p>
                          <p className="text-xs">{information.email}</p>
                        </>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      <div className="flex items-center gap-1">
                        <InvoiceForm
                          defaultValues={invoice}
                          onFormSubmit={(value) => {
                            setInvoiceDetail(value);
                          }}
                        />
                        <p className="text-xs">Invoice #{invoice.title}</p>
                      </div>
                      <p className="text-xs">
                        Issued on {format(invoice.issueDate, "PPP")}
                      </p>
                      <p className="text-xs">
                        Payment due on {format(invoice.dueDate, "PPP")}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-between">
                    <div className="flex flex-col gap-1 items-start">
                      <div className="flex gap-2 items-center">
                        <h3 className="text-sm font-geist-sans font-bold">
                          Billed To
                        </h3>
                        <ClientForm
                          defaultValues={client}
                          onFormSubmit={(value) => {
                            setClient(value);
                          }}
                        />
                      </div>
                      {client && (
                        <>
                          <p className="text-xs">
                            {client.firstname} {client.lastname}
                          </p>
                          <p className="text-xs">{client.address1}</p>
                          {client.address2 && (
                            <p className="text-xs">{client.address2}</p>
                          )}
                          <p className="text-xs">
                            {client.city} {client.state} {client.postalCode}
                          </p>
                          <p className="text-xs">{client.country}</p>
                          <p className="text-xs">{client.email}</p>
                        </>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 items-end"></div>
                  </div>
                </div>
              </div>
              <div className="border-primary border-b border-dotted">
                <div className="pt-4 px-8 pb-4">
                  <Table>
                    <TableHeader>
                      <TableRow className="text-xs font-geist-sans">
                        <TableHead>Description</TableHead>
                        <TableHead>Qty</TableHead>
                        <TableHead>Unit Price</TableHead>
                        <TableHead>Discount</TableHead>
                        <TableHead>Tax</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {invoices.map((invoice, key) => (
                        <TableRow key={key}>
                          <TableCell className="min-w-[200px] max-w-[200px]">
                            <Input defaultValue={invoice.description} />
                          </TableCell>
                          <TableCell>
                            <Input defaultValue={invoice.unit} type="number" />
                          </TableCell>
                          <TableCell>
                            <Input
                              defaultValue={invoice.unitPrice}
                              type="number"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              defaultValue={invoice.unitDiscount}
                              type="number"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              defaultValue={invoice.unitTax}
                              type="number"
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            {invoice.totalAmount}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="!border-none font-geist-sans">
                        <TableCell colSpan={6}>
                          <Button
                            variant="secondary"
                            onClick={() => {
                              setInvoices([
                                ...invoices,
                                {
                                  description: "",
                                  unit: 1,
                                  unitPrice: 0,
                                  unitTax: 0,
                                  unitDiscount: 0,
                                  totalAmount: 0,
                                },
                              ]);
                            }}
                            className="!text-xs !h-5 !bg-transparent ring-offset-background  focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                          >
                            <Plus className="w-4 h-4 mr-1" /> Add Item
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow className="!border-none font-geist-sans">
                        <TableCell colSpan={3}></TableCell>
                        <TableCell className="border-b" colSpan={2}>
                          Amount
                        </TableCell>
                        <TableCell className="border-b text-right">
                          000
                        </TableCell>
                      </TableRow>
                      <TableRow className="!border-none font-geist-sans">
                        <TableCell colSpan={3}></TableCell>
                        <TableCell className="border-b" colSpan={2}>
                          Tax Amount
                        </TableCell>
                        <TableCell className="border-b text-right">
                          000
                        </TableCell>
                      </TableRow>
                      <TableRow className="!border-none font-geist-sans">
                        <TableCell colSpan={3}></TableCell>
                        <TableCell className="border-b" colSpan={2}>
                          Total Amount
                        </TableCell>
                        <TableCell className="border-b text-right">
                          000
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
              <div className="">
                <div className="pt-8 px-8 pb-4"></div>
              </div>
            </div>
          </div>
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
                        className={cn(
                          "h-10 w-full justify-between",
                          !currency && "text-muted-foreground"
                        )}
                      >
                        {currency != null ? currency : "Select currency"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Select a currency..." />
                        <CommandEmpty>No currency found.</CommandEmpty>
                        <CommandGroup className="max-h-[150px] overflow-y-scroll">
                          {supportedCurrencies.map((cur) => {
                            const isSelected =
                              currency != null && currency == cur.code
                                ? true
                                : false;
                            return (
                              <CommandItem
                                value={cur.code}
                                key={cur.code}
                                onSelect={() => {
                                  setCurrency(cur.code);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    isSelected ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {cur.name}
                              </CommandItem>
                            );
                          })}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
