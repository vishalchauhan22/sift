import React from 'react';

import { Arrange, Container, Text } from '@loomhq/lens';

import { AdminHeaderType } from './types';

type AdminHeaderProps = {
  type?: AdminHeaderType;
  title: string;
  description?: string;
};

const TAG_MAP = {
  page: {
    htmlTag: 'h1',
    variant: 'mainTitle',
    spacing: 'xlarge',
  },
  tool: {
    htmlTag: 'h2',
    variant: 'title',
    spacing: 'medium',
  },
} as const;

export const AdminHeader = ({
  type = AdminHeaderType.Tool,
  title,
  description = '',
}: AdminHeaderProps): JSX.Element => {
  return (
    <Container
      htmlTag="header"
      marginBottom={TAG_MAP[type].spacing}
      paddingTop="medium"
    >
      <Arrange gap="small" autoFlow="row">
        <Text
          variant={TAG_MAP[type].variant}
          htmlTag={TAG_MAP[type].htmlTag}
          alignment="left"
        >
          {title}
        </Text>
        {description ? <Text>{description}</Text> : null}
      </Arrange>
    </Container>
  );
};
