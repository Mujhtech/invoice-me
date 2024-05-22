import { createContext } from "@/lib/server/api/context";
import { appRouter } from "@/lib/server/api/root";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { NextRequest } from "next/server";

export const runtime = "edge";
// export API handler
export default async function handler(req: NextRequest) {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    router: appRouter,
    req,
    createContext,
  });
}
