import { defineConfig } from "drizzle-kit";

export default defineConfig({
  verbose: true,
  schema: "./src/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
