import React from 'react';

import {
  Container,
  Arrange,
  Text,
  Button,
  Split,
  SplitSection,
  Align,
} from '@loomhq/lens';

import atlassianLinkedLoomSvg from '@assets/img/icons/new/atlassian-linked-loom.svg';

import { useBannerVisibility } from '../useBannerVisibility';
import { useShowAtlassianMergeAccountBanner } from './useShouldShowAtlassianMergeAccountBanner';

type AtlassianMergeAccountBannerProps = {
  reportBannerVisibility: (component: JSX.Element, isVisible: boolean) => void;
};

export const AtlassianMergeAccountBanner = ({
  reportBannerVisibility,
}: AtlassianMergeAccountBannerProps): JSX.Element | null => {
  const { shouldShowMergeAccountBanner } = useShowAtlassianMergeAccountBanner();

  useBannerVisibility(
    shouldShowMergeAccountBanner,
    reportBannerVisibility,
    <AtlassianMergeAccountBanner
      reportBannerVisibility={reportBannerVisibility}
    />
  );

  if (!shouldShowMergeAccountBanner) {
    return null;
  }

  return (
    <Container backgroundColor="blurpleLight" paddingY={0} paddingX={2}>
      <Split justifyContent="space-between" wrap="nowrap">
        <SplitSection grow={1} shrink={2}>
          <Container>
            <Align alignment="center">
              <Arrange alignItems="center" gap="medium" justifyContent="center">
                <img
                  src={atlassianLinkedLoomSvg}
                  alt="Atlassian linked with Loom icon"
                  height={72}
                  width={72}
                />
                <Text
                  color="blurpleStrong"
                  size="body-md"
                  fontWeight="bold"
                  className="py:medium"
                >
                  Your Loom and Atlassian profiles are ready to merge
                </Text>
                <Button
                  htmlTag="a"
                  variant="neutral"
                  size="small"
                  href="https://support.loom.com/hc/en-us/articles/20298912718877-Merging-Atlassian-and-Loom-accounts"
                  target="_blank"
                >
                  Learn more
                </Button>
                <Button
                  variant="primary"
                  size="small"
                  htmlTag="a"
                  href="/merge-atlassian-profile"
                >
                  Get started
                </Button>
              </Arrange>
            </Align>
          </Container>
        </SplitSection>
      </Split>
    </Container>
  );
};
