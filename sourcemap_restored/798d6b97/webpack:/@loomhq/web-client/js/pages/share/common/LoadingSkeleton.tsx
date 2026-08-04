import React from 'react';
import { Container, SkeletonText, Spacer } from '@loomhq/lens';

/**
 * Shared loading skeleton component used by both Create and Edit tab controllers
 * Shows a consistent loading state with skeleton text elements
 */
export const LoadingSkeleton = (): React.ReactElement => {
  return (
    <Container padding={3}>
      <Spacer bottom={1}>
        <Container width={20}>
          <SkeletonText size="heading-md" lines={1} />
        </Container>
      </Spacer>
      <SkeletonText size="heading-lg" lines={1} />
      <SkeletonText size="heading-lg" lines={1} />
      <Spacer top={2} bottom={1}>
        <Container width={20}>
          <SkeletonText size="heading-md" lines={1} />
        </Container>
      </Spacer>
      <SkeletonText size="heading-lg" lines={1} />
      <SkeletonText size="heading-lg" lines={1} />
      <SkeletonText size="heading-lg" lines={1} />
      <SkeletonText size="heading-lg" lines={1} />
      <SkeletonText size="heading-lg" lines={1} />
      <SkeletonText size="heading-lg" lines={1} />
    </Container>
  );
};
