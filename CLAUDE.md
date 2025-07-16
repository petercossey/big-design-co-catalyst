# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Catalyst is BigCommerce's composable headless commerce framework built with Next.js 15.4 (App Router), React 19.1, and TypeScript. This is the `integrations/makeswift` branch which includes Makeswift visual editor integration.

## Key Commands

### Development
- `pnpm dev` - Run development server with hot reload
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server

### Code Quality
- `pnpm lint` - Run ESLint to check code style
- `pnpm typecheck` - Run TypeScript type checking

### Testing
- Run tests from `/core` directory:
  - `pnpm test:e2e` - Run Playwright E2E tests
  - `pnpm test:visual` - Run visual regression tests
  - `pnpm test:unit` - Run unit tests (if available)

## Architecture

### Monorepo Structure
- `/core` - Main Next.js application
  - `/app` - Next.js App Router pages, layouts, and API routes
  - `/client` - GraphQL client and BigCommerce API utilities
  - `/components` - Reusable React components (ui/, nav/, breadcrumbs/, etc.)
  - `/lib` - Core libraries (makeswift integration, analytics, cart, locale)
  - `/vibes` - Custom UI component library with primitives and sections
  - `/messages` - i18n translations for multiple locales
  - `/tests` - Playwright E2E and visual regression tests
- `/packages` - Shared packages
  - `/client` - BigCommerce GraphQL client package
  - `/cli` - Command-line tools
  - `/create-catalyst` - Project initialization CLI

### Key Technologies
- **GraphQL**: Uses BigCommerce GraphQL Storefront API with gql.tada for type-safe queries
- **Styling**: Tailwind CSS with custom theme configuration
- **Visual Editor**: Makeswift runtime integration for drag-and-drop page building
- **Forms**: React Hook Form with Zod validation
- **Auth**: NextAuth.js for authentication
- **State**: React Context for cart and other client state
- **i18n**: next-intl for internationalization

### Important Patterns
1. **GraphQL Queries**: Located in component files, use gql.tada for type safety
2. **Server Components**: Default for pages and layouts, use client components sparingly
3. **Data Fetching**: Prefer server-side fetching in RSC, use GraphQL client
4. **Error Handling**: Use Next.js error boundaries and custom error pages
5. **Routing**: App Router with dynamic routes for products, categories, pages
6. **Makeswift**: Components registered in `/core/lib/makeswift/register-components.tsx`

### Environment Configuration
- Create `.env.local` from `.env.example`
- Required: BigCommerce store credentials, API tokens
- Optional: Makeswift API key, analytics keys, cache configuration

### Branch Strategy
- `canary` - Primary development branch
- `integrations/makeswift` - Makeswift integration branch (current)
- Feature branches created from appropriate base branch

### Custom Conventions
- Use custom Link component from `/core/components/ui/link`
- Follow existing component patterns in `/core/vibes` for new UI components
- Maintain TypeScript strict mode compliance
- Follow App Router naming conventions for special files