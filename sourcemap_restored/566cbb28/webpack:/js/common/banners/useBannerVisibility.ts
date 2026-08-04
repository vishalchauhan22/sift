import { useEffect, useRef } from 'react';

type ReportBannerVisibility = (
  component: JSX.Element,
  isVisible: boolean
) => void;

export const useBannerVisibility = (
  isVisible: boolean,
  reportBannerVisibility: ReportBannerVisibility,
  component: JSX.Element
): void => {
  const hasReported = useRef<boolean>(false);

  useEffect(() => {
    if (!hasReported.current && isVisible) {
      reportBannerVisibility(component, true);
      hasReported.current = true;
    }
  }, [isVisible, reportBannerVisibility, component]);
};
