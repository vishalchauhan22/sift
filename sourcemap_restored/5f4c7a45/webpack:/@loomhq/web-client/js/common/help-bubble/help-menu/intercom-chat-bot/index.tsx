import { HELP_BUBBLE_ITEM_CLICKED } from '@js/constants/events';
import { INTERCOM_APP_ID } from '@js/constants/runtimeConfig';

import Intercom, { showMessages } from '@intercom/messenger-js-sdk';
import { LoggedInUser } from '@js/common/current-user';
import { useMount } from '@js/hooks/useMount';
import { useGetSelectedWorkspace } from '@js/hooks/workspace-basic';
import React from 'react';

import { Arrange, Spacer } from '@loomhq/lens';

import * as analytics from '@js/utilities/analytics';

import $ from '../styles.module.css';

type IntercomChatBotProps = {
  setShowHelpMenu: (show: boolean) => void;
  user: LoggedInUser;
};

export const IntercomChatBot = ({
  setShowHelpMenu,
  user,
}: IntercomChatBotProps): JSX.Element | null => {
  const { firstName, lastName, email, createdAt } = user;

  const currentWorkspace = useGetSelectedWorkspace();

  useMount(() => {
    // To prenvent Intercom chat from initialising without a workspace plan
    if (!currentWorkspace) {
      return;
    }

    Intercom({
      app_id: INTERCOM_APP_ID,
      name: firstName + ' ' + lastName,
      email,
      created_at: Number(createdAt),
      hide_default_launcher: true,
      user_hash: user.intercomHash ?? '',
      workspacePlan: currentWorkspace?.type,
    });
  });

  const handleClick = () => {
    analytics.track(HELP_BUBBLE_ITEM_CLICKED, { item: 'intercom_chat' });

    showMessages();
    setShowHelpMenu(false);
  };

  return (
    // TODO: Clean up CSS mess
    <button className={$.helpMenuRow} onClick={handleClick}>
      <Spacer x="medium" y="small">
        <Arrange gap="small">
          <span role="img" aria-label="robot">
            🤖
          </span>
          <div>Chat</div>
        </Arrange>
      </Spacer>
    </button>
  );
};
