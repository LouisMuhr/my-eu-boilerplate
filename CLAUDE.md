# EU Boilerplate - Projektkontext

## Was ist das?
Next.js 15 SaaS Boilerplate mit EU-Compliance (DSGVO, Impressum, etc.) - Zum Verkauf als Premium Template

## Tech Stack
- Next.js 15 (App Router)
- NextAuth v5
- Drizzle ORM + Turso (SQLite)
- Stripe (Subscriptions)
- Resend (E-Mails)
- Tailwind CSS
- next-intl (i18n: en/de)
- Sentry (Error Monitoring)

## 🎯 Launch-Strategie
- **Ziel:** MVP Launch so schnell wie möglich, aber gut
- **Approach:** Launch & iterieren (v1.0 → v1.1 → v1.2)
- **Fokus:** Verkaufbares Boilerplate mit exzellenter Dokumentation
- **Zielgruppe:** Entwickler die ein EU-GDPR-compliant SaaS starten wollen
- **Budget:** Free Tiers only
- **Timeline:** ~5 Wochen bis Launch-Ready

## ✅ Bereits implementiert (Stand: 2026-02-02)

### GDPR Features (100% komplett ✅)
- ✅ Data Export API (`/api/export-data`)
- ✅ Account Deletion API (`/api/delete-account` mit Stripe cancellation)
- ✅ Cookie Consent Banner (professionelles emotional design)
- ✅ GDPR-konformes User Data Management

### Security (100% komplett ✅)
- ✅ Security Headers (CSP, X-Frame-Options, X-Content-Type-Options, etc.)
- ✅ Stripe Webhook HMAC Verification
- ✅ Sentry Error Monitoring Integration
- ✅ NextAuth v5 mit Email + OAuth (Google, GitHub)

### i18n (100% komplett ✅)
- ✅ next-intl vollständig konfiguriert
- ✅ Middleware mit Auth + i18n kombiniert
- ✅ en/de Locales (Default: de)
- ✅ Routing und Navigation setup

### Dashboard & UI (100% komplett ✅)
- ✅ **User Dashboard mit Real Content** - Live subscription status, echte Metriken, premium emotional design
- ✅ **Admin Dashboard mit Real Content** - KPIs (MRR, Total Users, Active Subs), Live Stripe API Integration
- ✅ Settings Page mit Theme Toggle, Profile Management
- ✅ Premium Emotional Design (micro-interactions, glassmorphism, gradients)

### Email System (100% komplett ✅)
- ✅ VerifyEmail Template (React Email, professionell designed)
- ✅ ResetPasswordEmail Template (React Email, professionell designed)
- ✅ Resend Integration

### Other
- ✅ Drizzle Config für Migrations
- ✅ Legal Pages (Imprint, Privacy)
- ✅ Landing Page (basic, functional)
- ✅ Responsive Design

## 🚀 Sprint-Plan bis Launch (5 Wochen, ~86h)

### Sprint 1: Critical Fixes & Foundation (1 week, ~20h)

#### Admin Email Configuration (2h)
- [ ] Create `src/lib/admin.ts` with `requireAdmin()` and `isAdmin()` functions
- [ ] Add `ADMIN_EMAILS` to `src/env.ts` (comma-separated string)
- [ ] Remove hardcoded `["louismuhr8@gmail.com"]` from all files
- [ ] Update all admin checks to use new helper functions
- [ ] Test admin access control

#### Email Configuration (2h)
- [ ] Add `EMAIL_FROM_NAME` and `EMAIL_FROM_ADDRESS` to `src/env.ts`
- [ ] Update `src/lib/mail.ts` to use environment variables
- [ ] Refactor `sendVerificationEmail()` to use configurable FROM address
- [ ] Refactor `sendPasswordResetEmail()` to use configurable FROM address
- [ ] Test email sending with custom FROM

