import { useCalendlySegment } from '@js/pages/share/modals/calendly/useCalendlySegmentHook';
import React from 'react';

import { Arrange, Spacer, Container, Text, Icon } from '@loomhq/lens';
import { SvgCalendly } from '@loomhq/lens/icons/calendly';

import { CALENDLY_URL_REGEX } from '@loomhq/shared-utilities/utilities/validateUtils';

export function CalendlyNotice({
  ctaUrl,
  videoId,
}: {
  ctaUrl: string;
  videoId: string;
}): React.ReactElement {
  const isCalendlyCta = CALENDLY_URL_REGEX.test(ctaUrl);
  const { isOwnerInCalendlySegment } = useCalendlySegment(
    videoId,
    isCalendlyCta
  );

  return (
    <>
      {isOwnerInCalendlySegment ? (
        <Spacer top="medium">
          <Container
            backgroundColor="backgroundSecondary"
            padding={2}
            radius="large"
            htmlTag="section"
          >
            <Arrange gap="small">
              <Icon icon={<SvgCalendly />} />
              <Text isDimmed>
                Your Calendly will appear at the end of the video
              </Text>
            </Arrange>
          </Container>
        </Spacer>
      ) : null}
    </>
  );
}
