import React from 'react';

import {
  Container,
  Spacer,
  Split,
  SplitSection,
  SkeletonContainer,
} from '@loomhq/lens';

const height = '12px';

const Label = (): JSX.Element => {
  return <SkeletonContainer height={height} width="120px" animated={true} />;
};

const ListItem = ({ index }: { index: number }): JSX.Element => {
  const titleWidths = ['35%', '45%', '40%', '35%'];
  const descriptionWidths = ['25%', '40%', '30%', '35%'];

  return (
    <Container
      borderSide="all"
      borderWidth="1px"
      marginTop="medium"
      paddingY="large"
      paddingX="20px"
      radius="xlarge"
    >
      <Split
        alignItems="center"
        justifyContent="space-between"
        gap="medium"
        wrap="nowrap"
      >
        <SplitSection grow={1}>
          <SkeletonContainer
            height={height}
            width={titleWidths[index]}
            animated={true}
          />
          <Spacer bottom="small" />
          <SkeletonContainer
            height={height}
            width={descriptionWidths[index]}
            animated={true}
          />
        </SplitSection>
        <SkeletonContainer height="16px" width="24px" animated={true} />
      </Split>
    </Container>
  );
};

const ListSection = ({
  section,
  quantity,
}: {
  section: number;
  quantity: number;
}): JSX.Element => {
  return (
    <Container marginBottom="xlarge">
      <Label />
      {Array.from({ length: quantity }, (_, index) => (
        <ListItem key={`${section}-${index}`} index={index} />
      ))}
    </Container>
  );
};

export const LoadingList = (): JSX.Element => {
  return (
    <>
      <ListSection section={0} quantity={3} />
      <ListSection section={1} quantity={4} />
      <ListSection section={2} quantity={3} />
    </>
  );
};