#### Environment Variables (2h)
- [ ] Create comprehensive `.env.example` with ALL required variables
- [ ] Document each variable with inline comments
- [ ] Mark required vs optional variables clearly
- [ ] Add example values where appropriate
- [ ] Add security warnings for sensitive keys
- [ ] Test fresh setup with .env.example

#### Basic Test Setup (4h)
- [ ] Install Vitest (`npm install -D vitest @vitest/ui`)
- [ ] Install Playwright (`npm install -D @playwright/test`)
- [ ] Create `vitest.config.ts`
- [ ] Create `playwright.config.ts`
- [ ] Add test scripts to `package.json` (test, test:unit, test:e2e)
- [ ] Create test folder structure (`tests/unit/`, `tests/e2e/`)
- [ ] Write one simple smoke test to verify setup

#### Quick TypeScript Fixes (10h)
- [ ] Fix obvious `as any` in `src/lib/db-new.ts` (add proper return types)
- [ ] Fix `as any` in `src/app/api/` route handlers
- [ ] Add basic Zod schemas for API request validation (register, login, update-user)
- [ ] Fix `as any` in Stripe webhook handler
- [ ] Run `npm run build` and fix any blocking type errors
- [ ] Document remaining `as any` that need more work (for Sprint 2)

---

### Sprint 2: Core Testing & Stripe Production-Ready (1 week, ~20h)

#### Auth Critical Path Tests (6h)
**File:** `tests/e2e/auth.spec.ts`
- [ ] Test signup flow (form → email sent → verify → dashboard redirect)
- [ ] Test login flow with valid credentials
- [ ] Test login flow with invalid credentials (error handling)
- [ ] Test password reset flow (request → email → reset → login)
- [ ] Test OAuth flow with Google (mock)
- [ ] All tests must pass

#### Payment Critical Path Tests (5h)
**File:** `tests/e2e/payment.spec.ts`
- [ ] Test checkout session creation
- [ ] Test Stripe webhook for `checkout.session.completed`
- [ ] Test subscription status update in dashboard after payment
- [ ] Mock Stripe API responses for testing
- [ ] All tests must pass

#### TypeScript Type Safety Deep Dive (5h)
- [ ] Create Zod schemas for all database query return types in `src/lib/db-schemas.ts`
- [ ] Remove ALL remaining `as any` from codebase
- [ ] Add proper TypeScript return types to all functions in `src/lib/db-new.ts`
- [ ] Add Zod validation to all remaining API routes
- [ ] Enable `strict: true` in `tsconfig.json`
- [ ] Fix all type errors that surface
- [ ] Run `npm run build` successfully with zero type errors

#### Stripe Failed Payment Handling (3h)
- [ ] Add `invoice.payment_failed` webhook handler in `src/app/api/webhooks/stripe/route.ts`
- [ ] Update user `subscriptionStatus` to `past_due` on failed payment
- [ ] Create failed payment email template (`src/emails/PaymentFailedEmail.tsx`)
- [ ] Send notification email to user with payment update link
- [ ] Add dashboard banner for users with `past_due` status
- [ ] Test with Stripe CLI webhook forwarding

#### Proration Logic (1h)
- [ ] Add proration mode to `createCheckoutSession` (prorate upgrades, credit downgrades)
- [ ] Test proration calculation in Stripe test mode
- [ ] Document proration behavior in code comments

---

### Sprint 3: Comprehensive Documentation (1 week, ~18h)

#### README.md Complete Rewrite (4h)
- [ ] Add hero section with tagline: "The EU-First SaaS Boilerplate"
- [ ] Create comprehensive features checklist (25+ items):
  - Authentication (Email, OAuth, Email Verification, Password Reset)
  - Payments (Stripe Subscriptions, Webhook Handling, Failed Payment Handling)
  - GDPR (Data Export, Account Deletion, Cookie Consent)
  - UI (Premium Emotional Design, Dark Mode, Responsive)
  - Admin Dashboard (User Management, Revenue Metrics)
  - Security (CSP, HTTPS, Secure Headers)
  - i18n (English/German)
  - Email (Resend, Professional Templates)
  - Database (Drizzle ORM, Turso, Migrations)
  - Testing (Unit + E2E Tests)
  - Deployment (Vercel One-Click)
