import { BACKLINK_DROPDOWN_CLICKED } from '@js/constants/events';

import { useVideoPasswordContext } from '@js/common/video-password';
import pluralize from 'pluralize';
import React, { useCallback, useRef } from 'react';

import * as analytics from '@js/utilities/analytics';
import styles from './styles.module.css';
import {
  Container,
  Popover,
  TextButton,
  useOnClickOutside,
  Text,
  Arrange,
  Icon,
} from '@loomhq/lens';

import { SvgChevronDown } from '@loomhq/lens/icons/chevron-down';
import { SvgChevronUp } from '@loomhq/lens/icons/chevron-up';
import { SvgSlack } from '@loomhq/lens/icons/slack';

import { BacklinkSourceType } from '@js/globalTypes.generated';

import {
  GetVideoBacklinksQuery,
  useGetVideoBacklinksQuery,
} from './GetVideoBacklinks.generated';
import { SlackBacklinks } from './slack-backlinks';
import { Backlink } from './types';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '@js/utilities/analytics/attribute-transformer';
import { BacklinksSectionFtux } from './BacklinksSectionFtux';
import { useOnDismissFtux } from '@js/hooks/ftux';
import { UserPropertyEnum } from '@loomhq/shared-utilities/constants/userProperties';

type BacklinksSectionProps = {
  videoId: string;
};

const selectBacklinkData = (
  data: GetVideoBacklinksQuery | undefined
): { totalNumberOfBacklinks: number; slackBacklinks: Backlink[] } => {
  let slackBacklinks: Backlink[] = [];
  let totalNumberOfBacklinks = 0;

  if (data?.getVideoBacklinks?.__typename === 'GetVideoBacklinksPayload') {
    totalNumberOfBacklinks = data.getVideoBacklinks.backlinks.length;

    slackBacklinks = data.getVideoBacklinks.backlinks.filter(
      backlink => backlink.source === BacklinkSourceType.Slack
    );
  }

  return { slackBacklinks, totalNumberOfBacklinks };
};

export const BacklinksSection = ({
  videoId,
}: BacklinksSectionProps): JSX.Element | null => {
  const [isFtuxOpen, setIsFtuxOpen] = React.useState(false);
  const onDismissFtux = useOnDismissFtux();

  const handleDismissFtux = useCallback(() => {
    setIsFtuxOpen(false);
    onDismissFtux(UserPropertyEnum.SLACK_BACKLINKS_FTUX);
  }, [onDismissFtux, setIsFtuxOpen]);

  const { password } = useVideoPasswordContext();

  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setIsPopoverOpen(false));

  const { data, loading } = useGetVideoBacklinksQuery({
    variables: { videoId, password },
  });

  const { slackBacklinks, totalNumberOfBacklinks } = selectBacklinkData(data);

  if (totalNumberOfBacklinks === 0 || loading) {
    return null;
  }

  return (
    <Container width="fit-content">
      <div ref={ref}>
        <Popover
          isOpen={isPopoverOpen}
          placement="bottomRight"
          content={
            <Container
              contentColor="body"
              backgroundColor="overlay"
              borderSide="all"
              radius="medium"
              shadow="medium"
              padding="medium"
              width={45}
              maxHeight={40}
              overflow="auto"
            >
              <Arrange autoFlow="row" gap={1.25} columns={['1fr']}>
                <Text>This Loom has been mentioned in:</Text>
                <SlackBacklinks videoId={videoId} backlinks={slackBacklinks} />
              </Arrange>
            </Container>
          }
        >
          <TextButton
            onClick={() => {
              analytics.track(BACKLINK_DROPDOWN_CLICKED, {
                ...withIdentifiers(
                  BACKLINK_DROPDOWN_CLICKED,
                  AnalyticsEntityId.video(videoId, 'video_id')
                ),
                toggled_to: isPopoverOpen ? 'collapsed' : 'expanded',
              });

              setIsPopoverOpen(!isPopoverOpen);
              handleDismissFtux();
            }}
            iconPosition="right"
            icon={isPopoverOpen ? <SvgChevronUp /> : <SvgChevronDown />}
            className={isFtuxOpen ? styles.upgradeBackground : undefined}
          >
            <Arrange gap={1}>
              <Text fontWeight="bold">{`${totalNumberOfBacklinks} ${pluralize(
                'mention',
                totalNumberOfBacklinks
              )} in`}</Text>

              {slackBacklinks.length > 0 ? (
                <Icon icon={<SvgSlack />} size={2.5} />
              ) : null}
            </Arrange>
          </TextButton>
          <BacklinksSectionFtux
            setIsFtuxOpen={setIsFtuxOpen}
            handleDismissFtux={handleDismissFtux}
          />
        </Popover>
      </div>
    </Container>
  );
};
