import { useSharePageSlugs } from '@js/hooks/experiments/useSharePageSlugs';

// Please do not add flags to this file UNLESS
// you absolutely need the flag exposed this high
// in the component tree. Most flags should be
// fetched as closely to their usage as possible,
// which is typically the component that actually
// needs the field
export const useBulkLoadedFeatureFlags = (): void => {
  useSharePageSlugs(); // prefetching early on to avoid slowdown
};
