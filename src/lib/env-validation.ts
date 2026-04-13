/**
 * Build-time validation for frontend environment variables.
 *
 * Imported early in the app so misconfigured deployments fail fast
 * instead of silently degrading at runtime.
 */

interface EnvVar {
  name: string;
  /** Only required in production builds */
  prodOnly?: boolean;
  /** Fallback key (e.g. VITE_ prefix for backwards compat) */
  fallback?: string;
}

const ENV_SCHEMA: EnvVar[] = [
  { name: 'PUBLIC_API_URL', prodOnly: true, fallback: 'VITE_API_URL' },
  { name: 'PUBLIC_CMS_SNAPSHOT_BASE', prodOnly: false, fallback: 'VITE_CMS_SNAPSHOT_BASE' },
  // Sentry DSN is optional — missing just disables error tracking
];

function getEnvValue(name: string, fallback?: string): string {
  // import.meta.env is statically replaced at build time by Vite/Astro
  const map: Record<string, string | undefined> = {
    PUBLIC_API_URL: import.meta.env.PUBLIC_API_URL,
    VITE_API_URL: import.meta.env.VITE_API_URL,
    PUBLIC_CMS_SNAPSHOT_BASE: import.meta.env.PUBLIC_CMS_SNAPSHOT_BASE,
    VITE_CMS_SNAPSHOT_BASE: import.meta.env.VITE_CMS_SNAPSHOT_BASE,
    PUBLIC_SENTRY_DSN: import.meta.env.PUBLIC_SENTRY_DSN,
  };

  return (map[name] || (fallback ? map[fallback] : undefined) || '').trim();
}

const warnings: string[] = [];

ENV_SCHEMA.forEach(({ name, prodOnly, fallback }) => {
  const value = getEnvValue(name, fallback);

  if (!value && prodOnly && import.meta.env.PROD) {
    warnings.push(`[env] Missing required env var ${name} (production build)`);
  }

  // Warn about fallback usage — nudge towards PUBLIC_ prefix
  if (!getEnvValue(name) && fallback && getEnvValue(fallback)) {
    warnings.push(
      `[env] ${fallback} is deprecated — rename to ${name}`,
    );
  }
});

if (warnings.length > 0 && typeof console !== 'undefined') {
  warnings.forEach((w) => console.warn(w));
}

export const envValidated = true;
