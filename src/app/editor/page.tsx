import React from "react";
import Editor from "./_components/editor";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editor",
};

export default function Page() {
  return <Editor editorMode={true} />;
}
