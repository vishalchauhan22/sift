/* eslint-disable @loomhq/loom/no-js-extension */
import React from 'react';

import { Text } from '@loomhq/lens';

export const CreatorLiteLimitApproachingCard = ({ notification }) => {
  return (
    <>
      <Text size="body-lg">
        You&apos;re approaching your Creator Lite Limit
      </Text>
      <Text isInline>
        👋 Just a reminder that you&apos;re approaching the Creator Lite limit{' '}
        for the {notification.workspace.name} Workspace under your current plan.
      </Text>
    </>
  );
};

export const CreatorLiteLimitReachedCard = ({ notification }) => {
  return (
    <>
      <Text size="body-lg">You&apos;ve reached your Creator Lite Limit</Text>
      <Text isInline>
        👋 Just a heads up that you&apos;ve reached the Creator Lite limit for{' '}
        the {notification.workspace.name} Workspace under your current plan.
      </Text>
    </>
  );
};
