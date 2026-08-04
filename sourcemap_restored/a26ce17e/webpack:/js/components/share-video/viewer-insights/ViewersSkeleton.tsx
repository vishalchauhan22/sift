import React from 'react';

import { Container, Arrange, Spacer, Split, SplitSection } from '@loomhq/lens';

const LoadingViewer = () => {
  return (
    <Spacer bottom={2} top={2} left={1}>
      <Arrange columns={['auto 1fr']} gap={2}>
        <Container
          height={4}
          width={4}
          backgroundColor="disabledBackground"
          radius="full"
          paddingLeft={4}
        />
        <Split direction="column" alignItems="start" gap={1}>
          <SplitSection>
            <Container
              height={1.5}
              width={15}
              backgroundColor="disabledBackground"
              style={{ borderRadius: '4px' }}
            />
          </SplitSection>
          <SplitSection>
            <Split direction="row" gap={2}>
              <SplitSection>
                <Container
                  height={1.5}
                  width={4}
                  backgroundColor="disabledBackground"
                  style={{ borderRadius: '4px' }}
                />
              </SplitSection>
              <SplitSection>
                <Container
                  height={1.5}
                  width={4}
                  backgroundColor="disabledBackground"
                  style={{ borderRadius: '4px' }}
                />
              </SplitSection>
            </Split>
          </SplitSection>
        </Split>
      </Arrange>
    </Spacer>
  );
};

export const ViewersSkeleton = ({
  rowCount,
}: {
  rowCount: number;
}): React.ReactElement => {
  const rows: JSX.Element[] = [];

  for (let i = 0; i < rowCount; i++) {
    rows.push(<LoadingViewer key={i} />);
  }

  return <>{rows}</>;
};
