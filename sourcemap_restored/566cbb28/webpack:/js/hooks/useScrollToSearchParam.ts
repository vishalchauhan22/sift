import { useLocation } from 'react-router-dom';

import { useSearchParams } from './useSearchParams';

export interface ScrollToSearchParamOptions {
  /** If `false` the parameter will remain the in URL. Defaults to `true` */
  removeParam?: boolean;
  delayMs?: number;
  /** Allows for additional business logic before attempting to scroll. Defaults to `true` which allows for scroll. */
  preCondition?: () => boolean;
}

/**
 * @description Watches for a "scrollTo" search param and scrolls to the element with the id specified in the search param.
 */
export function useScrollToSearchParam(
  options?: ScrollToSearchParamOptions
): () => void {
  const location = useLocation();
  const params = useSearchParams();
  const scrollToParam = params.get('scrollTo');

  const removeParam = options?.removeParam ?? true;
  const delayMs = options?.delayMs ?? 0;
  const condition: boolean = options?.preCondition?.() ?? true;

  const scrollToFunction = () => {
    if (scrollToParam && condition) {
      const element = document.getElementById(scrollToParam);

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, delayMs);
      }

      if (removeParam) {
        params.delete('scrollTo');
        window.history.replaceState(null, '', '?' + params + location.hash);
      }
    }
  };

  return scrollToFunction;
}
