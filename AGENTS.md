# AGENTS.md

## Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production (also runs type checking)
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Drizzle migrations
- `npm run db:push` - Push schema to database
- `npm run db:studio` - Open Drizzle Studio

## Architecture
- **Next.js 16** App Router with React 19 and TypeScript (strict mode)
- **Database**: Supabase PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS v4 with `cn()` utility (clsx + tailwind-merge)
- **Validation**: Zod for schema validation

## Structure
- `app/` - Next.js App Router pages and layouts
- `lib/db/` - Drizzle schema and database connection
- `lib/utils.ts` - Shared utilities (cn helper)

## Code Style
- Use `@/*` path aliases for imports (e.g., `@/lib/utils`)
- Use `cn()` for conditional Tailwind classes
- Define DB schemas in `lib/db/schema.ts` using Drizzle's pgTable
- Prefer functional components with TypeScript types
