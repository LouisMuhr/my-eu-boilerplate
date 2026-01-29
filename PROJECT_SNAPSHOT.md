
# Projekt Snapshot

## Projektname
my-eu-boilerplate (v0.1.0)

## Ordnerstruktur (./src)
app/
  api/
    auth/
      [...nextauth]
    create-checkout/
      route.ts
    create-portal-link/
      route.ts
    delete-account/
      route.ts
    export-data/
      route.ts
    forgot-password/
      route.ts
    register/
      route.ts
    reset-password/
      route.ts
    support/
    user/
      update
    verify-email/
      route.ts
    webhooks/
      stripe
  global.css
  layout.tsx
  robots.ts
  sitemap.ts
  [locale]/
    admin/
      actions.ts
      AdminTable.tsx
      page.tsx
    auth/
      forgot-password
      reset-password
      signin
      signup
      verify-email
    dashboard/
      actions.ts
      page.tsx
    landing/
      page.tsx
    layout.tsx
    legal/
      imprint
      privacy
    page.tsx
auth.config.ts
auth.ts
components/
  cookie-consent.tsx
  DashboardActions.tsx
  Footer.tsx
  LocaleSwitcher.tsx
  PremiumProducts.tsx
  Techstack.tsx
  ui/
    button.tsx
    card.tsx
emails/
  ResetPasswordEmail.tsx
  VerifyEmail.tsx
env.ts
i18n/
  request.ts
  routing.ts
lib/
  admin.ts
  auth-utils.ts
  auth.ts
  config.ts
  db-new.ts
  drizzle.ts
  mail.ts
  schema.ts
  stripe-helper.ts
  utils.ts
  validations.ts
middleware.ts
types/
  next-auth.d.ts

## Bekannte TODOs
Keine TODOs gefunden

## Abhängigkeiten
- Dependencies: @libsql/client, @radix-ui/react-slot, @react-email/components, @react-email/render, @stripe/stripe-js, @t3-oss/env-nextjs, bcryptjs, better-sqlite3, class-variance-authority, clsx, dotenv, drizzle-orm, lucide-react, next, next-auth, next-intl, react, react-dom, resend, sonner, sqlite3, stripe, stripe-cli, tailwind-merge, tailwindcss-animate, zod
- DevDependencies: @tailwindcss/postcss, @types/better-sqlite3, @types/node, @types/react, @types/react-dom, drizzle-kit, eslint, eslint-config-next, tailwindcss, tw-animate-css, typescript

## Test Coverage
Jest nicht installiert oder Tests konnten nicht ausgeführt werden
