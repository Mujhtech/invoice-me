import React from "react";

import {
  Invoice,
  InvoiceItem,
  InvoiceUserOrClient,
} from "@/lib/server/api/routers/type";
import { Check, ChevronsUpDown, Plus, Trash, X } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/currency";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import InvoiceForm, { invoiceFormSchema } from "../invoice-form";
import InformationForm from "../information-form";
import ClientForm from "../client-form";
import { z } from "zod";
import { cn } from "@/lib/utils";

export type TemplateProps = {
  editorMode: boolean;
  currency: string;
  information: InvoiceUserOrClient | null | undefined;
  client: InvoiceUserOrClient | null | undefined;
  invoice: z.infer<typeof invoiceFormSchema>;
  items: InvoiceItem[];
  memo: string | null | undefined;
  updateInformation: (value: InvoiceUserOrClient) => void;
  updateClient: (value: InvoiceUserOrClient) => void;
  updateInvoice: (value: z.infer<typeof invoiceFormSchema>) => void;
  updateItems: (value: InvoiceItem[]) => void;
  updateMemo: (value: string) => void;
};

export default function TemplateOne({
  editorMode,
  currency,
  information,
  client,
  updateInformation,
  updateClient,
  invoice,
  updateInvoice,
  updateItems,
  items,
  memo,
  updateMemo,
}: TemplateProps) {
  return (
    <div
      className={cn(
        "pb-10 max-w-[820px] w-full ",
        editorMode == false && "mx-auto"
      )}
    >
      <div className="w-full bg-background border-primary border">
        <div className="border-primary border-b border-dotted">
          <div className="pt-8 px-8 pb-4 flex flex-col">
            <div className="flex justify-end">
              <h3 className="text-md font-geist-sans font-bold">Invoice</h3>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col gap-1 items-start">
                <div className="flex gap-2 items-center">
                  <h3 className="text-sm font-geist-sans font-bold">From</h3>
                  {editorMode && (
                    <InformationForm
                      defaultValues={information}
                      onFormSubmit={(value) => {
                        updateInformation(value);
                      }}
                    />
                  )}
                </div>
                {information && (
                  <>
                    <p className="text-xs">
                      {information.firstname} {information.lastname}
                    </p>
                    <p className="text-xs">{information.address}</p>
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
                  {editorMode && (
                    <InvoiceForm
                      defaultValues={invoice}
                      onFormSubmit={(value) => {
                        updateInvoice(value);
                      }}
                    />
                  )}
                  <p className="text-xs">Invoice #{invoice.invoiceNumber}</p>
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
                  {editorMode && (
                    <ClientForm
                      defaultValues={client}
                      onFormSubmit={(value) => {
                        updateClient(value);
                      }}
                    />
                  )}
                </div>
                {client && (
                  <>
                    <p className="text-xs">
                      {client.firstname} {client.lastname}
                    </p>
                    <p className="text-xs">{client.address}</p>
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
                {items.map((invoice, key) => (
                  <TableRow key={key}>
                    <TableCell
                      className={cn(
                        "min-w-[200px] max-w-[300px] gap-1 flex items-center",
                        editorMode == false && "!p-4"
                      )}
                    >
                      {editorMode && key != 0 && (
                        <Button
                          variant="secondary"
                          onClick={() => {
                            updateItems(items.filter((_, i) => i != key));
                          }}
                          className="!h-4 !w-4 !bg-transparent !p-0 ring-offset-background  focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        >
                          <Trash className="w-4 h-4 text-red-600" />
                        </Button>
                      )}
                      {editorMode ? (
                        <Input
                          defaultValue={invoice.title}
                          type="text"
                          onChange={(e) => {
                            const value = e.target.value;
                            updateItems(
                              items.map((inv, i) => {
                                if (i === key) {
                                  return {
                                    ...inv,
                                    title: value,
                                  };
                                }
                                return inv;
                              })
                            );
                          }}
                        />
                      ) : (
                        <p>{invoice.title}</p>
                      )}
                    </TableCell>
                    <TableCell className="min-w-[50px] max-w-[70px]">
                      {editorMode ? (
                        <Input
                          defaultValue={invoice.quantity}
                          type="number"
                          onChange={(e) => {
                            const value = parseFloat(
                              e.target.value != "" ? e.target.value : "0"
                            );
                            updateItems(
                              items.map((inv, i) => {
                                if (i === key) {
                                  return {
                                    ...inv,
                                    quantity: value,
                                    totalAmount:
                                      inv.price * value + inv.quantity,
                                  };
                                }
                                return inv;
                              })
                            );
                          }}
                        />
                      ) : (
                        <p>{invoice.quantity}</p>
                      )}
                    </TableCell>
                    <TableCell className="max-w-[120px]">
                      {editorMode ? (
                        <Input
                          defaultValue={invoice.price}
                          type="number"
                          onChange={(e) => {
                            const value = parseFloat(
                              e.target.value != "" ? e.target.value : "0"
                            );
                            updateItems(
                              items.map((inv, i) => {
                                if (i === key) {
                                  return {
                                    ...inv,
                                    price: value,
                                    totalAmount:
                                      value * inv.quantity + inv.price,
                                  };
                                }
                                return inv;
                              })
                            );
                          }}
                        />
                      ) : (
                        <p>{invoice.price}</p>
                      )}
                    </TableCell>
                    <TableCell className="max-w-[120px]">
                      {editorMode ? (
                        <Input
                          defaultValue={invoice.discount}
                          type="number"
                          onChange={(e) => {
                            const value = parseFloat(
                              e.target.value != "" ? e.target.value : "0"
                            );
                            updateItems(
                              items.map((inv, i) => {
                                if (i === key) {
                                  return {
                                    ...inv,
                                    discount: value,
                                    totalAmount: inv.totalAmount - value,
                                  };
                                }
                                return inv;
                              })
                            );
                          }}
                        />
                      ) : (
                        <p>{invoice.discount}</p>
                      )}
                    </TableCell>
                    <TableCell className="max-w-[120px]">
                      {editorMode ? (
                        <Input
                          defaultValue={invoice.tax}
                          type="number"
                          onChange={(e) => {
                            const value = parseFloat(
                              e.target.value != "" ? e.target.value : "0"
                            );
                            updateItems(
                              items.map((inv, i) => {
                                if (i === key) {
                                  return {
                                    ...inv,
                                    tax: value,
                                    totalAmount: inv.totalAmount + value,
                                  };
                                }
                                return inv;
                              })
                            );
                          }}
                        />
                      ) : (
                        <p>{invoice.tax}</p>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(currency, invoice.totalAmount)}
                    </TableCell>
                  </TableRow>
                ))}
                {editorMode && (
                  <TableRow className="!border-none font-geist-sans">
                    <TableCell colSpan={6}>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          updateItems([
                            ...items,
                            {
                              title: "",
                              quantity: 1,
                              price: 0,
                              tax: 0,
                              discount: 0,
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
                )}
                <TableRow className="!border-none font-geist-sans">
                  <TableCell colSpan={3}></TableCell>
                  <TableCell className="border-b" colSpan={2}>
                    Amount
                  </TableCell>
                  <TableCell className="border-b text-right">
                    {formatCurrency(
                      currency,
                      items.reduce(
                        (acc, cur) => acc + cur.price * cur.quantity,
                        0
                      )
                    )}
                  </TableCell>
                </TableRow>
                <TableRow className="!border-none font-geist-sans">
                  <TableCell colSpan={3}></TableCell>
                  <TableCell className="border-b" colSpan={2}>
                    Tax Amount
                  </TableCell>
                  <TableCell className="border-b text-right">
                    {formatCurrency(
                      currency,
                      items.reduce((acc, cur) => acc + cur.tax, 0)
                    )}
                  </TableCell>
                </TableRow>
                <TableRow className="!border-none font-geist-sans">
                  <TableCell colSpan={3}></TableCell>
                  <TableCell className="border-b" colSpan={2}>
                    Total Amount
                  </TableCell>
                  <TableCell className="border-b text-right">
                    {formatCurrency(
                      currency,
                      items.reduce((acc, cur) => acc + cur.totalAmount, 0)
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="">
          <div className="pt-4 px-8 pb-4">
            {editorMode ? (
              <Textarea
                placeholder="Memo"
                className=" resize-none"
                defaultValue={memo ?? ""}
                onChange={(e) => updateMemo(e.target.value)}
              />
            ) : (
              <p className="text-xs">{memo}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
