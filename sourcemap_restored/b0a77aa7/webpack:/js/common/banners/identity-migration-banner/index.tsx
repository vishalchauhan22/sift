import React from 'react';

import FtuxWrapper from '@js/components/ftux/ftux-wrapper';
import { useOnDismissFtux } from '@js/hooks/ftux';
import {
  Align,
  Arrange,
  Button,
  Container,
  Split,
  SplitSection,
  IconButton,
  Text,
} from '@loomhq/lens';

import atlassianLinkedLoomSquareSvg from '@assets/img/icons/new/atlassian-linked-loom-square.svg';
import { UserPropertyEnum } from '@loomhq/shared-utilities/constants/userProperties';

import { useBannerVisibility } from '../useBannerVisibility';
import { SvgClose } from '@loomhq/lens/icons/close';
import { useUserProperty } from '@js/hooks/user/useUserProperty';
import { useCurrentUserSelector } from '@js/common/current-user';
import { isAtlassianMastered } from '@js/utilities/user';

type IdentityMigrationBannerProps = {
  reportBannerVisibility: (component: JSX.Element, isVisible: boolean) => void;
};

export function IdentityMigrationBanner({
  reportBannerVisibility,
}: IdentityMigrationBannerProps): JSX.Element | null {
  const onDismissFtux = useOnDismissFtux();
  const now = new Date();

  const currentUser = useCurrentUserSelector(user => user, null);
  const atlassianMastered = currentUser
    ? isAtlassianMastered(currentUser)
    : false;

  const {
    value: identityMigrationProperties,
    loading: loadingIdentityMigrationProperties,
  } = useUserProperty(UserPropertyEnum.IDENTITY_MIGRATION_PROPERTIES);

  // Only show the banner if we are within 7 days of the migration eligibility start date
  let withinBannerWindow = false;
  if (
    identityMigrationProperties !== null &&
    identityMigrationProperties.migrationEligibilityStartDate !== null
  ) {
    const bannerNotificationStartDate = new Date(
      new Date(
        identityMigrationProperties.migrationEligibilityStartDate
      ).getTime() -
        7 * 24 * 60 * 60 * 1000
    );

    withinBannerWindow = bannerNotificationStartDate.getTime() <= now.getTime();
  }
  const showIdentityMigrationBanner =
    !loadingIdentityMigrationProperties &&
    identityMigrationProperties !== null &&
    withinBannerWindow &&
    !atlassianMastered;

  useBannerVisibility(
    Boolean(showIdentityMigrationBanner),
    reportBannerVisibility,
    <IdentityMigrationBanner reportBannerVisibility={reportBannerVisibility} />
  );

  return showIdentityMigrationBanner ? (
    <FtuxWrapper name={UserPropertyEnum.IDENTITY_MIGRATION_BANNER_FTUX}>
      <Container backgroundColor="blurpleLight" paddingY={0} paddingX={2}>
        <Split justifyContent="space-between" wrap="nowrap">
          <SplitSection grow={12}>
            <Container>
              <Align alignment="center">
                <Arrange
                  alignItems="center"
                  gap="medium"
                  justifyContent="center"
                >
                  <img
                    src={atlassianLinkedLoomSquareSvg}
                    alt="Identity migration banner"
                    height={72}
                    width={72}
                  />
                  <Text
                    color="blurpleStrong"
                    size="body-md"
                    fontWeight="bold"
                    className="py:medium"
                  >
                    Your Loom profile will move to Atlassian soon.
                  </Text>
                  <Button
                    htmlTag="a"
                    variant="primary"
                    size="small"
                    href="https://support.loom.com/hc/en-us/articles/20298912718877-Merging-Atlassian-and-Loom-accounts"
                    target="_blank"
                    // TODO: add a link to the support article when it is available
                    // https://useloom.atlassian.net/browse/MIG-818
                  >
                    Learn more
                  </Button>
                </Arrange>
              </Align>
            </Container>
          </SplitSection>
          <SplitSection grow={1}>
            <Align alignment="centerRight">
              <IconButton
                altText="Close"
                icon={<SvgClose />}
                onClick={() =>
                  onDismissFtux(UserPropertyEnum.IDENTITY_MIGRATION_BANNER_FTUX)
                }
              />
            </Align>
          </SplitSection>
        </Split>
      </Container>
    </FtuxWrapper>
  ) : null;
}
