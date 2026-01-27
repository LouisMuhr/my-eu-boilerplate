// Datei: next.config.ts
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
    // Deine restliche Config (Sentry etc.)
};

export default withNextIntl(nextConfig);