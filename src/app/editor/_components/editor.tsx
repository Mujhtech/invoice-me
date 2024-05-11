"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
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
      <section className="w-full h-full overflow-y-auto">
        <div className="mt-24 pb-10 max-w-[820px] w-full mx-auto">
          <div className="w-full bg-background border-primary border">
            <div className="border-primary border-b border-dotted">
              <div className="pt-8 px-8 pb-4 flex flex-col">
                <div className="flex justify-end">
                  <h3 className="text-md font-geist-sans font-bold">Invoice</h3>
                </div>
                <div className="flex justify-between">
                  <div className="flex flex-col gap-1 items-start">
                    <h3 className="text-sm font-geist-sans font-bold">From</h3>
                    <p className="text-xs">Muhideen Mujeeb</p>
                    <p className="text-xs">Federal university of technology,</p>
                    <p className="text-xs">
                      Minna Bosso Road Niger State 911011 Minna
                    </p>
                    <p className="text-xs">Nigeria</p>
                    <p className="text-xs">mujhtech@gmail.com</p>
                  </div>
                  <div className="flex flex-col gap-1 items-end">
                    <p className="text-xs">Invoice #1</p>
                    <p className="text-xs">Issued on 1/2/2029</p>
                    <p className="text-xs">Payment due on 1/2/2029</p>
                  </div>
                </div>
                <div className="mt-6 flex justify-between">
                  <div className="flex flex-col gap-1 items-start">
                    <h3 className="text-sm font-geist-sans font-bold">
                      Billed To
                    </h3>
                    <p className="text-xs">Muhideen Mujeeb</p>
                    <p className="text-xs">Federal university of technology,</p>
                    <p className="text-xs">
                      Minna Bosso Road Niger State 911011 Minna
                    </p>
                    <p className="text-xs">Nigeria</p>
                    <p className="text-xs">mujhtech@gmail.com</p>
                  </div>
                  <div className="flex flex-col gap-1 items-end"></div>
                </div>
              </div>
            </div>
            <div className="border-primary border-b border-dotted">
              <div className="pt-8 px-8 pb-4">
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
                          <Input defaultValue={invoice.unitTax} type="number" />
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
                          Add Item
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow className="!border-none font-geist-sans">
                      <TableCell colSpan={3}></TableCell>
                      <TableCell className="border-b" colSpan={2}>
                        Amount
                      </TableCell>
                      <TableCell className="border-b text-right">000</TableCell>
                    </TableRow>
                    <TableRow className="!border-none font-geist-sans">
                      <TableCell colSpan={3}></TableCell>
                      <TableCell className="border-b" colSpan={2}>
                        Tax Amount
                      </TableCell>
                      <TableCell className="border-b text-right">000</TableCell>
                    </TableRow>
                    <TableRow className="!border-none font-geist-sans">
                      <TableCell colSpan={3}></TableCell>
                      <TableCell className="border-b" colSpan={2}>
                        Total Amount
                      </TableCell>
                      <TableCell className="border-b text-right">000</TableCell>
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
      </section>
    </main>
  );
}