- [ ] Add "Quick Start" section with 3 methods:
  1. One-Click Deploy (Vercel Button)
  2. Manual Setup (Clone → Install → Configure)
  3. Local Development
- [ ] Add tech stack section with shields.io badges
- [ ] Add "What's Included" vs "What You Customize" sections
- [ ] Add support information (email, issues)
- [ ] Add license information
- [ ] Add screenshots (placeholders with [Coming in Sprint 4])

#### Setup Documentation (5h)
**File:** `docs/setup.md`
- [ ] Document prerequisites (Node.js 18+, npm, accounts needed)
- [ ] **Turso Database Setup** (step-by-step with CLI commands):
  - Install Turso CLI
  - `turso db create my-saas-db`
  - `turso db show my-saas-db`
  - Get TURSO_DATABASE_URL and TURSO_AUTH_TOKEN
  - Run migrations: `npm run db:push`
- [ ] **Stripe Setup** (detailed):
  - Create Stripe account
  - Get API keys (test + live)
  - Create product + price
  - Get STRIPE_PRICE_ID
  - Configure webhooks (local + production)
  - Stripe CLI for local testing
- [ ] **Resend Email Setup**:
  - Create Resend account
  - Add domain or use test mode
  - Get API key
- [ ] **OAuth Providers Setup** (Google, GitHub):
  - Create OAuth apps
  - Configure redirect URLs
  - Get Client ID + Secret
- [ ] **Environment Variables Checklist** (every single variable explained)
- [ ] **First Run Walkthrough** (what to expect after setup)
- [ ] **Troubleshooting Section** (common errors with solutions):
  - Database connection failed
  - Stripe webhook signature verification failed
  - Email sending failed
  - OAuth redirect mismatch

#### Deployment Documentation (4h)
**File:** `docs/deployment.md`
- [ ] **Vercel Deployment Guide** (step-by-step with screenshots):
  - Connect GitHub repo
  - Configure environment variables
  - Deploy
  - Add domain
- [ ] **Environment Variables Checklist for Production**
- [ ] **Stripe Webhook Production Setup**:
  - Create production webhook endpoint
  - Configure webhook URL in Stripe Dashboard
  - Test webhook with Stripe Dashboard
- [ ] **Database Production Setup** (Turso production database)
- [ ] **Custom Domain Setup** (DNS configuration)
- [ ] **SSL/HTTPS** (automatic with Vercel)
- [ ] **Production Checklist**:
  - All env vars set
  - Webhooks configured
  - Database migrated
  - Test signup flow
  - Test payment flow
  - Test email sending

#### GDPR Documentation (3h)
**File:** `docs/gdpr.md`
- [ ] **Why This Boilerplate is GDPR-Compliant**
- [ ] **What Data is Collected**:
  - User account data (email, name, password hash)
  - Subscription data (Stripe Customer ID, status, period)
  - Session data (auth tokens, cookies)
- [ ] **Where Data is Stored**:
  - Turso database (EU region)
  - Stripe (EU data residency)
- [ ] **Data Export Implementation** (how /api/export-data works)
- [ ] **Account Deletion Implementation** (how /api/delete-account works)
- [ ] **Cookie Consent Banner** (how it works, localStorage)
- [ ] **What Buyers Must Customize**:
  - Update Imprint with their company info
  - Update Privacy Policy with their details
  - Configure cookie consent based on their needs
- [ ] **Legal Disclaimer** (not legal advice)

#### One-Click Deploy Setup (2h)
- [ ] Create `vercel.json` with environment variable prompts
- [ ] Add Vercel deploy button to README.md
- [ ] Test deploy button flow end-to-end
- [ ] Document post-deploy steps

---

### Sprint 4: Polish & Visual Assets (1 week, ~16h)

