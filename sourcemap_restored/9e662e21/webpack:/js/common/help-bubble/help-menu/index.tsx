import { HELP_BUBBLE_ITEM_CLICKED } from '@js/constants/events';

import { CANNY_IO_APP_ID } from '@js/constants/runtimeConfig';

import { LoggedInOnly, LoggedInUser } from '@js/common/current-user';
import { CONTACT_SUPPORT_MODAL } from '@js/common/modal-container';
import { useModals } from '@js/common/modal-container/useModals';
import { useHasScope } from '@js/hooks/useHasScopes';
import React from 'react';

import { Arrange, Container, Spacer, Text } from '@loomhq/lens';
import { stringUtils } from '@loomhq/shared-utilities';

import { HELP_BUBBLE_EDU_LINK } from '@loomhq/shared-utilities/constants/scopes';
import * as analytics from '@js/utilities/analytics';

import {
  WHATS_NEW_LINK,
  DESTINATION_HELP_LINK,
  WAYS_TO_USE_LOOM_LINK,
  TROUBLESHOOTING_LINK,
  EDUCATIONAL_RESOURCES_LINK,
  CAREERS_LINK,
  CANNY_IO_FEEDBACK_URL,
} from './constants';
import { IntercomChatBot } from './intercom-chat-bot';
import $ from './styles.module.css';
import { CannyUser, LinkProps } from './types';
import { useCannyExtScriptDynamically } from './useCannyExtScriptDynamically';
import { useCsmJourneyId } from '../help-widget/csm-journey-id';

export const HelpMenu: React.FC<
  React.PropsWithChildren<{
    show: boolean;
    setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
    hasContactSupportScope?: boolean;
    showChatbot?: boolean;
    helpButtonRef: React.RefObject<HTMLButtonElement>;
  }>
> = ({
  show = false,
  setShowMenu,
  hasContactSupportScope = false,
  showChatbot = false,
}) => {
  const updatesLinks = [WHATS_NEW_LINK, CAREERS_LINK];
  const infoLinks = [
    DESTINATION_HELP_LINK,
    WAYS_TO_USE_LOOM_LINK,
    TROUBLESHOOTING_LINK,
  ];

  const hasEduLinkScope = useHasScope(HELP_BUBBLE_EDU_LINK);

  if (hasEduLinkScope) {
    infoLinks.splice(2, 0, EDUCATIONAL_RESOURCES_LINK);
  }

  return (
    <>
      {show && (
        <Container
          backgroundColor="background"
          borderSide="all"
          radius="medium"
          shadow="large"
          paddingY="small"
          minWidth="15rem"
        >
          <>
            {updatesLinks.map((link, i) => (
              <HelpMenuRow {...link} key={i} />
            ))}
            <div className="borderTop width:full my:small" />
            {infoLinks.map((link, i) => (
              <HelpMenuRow {...link} key={i} />
            ))}
            <div className="borderTop width:full my:small" />

            {showChatbot ? (
              <LoggedInOnly>
                {user => (
                  <IntercomChatBot setShowHelpMenu={setShowMenu} user={user} />
                )}
              </LoggedInOnly>
            ) : null}
            {hasContactSupportScope && (
              <ContactSupportRow setShowMenu={setShowMenu} />
            )}
            <LoggedInOnly>
              {user => <CannyIoRow currentUser={user} />}
            </LoggedInOnly>
          </>
        </Container>
      )}
    </>
  );
};

const HelpMenuRow: React.FC<React.PropsWithChildren<LinkProps>> = ({
  emoji,
  ariaLabel,
  label,
  url,
  isHighlighted = false,
}) => {
  const handleClick = () => {
    const itemLabelSnakeCase = stringUtils.titleToSnakeCase(label);

    analytics.track(HELP_BUBBLE_ITEM_CLICKED, {
      item: itemLabelSnakeCase,
    });

    return false;
  };

  return (
    <a
      href={url}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className={$.helpMenuRow}
    >
      <Container paddingX="medium" paddingY="small">
        <Arrange gap="small">
          {/* eslint-disable-next-line jsx-a11y/aria-role */}
          <span role="emoji" aria-label={ariaLabel}>
            {emoji}
          </span>
          {isHighlighted ? (
            <Text fontWeight="bold">{label}</Text>
          ) : (
            <Text>{label}</Text>
          )}
        </Arrange>
      </Container>
    </a>
  );
};

const ContactSupportRow: React.FC<
  React.PropsWithChildren<{
    setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  }>
> = ({ setShowMenu }) => {
  const { openModal } = useModals();
  const csmJourneyId = useCsmJourneyId();

  const handleContactSupportClick = () => {
    analytics.track(HELP_BUBBLE_ITEM_CLICKED, {
      item: 'contact_support',
    });

    setShowMenu(false);

    openModal({
      modalType: CONTACT_SUPPORT_MODAL,
      options: {
        csmJourneyId,
      },
    });
  };

  return (
    <button className={$.helpMenuRow} onClick={handleContactSupportClick}>
      <Spacer x="medium" y="small">
        <Arrange gap="small">
          {/* eslint-disable-next-line jsx-a11y/aria-role */}
          <span role="emoji" aria-label="chat bubble">
            💬
          </span>
          <div>Contact support</div>
        </Arrange>
      </Spacer>
    </button>
  );
};

declare global {
  interface Window {
    Canny(event: string, user: CannyUser, callback: () => void): null;
    ccShowWidget(): null;
    ccSetParameter(key: string, value: string): null;
  }
}

const CannyIoRow: React.FC<
  React.PropsWithChildren<{ currentUser: LoggedInUser }>
> = ({ currentUser }) => {
  useCannyExtScriptDynamically();

  const handleCannyIoClick = () => {
    analytics.track(HELP_BUBBLE_ITEM_CLICKED, { item: 'give_feedback' });
    cannyIdentifyUser(currentUser);
  };

  return (
    <button className={$.helpMenuRow} onClick={handleCannyIoClick}>
      <Spacer x="medium" y="small">
        <Arrange gap="small">
          {/* eslint-disable-next-line jsx-a11y/aria-role */}
          <span role="emoji" aria-label="lightbulb">
            💡
          </span>
          <Text>Give Feedback</Text>
        </Arrange>
      </Spacer>
    </button>
  );
};

const cannyIdentifyUser = (currentUser: LoggedInUser): void => {
  window.Canny &&
    window.Canny(
      'identify',
      {
        appID: CANNY_IO_APP_ID,
        user: {
          email: currentUser.email,
          name: [currentUser.firstName, currentUser.lastName].join(' '),
          id: Number(currentUser.id),
          customFields: {
            workspace_role: currentUser.memberships?.[0]?.member_role as string,
            workspace_id: currentUser.memberships?.[0]?.organization
              .id as any as number,
          },
        },
      },
      () => {
        window.location.href = CANNY_IO_FEEDBACK_URL;
      }
    );
};
