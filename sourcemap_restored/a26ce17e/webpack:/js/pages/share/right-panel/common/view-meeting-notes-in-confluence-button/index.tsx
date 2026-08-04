import { useAnalytics } from '@js/common/analytics/atlassian-analytics/useAnalytics';

import { useVideoContext } from '@js/common/video-player';
import { useWorkspaceSetting } from '@js/hooks/workspaceSettings';

import React from 'react';

import useResizeObserver from 'use-resize-observer';

import { Arrange, Button, Icon, Text } from '@loomhq/lens';
import { SvgChevronRight } from '@loomhq/lens/icons/chevron-right';
import { SvgConfluenceNeutral } from '@loomhq/lens/icons/confluence-neutral';

import {
  AMN_REFERRAL_SOURCES,
  AMN_REFERRAL_SOURCE_QUERY_PARAM,
} from '@loomhq/shared-utilities/constants/analyticsSources';
import { WorkspaceSetting } from '@loomhq/shared-utilities/constants/settings';

import { withParam } from '@loomhq/shared-utilities/utilities/urlUtils';

import { useGetMeetingNotesPageQuery } from '@js/common/meeting-recordings';

export const ViewMeetingNotesInConfluenceButton =
  (): React.ReactElement | null => {
    const {
      video: { id: videoId },
    } = useVideoContext();

    const { value: amnSettingValue } = useWorkspaceSetting(
      WorkspaceSetting.ALLOWS_AMN
    );

    // AMN setting is turned off only when above value is false. When the value is not set, it is true.
    const isAmnEnabled = amnSettingValue !== false;

    const { data } = useGetMeetingNotesPageQuery({ variables: { videoId } });

    const { sendUiEvent } = useAnalytics();
    const logAnalyticsOnClick = () => {
      sendUiEvent({
        action: 'clicked',
        actionSubject: 'link',
        actionSubjectId: 'meetingNotesInRecapTabLink',
        source: 'videoShare',
      });
    };

    let pageUrl: string | null = null;
    if (data?.getVideo?.__typename === 'RegularUserVideo') {
      pageUrl = data?.getVideo?.meetingNotesPage?.pageUrl || null;
    }
    pageUrl =
      pageUrl &&
      withParam(
        AMN_REFERRAL_SOURCE_QUERY_PARAM,
        AMN_REFERRAL_SOURCES.LOOM_VIDEO_SHARE,
        pageUrl
      );

    // At this width, the button CTA text is too long for the button.
    const SMALL_WIDTH_BREAKPOINT = 565; // px
    const { ref, width: containerWidth = 0 } =
      useResizeObserver<HTMLDivElement>();
    const isSmallWidth = containerWidth < SMALL_WIDTH_BREAKPOINT;

    const AMN_BUTTON_CTA = 'View and edit notes in Confluence';
    const AMN_BUTTON_CTA_SHORTENED = 'View in Confluence';

    return pageUrl && isAmnEnabled ? (
      <div
        ref={ref}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          zIndex: 10,
        }}
      >
        <Button
          htmlTag="a"
          onClick={logAnalyticsOnClick}
          href={pageUrl}
          target="_blank"
          variant="primary"
          size="large"
          style={{
            backgroundColor: 'var(--lns-color-blue)',
            borderColor: 'var(--lns-color-blue)',
            width: 'min(calc(100% - 2rem), 600px)',
            padding: 'var(--lns-space-small) var(--lns-space-medium)',
            minWidth: '280px',
          }}
        >
          <Arrange
            columns={['36px', '1fr', '18px']}
            alignItems="center"
            gap="small"
            justifyContent="space-between"
          >
            <Icon
              color="white"
              aria-label="confluence logo"
              icon={<SvgConfluenceNeutral />}
              size={4}
            />
            <Text
              fontWeight="bold"
              color="white"
              alignment="center"
              size="body-lg"
              hasEllipsis
            >
              {isSmallWidth ? AMN_BUTTON_CTA_SHORTENED : AMN_BUTTON_CTA}
            </Text>
            <Icon
              color="white"
              aria-label="chevron right"
              icon={<SvgChevronRight />}
              size={4}
            />
          </Arrange>
        </Button>
      </div>
    ) : null;
  };