#### Code Organization Refactoring (4h)
- [ ] Split files larger than 300 lines into smaller modules
- [ ] Extract frequently used Tailwind patterns into reusable components (`src/components/ui/`)
- [ ] Ensure consistent naming conventions across codebase
- [ ] Organize imports with consistent order (React → Next → External → Internal → Types)
- [ ] Run ESLint and fix all warnings
- [ ] Add JSDoc comments to complex functions

#### Error Handling & Loading States (3h)
- [ ] Replace generic error messages with user-friendly alternatives
- [ ] Add Error Boundary components to critical sections (dashboard, settings)
- [ ] Improve loading states (skeleton screens instead of spinners where appropriate)
- [ ] Add optimistic UI updates for form submissions
- [ ] Test error scenarios (network errors, invalid input, server errors)

#### Landing Page Polish (2h)
- [ ] Review hero copy (emphasize EU/GDPR USP)
- [ ] Add trust badges (GDPR, Stripe Verified)
- [ ] Update features section with comprehensive list
- [ ] Add FAQ section (10-15 questions):
  - Why EU-focused?
  - What's included?
  - Do I need coding knowledge?
  - How do I customize it?
  - What's the tech stack?
  - Is support included?
  - Refund policy?
  - Updates included?
- [ ] Add pricing section details
- [ ] Ensure mobile responsiveness
- [ ] Test on different screen sizes

#### Take Professional Screenshots (4h)
- [ ] **Dashboard Screenshots**:
  - User dashboard (full view with stats, subscription status)
  - Admin dashboard (with metrics, user table)
  - Settings page (profile, billing, theme toggle)
  - Mobile responsive views
- [ ] **Auth Flow Screenshots**:
  - Signin page
  - Signup page
  - Verify email page
  - Reset password flow
- [ ] **Add annotations** using Figma/Canva:
  - Highlight key features
  - Add callouts for GDPR features
  - Circle important UI elements
- [ ] **Optimize images** (compress, proper sizing)
- [ ] **Add screenshots to**:
  - README.md
  - Landing page
  - docs/ folder

#### Video Tutorial (3h)
- [ ] Write script (5-7 minute setup walkthrough):
  1. Clone repo
  2. Install dependencies
  3. Setup Turso database
  4. Setup Stripe
  5. Setup Resend
  6. Configure .env
  7. Run locally
  8. Deploy to Vercel
- [ ] Record screen with voiceover (use OBS Studio or Loom)
- [ ] Edit video (trim, add captions if possible)
- [ ] Upload to YouTube (unlisted or public)
- [ ] Embed video link in README and docs/setup.md

---

### Sprint 5: Final Polish & Launch Prep (1 week, ~12h)

#### Security Audit (2h)
- [ ] Review all security headers in `next.config.ts`
- [ ] Verify CSP allows only necessary domains
- [ ] Check for exposed secrets (run `git secrets --scan`)
- [ ] Verify all API routes have proper authentication
- [ ] Test rate limiting (if implemented)
- [ ] Verify webhook HMAC validation
- [ ] Check HTTPS redirect on production

#### Final Testing (3h)
- [ ] Run all unit tests (`npm run test:unit`)
- [ ] Run all E2E tests (`npm run test:e2e`)
- [ ] Manual testing checklist:
  - [ ] Signup → Verify Email → Login
  - [ ] Password Reset flow
  - [ ] OAuth login (Google, GitHub)
  - [ ] Subscribe to paid plan
  - [ ] Cancel subscription
  - [ ] Reactivate subscription
  - [ ] Update profile settings
  - [ ] Change password
  - [ ] Export data (GDPR)
  - [ ] Delete account (GDPR)
  - [ ] Admin dashboard access
  - [ ] Mobile responsiveness
  - [ ] Dark mode toggle
  - [ ] Language switcher (en/de)
- [ ] Fix any bugs found during testing

