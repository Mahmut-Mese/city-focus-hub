import { QueryClient } from '@tanstack/react-query';

/**
 * Shared stale-time constant for all QueryClient instances.
 * Centralised here so it can be tuned in one place instead of being
 * copy-pasted into every island / hook file.
 */
export const DEFAULT_STALE_TIME = 60_000;

/** Create a QueryClient with project-wide defaults. */
export function createQueryClient() {
  return new QueryClient({
    defaultOptions: { queries: { staleTime: DEFAULT_STALE_TIME } },
  });
}
