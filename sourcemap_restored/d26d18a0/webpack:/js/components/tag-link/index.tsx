import { LOOM_URI } from '@js/constants/routes';

import cx from 'classnames';

import React from 'react';

import { Link as ReactLink, useLocation } from 'react-router-dom';

import { Link, Text } from '@loomhq/lens';

import { useLogTagClickedMutation } from '../tags/tag-events';

import styles from './styles.module.css';

type TagLinkProps = {
  tag: string;
  context: string;
  useReactLink: boolean;
  className?: string;
  textColor?: string;
  // TODO(wap): Export from Lens then import directly
  textSize?:
    | 'body-sm'
    | 'body-md'
    | 'body-lg'
    | 'heading-sm'
    | 'heading-md'
    | 'heading-lg'
    | 'small'
    | 'medium'
    | 'large'
    | 'xlarge'
    | 'xxlarge'
    | 'xxxlarge';
  textWeight?: 'book' | 'bold';
  variant?: 'neutral' | 'primary';
  onKeyDown?: (event: React.KeyboardEvent) => void;
};

export function TagLink({
  tag,
  context,
  useReactLink,
  className = '',
  textColor = 'primary',
  textSize = 'small',
  textWeight = 'book',
  variant = 'neutral',
  onKeyDown,
}: TagLinkProps): JSX.Element {
  const location = useLocation();
  const { pathname } = location;
  const logTagClicked = useLogTagClickedMutation();

  const onClick = () => {
    logTagClicked({
      variables: { tag, context },
    });
  };

  const tagContent = (
    <Text size={textSize} color={textColor} fontWeight={textWeight} hasEllipsis>
      {`#${tag}`}
    </Text>
  );

  const profilePagePath = new RegExp('^/profile/[^/]+');
  const isProfilePage = profilePagePath.test(pathname);

  if (useReactLink) {
    return (
      <ReactLink
        onClick={onClick}
        to={`/tag/${tag}`}
        className={cx(className, styles.tagLink)}
        onKeyDown={onKeyDown}
        rel={isProfilePage ? 'nofollow' : undefined}
      >
        {tagContent}
      </ReactLink>
    );
  }

  return (
    <Link
      onClick={onClick}
      href={`${LOOM_URI}/tag/${tag}`}
      className={cx(className, styles.tagLink)}
      variant={variant}
      onKeyDown={onKeyDown}
      rel={isProfilePage ? 'nofollow' : undefined}
    >
      {tagContent}
    </Link>
  );
}
