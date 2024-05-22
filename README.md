# Invoice Me

Open source invoice creator. Create, edit, share on the go.

## Stack

- NextJS
- Drizzle ORM
- Neon Serverless
- TailwindCSS
- Shadcn UI

## Getting Started

Install dependecies

```bash
pnpm install
```

First, run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## DB

Create migration

```bash
pnpm run db:generate
```

Migrate to production/developement database server

```bash
pnpm run db:push
```
