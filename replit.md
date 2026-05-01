# Workspace — Arab First City (AFMOD)

## Overview

pnpm workspace monorepo using TypeScript. Digital state portal for "Arab First City" (AFMOD).
Frontend deployed on Vercel at https://afrp.vercel.app/

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL (via `pg` directly — raw SQL template tags)
- **Frontend**: Multi-page Vite app (plain HTML/JS with Arabic RTL support)
- **Auth**: Discord Bot (DM verification code flow)

## Project Structure

- `artifacts/afmod/` — Frontend MPA (ministry, messages, twitter, cars, houses, gas, grocery pages)
- `artifacts/api-server/` — Express API server (auth, showroom, messages, twitter routes)
- `lib/api-zod/` — Zod schemas for API validation
- `vercel.json` — Vercel deployment config (builds @workspace/afmod)

## Key Files

- `artifacts/afmod/shared.js` — Shared API client (apiFetch with 12s timeout)
- `artifacts/api-server/src/lib/discord.ts` — Discord bot integration (search + DM)
- `artifacts/api-server/src/lib/db.ts` — PostgreSQL connection + schema init
- `artifacts/api-server/src/lib/sessions.ts` — In-memory session management
- `artifacts/api-server/src/routes/auth.ts` — Discord login flow
- `artifacts/api-server/src/routes/showroom.ts` — Proxies purchases to AFMOD bot

## Required Environment Variables

- `DISCORD_BOT_TOKEN` — Discord bot token for member search + DMs
- `DISCORD_GUILD_ID` — The Discord server ID
- `DATABASE_URL` — PostgreSQL connection URL
- `AFMOD_BOT_URL` — URL of the AFMOD in-game bot (for showroom purchases)
- `AFMOD_BOT_API_KEY` — API key to authenticate with AFMOD bot

## Key Commands

- `pnpm install` — Install all dependencies
- `pnpm --filter @workspace/afmod run build` — Build frontend
- `pnpm --filter @workspace/api-server run dev` — Run API server locally
- `pnpm --filter @workspace/api-server run typecheck` — Typecheck API server
