import UserAvatar from '@js/components/user-avatar';
import React from 'react';

import { Arrange, Icon, Text } from '@loomhq/lens';

import { SvgGoogle } from '@loomhq/lens/icons/google';
import { SvgSlack } from '@loomhq/lens/icons/slack';

const IMG_SRC = {
  google: <SvgGoogle />,
  slack: <SvgSlack />,
};

type MentionUser = {
  avatar: string;
  source: string;
  display: string;
  email: string;
};

type MentionSuggestionProps = {
  user: MentionUser;
};

export const MentionSuggestion = ({
  user,
}: MentionSuggestionProps): JSX.Element => {
  const { avatar: userAvatarSrc, source, display, email } = user;

  let displayString = display.trim();

  if (displayString.length === 0) {
    displayString = email;
  } else if (displayString.indexOf(' ') === -1) {
    displayString = `${displayString} (${email})`;
  }

  return (
    <Arrange
      justifyContent="start"
      alignItems="center"
      gap="small"
      columns={['24px', '1fr', '24px']}
    >
      <UserAvatar avatarSrc={userAvatarSrc} name={display} avatarSize={3} />
      <Text size="body-md" fontWeight="bold" color="white">
        {displayString}
      </Text>

      <Icon altText={source} icon={IMG_SRC[source]} size={2} />
    </Arrange>
  );
};
