"use client";

import React from "react";
import { trpc } from "@/lib/server/api/client";
import Editor from "../_components/editor";

export default function View({ cid }: { cid: string }) {
  const { data, isLoading, isRefetching } = trpc.invoice.get.useQuery({ cid });

  if (isLoading || isRefetching) {
    return (
      <main className="h-full max-h-full overflow-hidden">
        <div className="flex flex-col items-center justify-center">
          Loading...
        </div>
      </main>
    );
  }

  return <Editor data={data} editorMode={true} />;
}