#### Pricing Page Final (1h)
- [ ] Clarify what's included in purchase
- [ ] Add money-back guarantee badge (if applicable)
- [ ] Add payment security badges (Stripe, SSL)
- [ ] Link to documentation
- [ ] Link to demo (if available)

#### Launch Checklist (2h)
**File:** `LAUNCH_CHECKLIST.md`
- [ ] Create pre-launch checklist:
  - [ ] All tests passing
  - [ ] Documentation complete
  - [ ] Screenshots added
  - [ ] Video tutorial published
  - [ ] README comprehensive
  - [ ] .env.example complete
  - [ ] One-Click Deploy tested
  - [ ] Landing page polished
  - [ ] Pricing page ready
  - [ ] Legal pages updated (Imprint, Privacy)
  - [ ] Production deployment tested
  - [ ] Stripe webhooks working in production
  - [ ] Emails sending in production
  - [ ] GDPR features tested
  - [ ] Mobile responsive
  - [ ] Browser compatibility tested (Chrome, Firefox, Safari)
  - [ ] No console errors
  - [ ] Lighthouse score check (Performance, Accessibility, Best Practices, SEO)
- [ ] Create launch day task list:
  - [ ] Set up payment platform (Gumroad/LemonSqueezy)
  - [ ] Configure license delivery
  - [ ] Set pricing
  - [ ] Write product description
  - [ ] Add screenshots to product page
  - [ ] Test complete purchase flow
  - [ ] Prepare launch announcement (optional)

#### Performance Check (2h)
- [ ] Run Lighthouse audit on all pages
- [ ] Optimize images using `next/image` (verify all images use it)
- [ ] Check bundle size (`npm run build` output)
- [ ] Test loading times on slow 3G (Chrome DevTools)
- [ ] Ensure no unnecessary client-side JavaScript
- [ ] Verify lazy loading for below-fold content

#### Final Code Review (2h)
- [ ] Review all code changes since project start
- [ ] Remove any TODO comments or placeholder code
- [ ] Ensure consistent code style
- [ ] Remove console.logs in production code
- [ ] Verify no hardcoded values remain
- [ ] Check for sensitive data in comments
- [ ] Run `npm run lint` and fix all issues
- [ ] Run `npm run build` successfully

---

## 📦 Future Features (Post-Launch v1.1+)

These features are intentionally excluded from v1.0 to enable faster launch. Add them iteratively post-launch based on customer feedback:

### Content Features (v1.1)
- Blog system (Contentlayer + MDX)
- Changelog system (MDX)
- Launch blog posts (5x articles)

### Marketing Features (v1.2)
- Waitlist feature
- Email marketing integration (ConvertKit/Loops)
- Demo video for landing page (professional edit)
- Social proof section (testimonials)
- Comparison table (vs ShipFast, SupaStarter)

### Stripe Enhancements (v1.3)
- Dunning strategy (advanced email sequences)
- Invoice PDF downloads (custom branding)
- Coupon system
- Multiple subscription tiers

### Developer Experience (v1.4)
- Comprehensive test coverage (90%+)
- CI/CD pipeline (GitHub Actions)
- Storybook for UI components
- API reference documentation
- Architecture documentation with diagrams

### Advanced Features (v2.0)
- User onboarding flow
- Support widget (Crisp/Intercom)
- Advanced analytics (Plausible/Umami)
- Performance monitoring (detailed)
- Database backup automation
- Rate limiting dashboard
- Mobile app (React Native)

---

## Context for Claude Code

### Current Project State
- **Location:** Local development machine (Windows)
- **Database:** Turso (SQLite) with Drizzle ORM
- **Auth:** NextAuth v5 with email + OAuth (Google, GitHub)
- **Payments:** Stripe subscriptions configured
- **Emails:** Resend integration
- **i18n:** next-intl (en/de)
- **Error Monitoring:** Sentry

### What's Already Done (Don't Redo)
- ✅ Dashboard with real content (user + admin)
- ✅ GDPR features (data export, deletion, cookie consent)
- ✅ Security headers (CSP, etc.)
- ✅ Email templates (professional design)
- ✅ Stripe webhook with HMAC verification
- ✅ i18n configuration
- ✅ Landing page (basic)
- ✅ Legal pages

