import { ApolloError } from '@apollo/client';

import { isFromPublicSharePage } from '@js/utilities/url';

import { useGetIsInCalendlySegmentQuery } from './IsInCalendlySegment.generated';

type UseCalendlySegmentReturnType = {
  isOwnerInCalendlySegment: boolean | null;
  loading: boolean;
  error: ApolloError | undefined;
};

export const useCalendlySegment = (
  videoId: string,
  isCalendlyUrl = true
): UseCalendlySegmentReturnType => {
  const isSharePage = isFromPublicSharePage().fromPublicSharePage;

  const { data, loading, error } = useGetIsInCalendlySegmentQuery({
    variables: { videoId },
    // Don't fetch value on embeds or if the url does not match calendly regex
    skip: !isSharePage || !isCalendlyUrl,
  });

  const isOwnerInCalendlySegment =
    !loading &&
    !error &&
    data?.getIsInCalendlySegment?.__typename === 'GetCalendlySegmentPayload'
      ? data.getIsInCalendlySegment.isInCalendlySegment
      : null;

  return { isOwnerInCalendlySegment, loading, error };
};
