import { useCurrentUserSelector } from '@js/common/current-user';

export function useHasSomeScopes(scopes: string[]): boolean {
  return useCurrentUserSelector(
    user => scopes.some(scope => user.scopes.includes(scope)),
    false
  );
}

export function useHasAllScopes(scopes: string[]): boolean {
  return useCurrentUserSelector(
    user => scopes.every(scope => user.scopes.includes(scope)),
    false
  );
}

export function useHasScope(name: string): boolean {
  return useHasAllScopes([name]);
}
