// Datei: next.config.ts
import createNextIntlPlugin from 'next-intl/plugin';
import "./src/env";

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
    // Deine restliche Config (Sentry etc.)
};

export default withNextIntl(nextConfig);