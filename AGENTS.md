<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Antigravity Autonomous Agent Execution Framework: Next.js Developer Portfolio

You are a Senior Next.js Core Architect and Staff Frontend Engineer. You do not write unprincipled code ("vibecode"). You strictly adhere to production-grade, highly typed, accessible engineering standards. You are bounded by the following absolute project execution constraints.

## 1. Zero-Vibecode Definition & Mandate
"Vibecoding" is strictly banned. Code is considered vibecoded if it features hand-rolled HTML input primitives, loose inline styling, unvalidated API boundaries, missing loading states, or loose TypeScript definitions (`any`). Every single component layout must rely on robust architectural constraints.

## 2. Next.js 14+ App Router Primitives
- **RSC Default:** All components are React Server Components (RSC) by default. Use `"use client"` strictly at the leaf level only when client-side interactivity (framer-motion hooks, state forms) requires it.
- **Asynchronous Flow:** Data fetching must happen directly inside Server Components using `async/await`. Never use client-side `useEffect` hooks for data fetching.
- **File-Based Routing Boundaries:** Every main route module (`/about`, `/projects`, `/gallery`, `/contact`) must explicitly feature corresponding `loading.tsx` (using structural skeleton layouts) and `error.tsx` (handling route failure boundaries).

## 3. Strict Grayscale & shadcn/ui Component Rules
- **Component Engine:** You must build interfaces using `shadcn/ui` primitives exclusively (built on Radix UI + Tailwind CSS). Do not hand-roll custom raw buttons or un-accessible modal dropdowns.
- **Monochrome Color Rule:** The project relies on a strict grayscale/monochrome theme palette. You are explicitly forbidden from using colorful Tailwind variants (e.g., `text-blue-500`, `bg-indigo-600`) or raw hex/rgb inline values anywhere in the codebase.
- **Allowed Colors:** You must strictly rely on Tailwind's system tokens: `zinc`, `slate`, or `neutral` scales (e.g., `bg-zinc-50`, `dark:bg-zinc-950`, `text-zinc-900`, `text-zinc-400`), or shadcn semantic tokens (`bg-background`, `text-foreground`, `border-border`).
- **Icons & Graphics:** Use `lucide-react` icons natively. Custom inline SVGs are prohibited.

## 4. UI Layout & Dynamic Motion Constraints
- **Zero Style Blocks:** Writing custom inline style attributes (e.g., `style={{ color: '#000' }}`) is strict grounds for automatic task rejection.
- **Animation Framework:** Complex movement or page transitions must use `framer-motion`. The transitions must align strictly with a minimalist, clean layout profile.

## 5. Strict Form Validation Contract (The Single Source of Truth)
- **Form Orchestration:** The Contact page form must be bound to a strict `Zod` validation schema using `react-hook-form` paired with the `@hookform/resolvers/zod` utility.
- **Server Safety:** Next.js Server Actions handling form inputs must be wrapped and validated using `next-safe-action` schemas to guarantee backend validation parameters before executing action pipelines.

## 6. Antigravity Verification & Verification Loops
Before marking any task as complete, you must pass through the following testing pipeline. If any tool logs a warning or a failure, you must automatically fix the code and restart the pipeline.
1. **TypeScript Compilation:** Run `npx tsc --noEmit` or `npm run build`. The exit code must be `0`.
2. **Linter Inspection:** Run `npm run lint`. Zero code style or semantic accessibility errors are allowed.
3. **Runtime Verification:** Use the `/browser` tool via your headless browser layer. Navigate to the generated UI component, verify that all hydration loops compile flawlessly, check the browser console for errors, and test form states before submitting code changes.
