# SAM Transformation OS - B2B2C Migration Plan

This document outlines the step-by-step implementation plan for transitioning SAM Forge from a single-user local tracker to a multi-tenant coaching SaaS platform.

## 📍 Current Status
**Pre-Migration:** We currently have a fully functional, highly polished single-user application. The UI is built, the tracking logic works perfectly, and data is synced to a local `tracker-data.json` file. We are ready to begin **Phase 1**.

## 🏗️ Phase 1: Database & ORM Foundation
**Goal:** Move from local JSON storage to a scalable relational database.

1. **Tech Stack Selection:**
   - **Database:** Supabase (PostgreSQL).
   - **ORM:** Prisma (gives us strong TypeScript typing matching what we already have).
2. **Setup:**
   - `pnpm install prisma @prisma/client`
   - `npx prisma init`
3. **Draft the Schema (`schema.prisma`):**
   - `User` model: `id`, `email`, `passwordHash`, `role` (TRAINER, CLIENT), `trainerId` (self-relation).
   - `Plan` model: Represents a 17-week structure assigned to a user.
   - `Phase` model: The 5 phases inside a plan.
   - Tracking models: `DailyLog`, `WeightEntry`, `LiftEntry`, `RunEntry`, `MeasurementEntry`. All linked to a `userId`.

## 🔐 Phase 2: Authentication & Authorization
**Goal:** Secure the platform and implement Role-Based Access Control (RBAC).

1. **Tech Stack Selection:**
   - NextAuth.js v5 (Auth.js) or Clerk.
2. **Implementation:**
   - Setup Auth Provider using the `User` database table.
   - Create a proper `/login` route that validates against hashed passwords in the DB.
   - **Middleware:** Create a Next.js middleware to automatically route users based on role:
     - `role === 'CLIENT'` -> `/tracker/dashboard`
     - `role === 'TRAINER'` -> `/trainer/dashboard`

## 🔄 Phase 3: Refactoring the Data Layer
**Goal:** Connect the existing beautiful frontend to the new database securely.

1. **API Routes Reconstruction:**
   - Update `app/api/tracker/route.ts` to query DB via Prisma.
   - E.g., `const logs = await prisma.dailyLog.findMany({ where: { userId: session.user.id } })`
2. **Update `useTracker` Hook:**
   - Fetch from the secure endpoints instead of `tracker-data.json`.
   - Update mutations (addWeight, upsertDailyLog) to trigger Prisma `POST/PUT` requests.
3. **Data Security:**
   - Ensure users can *only* fetch and mutate their own data via session tokens.

## 🧑‍💻 Phase 4: Dynamic Program Generation
**Goal:** Remove hardcoded references in `lib/data/` so programs are tailored by the coach.

1. **Create `PlanProvider` Context:**
   - Fetch the logged-in client's assigned plan from the database on app load.
2. **Deprecate Static Files:**
   - Move `phases.ts`, `workouts.ts`, and `nutrition.ts` logic to read from `PlanProvider` rather than static imports.
   - This ensures Client A sees "Hypertrophy Program" and Client B sees "Fat Loss Program".

## 📋 Phase 5: The Trainer Dashboard
**Goal:** Build the interface for coaches to manage their business.

1. **Roster View (`/trainer/dashboard`):**
   - Table/List of all assigned clients.
   - Global progress bars, current streaks, and last active timestamps for quick pulse-checks.
2. **Client Deep-Dive (`/trainer/client/[id]`):**
   - Render the *exact* dashboard components the client sees, but populated with the client's ID.
   - Allows the trainer to see the heatmap, weight charts, and exact daily logs.
3. **Plan Builder / CRM (`/trainer/client/[id]/plan`):**
   - Form builder to tweak the 5 phases, modify PR targets, and update daily macros.
   - Generate "Invite Links" or set up temporary passwords to onboard new clients.

## 🚀 Phase 6: Polish & Deployment
1. **Security Audit:** Ensure Trainers cannot query clients that aren't assigned to them.
2. **Deployment:** Host the PostgreSQL database and provision environment variables.
3. **Future (V2):** Integrate Stripe for automated subscription billing from clients to trainers.

---
### Next Steps
When you are ready to begin, we will start with **Phase 1**. We'll install Prisma, define the database schema, and apply it to a fresh Supabase database.