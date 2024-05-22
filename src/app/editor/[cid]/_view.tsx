"use client";

import React from "react";
import { trpc } from "@/lib/server/api/client";
import Editor from "../_components/editor";
import { notFound } from "next/navigation";

export default function View({ cid }: { cid: string }) {
  const { data, isLoading, isRefetching, isError } = trpc.invoice.get.useQuery({
    cid,
  });

  if (isLoading || isRefetching) {
    return (
      <main className="h-full max-h-full overflow-hidden">
        <div className="flex flex-col text-center items-center justify-center">
          Loading...
        </div>
      </main>
    );
  }

  if (isError) {
    return notFound();
  }

  return <Editor data={data} editorMode={true} />;
}
