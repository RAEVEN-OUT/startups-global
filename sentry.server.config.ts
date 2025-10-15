import * as Sentry from '@sentry/nextjs';

if (process.env.SENTRY_AUTH_TOKEN) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || '',
    tracesSampleRate: 1.0,
  });
}
