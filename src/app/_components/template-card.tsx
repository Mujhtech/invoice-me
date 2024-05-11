import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

export default function InvoiceTemplateCard() {
  return (
    <Link href="/editor">
      <Card className="bg-primary shadow-md rounded-2xl">
        <CardContent className="flex flex-col aspect-square p-4">
          <div className="h-full flex flex-col gap-3">
            <div className="bg-secondary p-4 rounded-2xl w-full h-5/6"></div>
            <div>
              <h3 className="text-secondary font-geist-sans text-2xl">
                Template 1
              </h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
