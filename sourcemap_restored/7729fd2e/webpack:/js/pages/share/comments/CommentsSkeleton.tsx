import React from 'react';

import { Container, Arrange, Spacer } from '@loomhq/lens';

const NUM_LOADING_COMMENTS = 3;

const CommentLine = ({
  width,
  empty,
}: {
  width: string | number;
  empty?: boolean;
}) => {
  return (
    <Spacer bottom={2}>
      {empty ? (
        <Container height={1.5} width={width} radius="medium" />
      ) : (
        <Container
          height={1.5}
          width={width}
          backgroundColor="disabledBackground"
          style={{ borderRadius: '4px' }}
        />
      )}
    </Spacer>
  );
};

const LoadingComment = () => {
  return (
    <Spacer bottom={1}>
      <Arrange columns={['auto 1fr']} gap="small">
        <div>
          <Container
            height={3}
            width={3}
            backgroundColor="disabledBackground"
            radius="full"
          />
          <CommentLine width={3} empty={true} />
          <CommentLine width={3} empty={true} />
          <CommentLine width={3} empty={true} />
        </div>
        <div>
          <Spacer top={2}>
            <Arrange gap="small">
              <CommentLine width={10} />
              <CommentLine width={4} />
            </Arrange>
          </Spacer>
          <CommentLine width="90%" />
          <CommentLine width="95%" />
          <CommentLine width="70%" />
        </div>
      </Arrange>
    </Spacer>
  );
};

export const CommentsSkeleton = (): React.ReactElement => {
  const rows: JSX.Element[] = [];

  for (let i = 0; i < NUM_LOADING_COMMENTS; i++) {
    rows.push(<LoadingComment key={i} />);
  }

  return <>{rows}</>;
};
