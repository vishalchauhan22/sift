import cn from 'classnames';
import React from 'react';

import { Arrange, Container, Text } from '@loomhq/lens';

import styles from './styles.module.css';

export const MenuItemTooltip = ({
  img,
  altText,
  text,
  title,
}: {
  img: string;
  altText: string;
  text: string;
  title: string;
}): JSX.Element => {
  return (
    <Container
      radius="large"
      borderSide="all"
      borderWidth="2px"
      borderColor="border"
      backgroundColor="white"
      width="300px"
      shadow="medium"
      overflow="hidden"
    >
      <div className={cn(styles.tooltipImage)}>
        <img src={img} alt={altText} />
      </div>

      <div className={cn(styles.tooltipDesc)}>
        <Container paddingTop="small">
          <Arrange gap="small" autoFlow="row">
            <Text variant="title">{title}</Text>
            <Text variant="body" color="bodyDimmed">
              {text}
            </Text>
          </Arrange>
        </Container>
      </div>
    </Container>
  );
};
