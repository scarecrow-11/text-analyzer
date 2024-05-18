// Sentry SDK configuration
import * as Sentry from '@sentry/node'
import { nodeProfilingIntegration } from '@sentry/profiling-node'

const SENTRY_DSN = process.env.SENTRY_DSN || ''

Sentry.init({
    dsn: SENTRY_DSN,
    integrations: [nodeProfilingIntegration()],
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0
})
