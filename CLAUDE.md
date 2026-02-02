# EU Boilerplate - Projektkontext

## Was ist das?
Next.js 15 SaaS Boilerplate mit EU-Compliance (DSGVO, Impressum, etc.)

## Tech Stack
- Next.js 15 (App Router)
- NextAuth v5
- Drizzle ORM + Turso (SQLite)
- Stripe (Subscriptions)
- Resend (E-Mails)
- Tailwind CSS

## Bereits erledigt (Sprint Woche 1)
- [x] Env-Validation mit @t3-oss/env-nextjs (src/env.ts)
- [x] OAuth-Buttons (Google + GitHub) funktionsfähig
- [x] E-Mail-Verifizierung (Double Opt-In)
- [x] Sentry Error Monitoring (Server + Client + Replay)
- [x] Rate Limiting auf /api/auth/* (in-memory, per IP)
- [x] Security Headers in next.config.ts
- [x] Einheitliche Stripe-Version

## Sprint Woche 2 – Verkaufbarkeit
- [ ] Dokumentation (README, Setup-Guide, API-Docs)
- [ ] Demo-Feature (Showcase-Feature zur Demonstration)
- [ ] Landing Page mit Screenshots
- [ ] Video-Walkthrough
- [ ] AGB-Template (Terms of Service)

## Wichtige Dateien
- src/auth.ts – NextAuth Konfiguration
- src/env.ts – Env-Validation
- src/lib/db-new.ts – Datenbank Helpers
- src/lib/schema.ts – Drizzle Schema

## Regeln
- Nutze `env.VARIABLE` statt `process.env.VARIABLE`
- Sei direkt und ehrlich, keine Schönrederei
- Niemals im main branch arbeiten
```

Claude Code liest diese Datei automatisch und kennt dann den Kontext.