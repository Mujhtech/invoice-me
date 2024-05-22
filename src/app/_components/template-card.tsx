import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export default function InvoiceTemplateCard({
  title,
  comingSoon,
  link,
}: {
  comingSoon?: boolean;
  title: string;
  description?: string;
  link: string;
}) {
  return (
    <Link
      href={`/editor?template=${link}`}
      className={cn(comingSoon && "pointer-events-none")}
    >
      <Card className="bg-primary shadow-md rounded-2xl">
        <CardContent className="flex flex-col aspect-square p-4">
          <div className="h-full flex flex-col gap-3">
            <div className="bg-secondary p-4 rounded-2xl w-full h-5/6"></div>
            <div className="flex justify-between">
              <h3 className="text-secondary font-geist-sans text-2xl">
                {title}
              </h3>
              {comingSoon && <Badge className="text-xs">Coming soon</Badge>}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
