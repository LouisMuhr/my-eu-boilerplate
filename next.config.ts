// Datei: next.config.ts
import { withSentryConfig } from "@sentry/nextjs";
import createNextIntlPlugin from 'next-intl/plugin';
import "./src/env";

const withNextIntl = createNextIntlPlugin();

const nextConfig = {};

export default withSentryConfig(withNextIntl(nextConfig), {
    silent: true,
});