### What Needs Work (Current Sprint Focus)
- ❌ Hardcoded admin email (Sprint 1)
- ❌ Hardcoded email FROM address (Sprint 1)
- ❌ Many `as any` type bypasses (Sprint 1 + 2)
- ❌ No .env.example (Sprint 1)
- ❌ No tests (Sprint 1 + 2)
- ❌ Minimal documentation (Sprint 3)
- ❌ No screenshots/video (Sprint 4)
- ❌ No One-Click Deploy (Sprint 3)

### Key Files to Know
- `src/app/` - Next.js app directory
- `src/components/` - React components
- `src/lib/` - Utility functions and helpers
- `src/lib/db-new.ts` - Database helper functions (many `as any` here!)
- `src/lib/schema.ts` - Drizzle schema definitions
- `src/auth.ts` - NextAuth configuration
- `src/env.ts` - Environment variable validation (needs ADMIN_EMAILS, EMAIL_FROM_*)
- `src/app/api/` - API routes
- `src/app/api/webhooks/stripe/route.ts` - Stripe webhook handler
- `src/emails/` - Email templates
- `src/middleware.ts` - Auth + i18n middleware
- `next.config.ts` - Security headers, Sentry config

### Testing Strategy (Sprint 2 Focus)
- Unit tests for pure functions (if any extracted)
- **E2E tests for critical user flows** (Auth, Payment) - PRIORITY
- Use Vitest for unit tests
- Use Playwright for E2E tests
- Manual testing for everything else (MVP approach)

### Definition of Done
Each task is complete when:
- [ ] Code is written and working
- [ ] No TypeScript errors (`npm run build` succeeds)
- [ ] No ESLint errors (`npm run lint` passes)
- [ ] Tested manually (if UI/UX)
- [ ] Tests pass (if applicable)
- [ ] Documentation updated (if public-facing feature)
- [ ] Committed to git with clear commit message

---

## Quick Start Commands

```bash
# Development
npm run dev

# Database
npm run db:push          # Push schema changes
npm run db:studio        # Open Drizzle Studio

# Testing (After Sprint 1 setup)
npm run test             # Run all tests
npm run test:unit        # Unit tests only
npm run test:e2e         # E2E tests only

# Linting
npm run lint
npm run format

# Build
npm run build            # Must succeed with zero errors
npm start                # Production mode
```

---

## Git Workflow

- **Main branch:** Protected, only merge when sprint is complete
- **Feature branches:** Create for each sprint or major feature
  - Example: `sprint-1-critical-fixes`
  - Example: `sprint-2-testing`
- **Commit messages:** Clear and descriptive
  - Good: `feat: add admin email configuration with env validation`
  - Bad: `updates`

---

**Last Updated:** 2026-02-02
**Current Sprint:** Sprint 0 (Preparation) → Starting Sprint 1
**Next Milestone:** Sprint 1 completion (Critical Fixes) - Target: 1 week
**Launch Target:** ~5 weeks from now

## Wichtige Regeln für Claude Code

1. **Environment Variables:** Nutze immer `env.VARIABLE` statt `process.env.VARIABLE`
2. **Sei direkt und ehrlich:** Keine Schönrederei, keine falschen Versprechungen
3. **Git:** Niemals direkt im main branch arbeiten, immer Feature-Branch
4. **TypeScript:** Keine neuen `as any` hinzufügen! Wir entfernen sie, nicht vermehren
5. **Tests:** Wenn du Code in Sprint 2+ schreibst, frag ob Tests nötig sind
6. **Documentation:** Wenn du öffentliche Features änderst, dokumentiere es
7. **MVP Mindset:** Lieber schnell launchbar als perfekt aber nie fertig
8. **Free Tiers:** Keine Features vorschlagen die Geld kosten (außer Stripe, Resend)
