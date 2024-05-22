import React from "react";
import View from "./_view";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editor",
};

export default function Page({
  params,
}: {
  params: {
    cid: string;
  };
}) {
  return <View cid={params.cid} />;
}
