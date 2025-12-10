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

## Database & Migrations (Drizzle + Supabase)

### Supabase CLI Commands
- `npx supabase start` - Start local Supabase stack
- `npx supabase stop` - Stop local Supabase stack
- `npx supabase db reset` - Reset local database and run all migrations
- `npx supabase link` - Link to remote Supabase project
- `npx supabase db push` - Push migrations to remote database

### Drizzle Kit Commands
- `npx drizzle-kit generate` - Generate SQL migrations from schema changes
- `npx drizzle-kit migrate` - Apply migrations to database
- `npx drizzle-kit push` - Push schema directly (dev only, no migration files)
- `npx drizzle-kit pull` - Pull existing database schema to TypeScript
- `npx drizzle-kit studio` - Open Drizzle Studio

### Migration Workflow (Recommended)
1. **Schema changes**: Edit `lib/db/schema.ts` with Drizzle's pgTable
2. **Generate migration**: Run `npx drizzle-kit generate` to create SQL files
3. **Review migration**: Always review generated SQL before applying
4. **Apply locally**: Run `npx drizzle-kit migrate` or `npx supabase db reset`
5. **Apply to production**: Run `npx supabase link` then `npx supabase db push`

### Quick Development (No Migration Files)
- Use `npx drizzle-kit push` for rapid prototyping in local dev
- This applies schema changes directly without generating migration files
- Not recommended for production or team environments

### Best Practices
- Use Drizzle schema (`lib/db/schema.ts`) as source of truth
- Generate migrations with `drizzle-kit generate`, apply with Supabase CLI
- Never modify migration files after they've been applied to production
- Always review generated SQL for unsafe statements before applying
- Test migrations locally with `npx supabase db reset` before pushing to remote
- Keep migrations small and focused on single changes
- For existing tables, check for unsafe `CREATE SCHEMA` statements in generated migrations
