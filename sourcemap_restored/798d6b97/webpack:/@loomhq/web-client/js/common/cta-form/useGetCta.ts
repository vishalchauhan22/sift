import { useMemo } from 'react';

import { useGetCtaQuery } from './GetCta.generated';
import { Cta } from './useCtaForm';

export const useGetCta: (videoId: string) => Cta | null = (videoId: string) => {
  const { data, loading, error } = useGetCtaQuery({
    variables: { videoId },
  });

  return useMemo<Cta | null>(() => {
    if (
      loading ||
      error ||
      !data ||
      !data.getVideo ||
      data.getVideo.__typename !== 'RegularUserVideo' ||
      !data.getVideo.cta
    ) {
      return null;
    }

    const { enabled, url, is_auto, mods, text, approved_at } =
      data.getVideo.cta;

    if (!url && (!text || !mods)) {
      return null;
    }

    return {
      ctaEnabled: enabled,
      ctaText: text,
      ctaUrl: url,
      ctaMods: mods as Cta['ctaMods'],
      ctaIsAuto: is_auto as Cta['ctaIsAuto'],
      ctaApprovedAt: approved_at,
    };
  }, [data, loading, error]);
};
