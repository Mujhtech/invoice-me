import React from "react";
import View from "./_view";

export default function Page({
  params,
}: {
  params: {
    cid: string;
  };
}) {
  return <View cid={params.cid} />;
}
