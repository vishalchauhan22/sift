import { useIsCurrentUserLoggedIn } from '@js/common/current-user';
import { useVideoContext } from '@js/common/video-player';
import { useIsEligibleForAiNudgeDisplay } from '@js/hooks/aiNudges';
import React from 'react';

import { Container, Text, Arrange, Align, Spacer } from '@loomhq/lens';

import { SignupOverlay } from '../SignupOverlay';
import { useExpMwebCommenting } from '@js/hooks/experiments/useExpMwebCommenting';

const CommentsEmptyStateIllustration = (): JSX.Element => {
  return (
    <svg width="253" height="188" viewBox="0 0 270 204" fill="none">
      <g filter="url(#filter0_d_3251_179862)">
        <rect
          x="8.5"
          y="5"
          width="221"
          height="103"
          rx="18.5688"
          fill="var(--lns-color-background)"
        />
        <rect
          x="32.2583"
          y="16.3792"
          width="28"
          height="28"
          rx="14"
          fill="var(--lns-color-disabledBackground)"
          strokeWidth="2"
        />
        <rect
          x="67.2583"
          y="25.019"
          width="62.6697"
          height="10.8318"
          rx="3.0948"
          fill="var(--lns-color-disabledBackground)"
        />
        <rect
          x="135.344"
          y="25.019"
          width="25.5321"
          height="10.8318"
          rx="3.0948"
          fill="var(--lns-color-disabledBackground)"
        />
        <rect
          x="67.2583"
          y="45.1353"
          width="115.82"
          height="10.8318"
          rx="3.0948"
          fill="var(--lns-color-disabledBackground)"
        />
        <rect
          x="67.2583"
          y="62.1567"
          width="137.483"
          height="10.8318"
          rx="3.0948"
          fill="var(--lns-color-disabledBackground)"
        />
        <rect
          x="67.2583"
          y="79.178"
          width="99.5719"
          height="10.8318"
          rx="3.0948"
          fill="var(--lns-color-disabledBackground)"
        />
        <rect
          x="9.2737"
          y="5.7737"
          width="219.453"
          height="101.453"
          rx="17.7951"
          stroke="var(--lns-color-disabledBackground)"
          strokeWidth="1.5474"
        />
      </g>
      <g filter="url(#filter1_d_3251_179862)">
        <rect
          x="59.5645"
          y="121.174"
          width="201.936"
          height="71.4434"
          rx="18.5688"
          fill="var(--lns-color-background)"
        />
        <rect
          x="83.3228"
          y="132.553"
          width="28"
          height="28"
          rx="14"
          fill="var(--lns-color-disabledBackground)"
          strokeWidth="2"
        />
        <rect
          x="118.323"
          y="142.193"
          width="62.6697"
          height="10.8318"
          rx="3.0948"
          fill="var(--lns-color-disabledBackground)"
        />
        <rect
          x="186.408"
          y="142.193"
          width="25.5321"
          height="10.8318"
          rx="3.0948"
          fill="var(--lns-color-disabledBackground)"
        />
        <rect
          x="118.323"
          y="162.31"
          width="118.419"
          height="10.8318"
          rx="3.0948"
          fill="var(--lns-color-disabledBackground)"
        />
        <rect
          x="60.3382"
          y="121.948"
          width="200.388"
          height="69.896"
          rx="17.7951"
          stroke="var(--lns-color-disabledBackground)"
          strokeWidth="1.5474"
        />
      </g>
      <path
        d="M41.769 107.635V131.232C41.769 137.642 46.965 142.838 53.3745 142.838H60.3379"
        stroke="var(--lns-color-disabledBackground)"
        strokeWidth="1.5474"
      />
      <defs>
        <filter
          id="filter0_d_3251_179862"
          x="0.762997"
          y="0.357798"
          width="236.474"
          height="118.474"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3.0948" />
          <feGaussianBlur stdDeviation="3.8685" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_3251_179862"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_3251_179862"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_3251_179862"
          x="51.8275"
          y="116.532"
          width="217.41"
          height="86.9174"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3.0948" />
          <feGaussianBlur stdDeviation="3.8685" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_3251_179862"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_3251_179862"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

const RegularEmptyStatePlaceholder = ({
  videoOwnerName,
}: {
  videoOwnerName: string;
}) => (
  <Container paddingY="10vh" style={{ textAlign: 'center' }}>
    <CommentsEmptyStateIllustration />
    <Spacer bottom={3} />
    <Text fontWeight="bold" size="body-lg">
      No comments… yet
    </Text>
    <Spacer top={1} bottom={2}>
      <Align alignment="center">
        <Text size="body-sm">
          <Arrange gap="xsmall">
            {'Hit '}
            <Container
              backgroundColor="tabBackground"
              paddingX={0.5}
              style={{
                borderRadius: '4px',
              }}
            >
              <Text fontWeight="bold" size="body-sm" color="bodyDimmed">
                C
              </Text>
            </Container>
            {` to reply to ${videoOwnerName}.`}
          </Arrange>
        </Text>
      </Align>
    </Spacer>
  </Container>
);

const EmptyStateWithSignupOverlay = () => {
  return (
    <Container paddingY="10vh" style={{ textAlign: 'center' }}>
      <CommentsEmptyStateIllustration />
      <SignupOverlay />
    </Container>
  );
};

const EmptyStateForMweb = ({ videoOwnerName }: { videoOwnerName: string }) => {
  return (
    <Container
      radius="300"
      backgroundColor="grey1"
      paddingX={4}
      paddingY={2}
      style={{ textAlign: 'center' }}
    >
      <Text color="body" fontWeight="bold" size="body-md">
        {`Let ${videoOwnerName} know what you think`}
      </Text>
      <Text color="bodyDimmed" size="body-sm">
        Share your thoughts and leave feedback 💬
      </Text>
    </Container>
  );
};

export const NoCommentsPlaceholder = ({
  inActivitySidebar,
}: {
  inActivitySidebar?: boolean;
}): React.ReactElement => {
  const {
    video: {
      owner: { displayName: videoOwnerName },
    },
  } = useVideoContext();
  const isLoggedIn = useIsCurrentUserLoggedIn();
  const isEligibleForAiNudges = useIsEligibleForAiNudgeDisplay();
  const { isExpMwebCommenting } = useExpMwebCommenting();

  if (isExpMwebCommenting) {
    return <EmptyStateForMweb videoOwnerName={videoOwnerName ?? ''} />;
  }

  if (inActivitySidebar) {
    if (!isLoggedIn && !isEligibleForAiNudges) {
      return <EmptyStateWithSignupOverlay />;
    }

    return (
      <RegularEmptyStatePlaceholder videoOwnerName={videoOwnerName ?? ''} />
    );
  }

  return (
    <Container
      backgroundColor="backgroundSecondary"
      radius="large"
      paddingY="medium"
      style={{ textAlign: 'center' }}
    >
      <Text fontWeight="bold">{`There aren't any comments yet.`}</Text>
      <Text
        fontWeight="book"
        color="bodyDimmed"
      >{`Be the first. Add a comment on the video above.`}</Text>
    </Container>
  );
};
