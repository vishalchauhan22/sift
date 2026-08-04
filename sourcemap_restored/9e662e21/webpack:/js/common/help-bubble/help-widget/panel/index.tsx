import { isProduction } from '@js/constants/environment';

import {
  CSM_AI_WIDGET_OPERATION_FAILURE,
  CSM_AI_WIDGET_EMBED_RENDERED,
  CSM_AI_WIDGET_STATUS_CHANGE,
} from '@js/constants/events';

import {
  CSMWidgetEmbed,
  CSMWidgetEmbedSDK,
} from '@atlassian/customer-service-management-widget-sdk-react';
import cx from 'classnames';

import { useSearchParams } from '@js/hooks/useSearchParams';
import {
  SelectedWorkspaceType,
  useGetSelectedWorkspace,
} from '@js/hooks/workspace-basic';
import React, {
  useState,
  useRef,
  Fragment,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import * as analytics from '@js/utilities/analytics';
import * as logger from '@js/utilities/loggerx';
import { distributionMetric, incrementMetric } from '@js/utilities/metrics';

import { Logo } from '@loomhq/lens';
import { Feature } from '@loomhq/shared-utilities/constants/product';

import { CloseButton } from './close-button';
import { Form } from './form';
import {
  useShouldToggleAlwaysBeVisible,
  useIsEnterpriseUser,
  useCsmWidgetMenuGroups,
} from './hooks';
import { CsmWidgetPanelMenu, type MenuGroup } from './menu';
import { MenuToggleButton } from './menu-toggle-button';
import { WidgetSpinner } from './spinner';
import $ from './styles.module.css';
import { ViewToggle } from './view-toggle';
import { OPEN_ON_LAUNCH_PARAM } from '../../constants';
import { WIDGET_BUBBLE_SIZE, WIDGET_EDGE_OFFSET } from '../constants';
import { useCsmJourneyId } from '../csm-journey-id';
import { useCurrentUserSelector } from '@js/common/current-user';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '../../../../utilities/analytics/attribute-transformer';
import { TICKET_CATEGORIES } from '@loomhq/shared-utilities/constants/helpBubble';

const LOOM_STAGING_SUPPORT_HUB_SITE_SETTINGS = {
  site: 'jcs-loom-staging.jira-dev.com',
  siteId: '87c7661a-e0e9-4e89-9137-7a72f6b3a1d8',
  widgetId: '6163484e-53c2-4f83-88f7-5619dcb55098',
};

const LOOM_PROD_SUPPORT_HUB_SITE_SETTINGS = {
  site: 'useloom.atlassian.net',
  siteId: '333ed75e-8d13-4d7c-adcf-f34296905dba',
  widgetId: '93c9cf55-9f83-4a1a-9d3e-0b3b9f21d30c',
};

export const CHAT_LOAD_TIMEOUT = 10000;

type CsmWidgetPanelProps = {
  expanded: boolean;
  onClose: () => void;
  preload?: boolean;
  menuGroups: MenuGroup[];
  rightOffset: number;
};

type CSMWidgetConversation = Awaited<
  ReturnType<CSMWidgetEmbedSDK['getConversation']>
>;

export const CsmWidgetPanel = ({
  expanded,
  onClose,
  preload,
  menuGroups: baseMenuGroups,
  rightOffset,
}: CsmWidgetPanelProps): React.ReactNode => {
  const userShouldAlwaysSeeViewToggle = useShouldToggleAlwaysBeVisible();
  const isEnterpriseUser = useIsEnterpriseUser();
  const [mountEmbed, setMountEmbed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [view, setView] = useState<'chat' | 'contact'>('chat');
  const [defaultCategory, setDefaultCategory] = useState<string | undefined>(
    undefined
  );
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [chatStatus, setChatStatus] = useState<'launching' | 'online' | null>(
    null
  );
  const [hasSeenConversation, setHasSeenConversation] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const loadTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const embedSdkRef = useRef<CSMWidgetEmbedSDK | null>(null);
  const [conversationForTicket, setConversationForTicket] =
    useState<CSMWidgetConversation | null>(null);
  const workspace: Partial<SelectedWorkspaceType> = useGetSelectedWorkspace();
  const csmJourneyId = useCsmJourneyId();
  const params = useSearchParams();
  const openOnLaunch = params.get(OPEN_ON_LAUNCH_PARAM) === 'true';
  const userId = useCurrentUserSelector(user => user.id.toString(), undefined);

  const [startTimestamp, setStartTimestamp] = useState<number>(0);

  const onViewChange = async (nextView: 'chat' | 'contact') => {
    try {
      if (embedSdkRef.current && nextView === 'contact' && conversationId) {
        // Async but effectively will be returned immediately
        const conversation = await embedSdkRef.current.getConversation({
          conversationId,
        });

        if (conversation) {
          setConversationForTicket(conversation);
        }
      }
    } catch {
      analytics.track(CSM_AI_WIDGET_OPERATION_FAILURE, {
        ...withIdentifiers(
          CSM_AI_WIDGET_OPERATION_FAILURE,
          AnalyticsEntityId.csmJourneyId(csmJourneyId, 'csmJourneyId')
        ),
        failure: 'getConversationFailure',
        workspacePlan: workspace?.type,
      });
      setError(new Error('Failed to get conversation'));
    }

    setDefaultCategory(undefined);
    setView(nextView);
  };

  if (view !== 'contact' && conversationForTicket) {
    // Clear the conversation for ticket if we are not viewing the contact form
    setConversationForTicket(null);
  }

  if ((preload || expanded) && !mountEmbed) {
    // Only mount the embed if we know we need it
    // otherwise we load an iframe of content the user may not even use
    setStartTimestamp(performance.now());
    setMountEmbed(true);
  }

  const createNewChat = () => {
    setConversationId(null);
    setIsMenuOpen(false);
    setView('chat');
    setHasSeenConversation(false);
    embedSdkRef.current?.createNewConversation();
  };

  const openSupportForm = () => {
    setIsMenuOpen(false);
    setDefaultCategory(TICKET_CATEGORIES.FEATURE_REQUEST);
    setView('contact');
  };

  const menuGroups = useCsmWidgetMenuGroups(
    baseMenuGroups,
    createNewChat,
    openSupportForm
  );

  useEffect(() => {
    if (openOnLaunch && isEnterpriseUser) {
      setView('contact');
    }
  }, [isEnterpriseUser, openOnLaunch]);

  const showViewToggle =
    (userShouldAlwaysSeeViewToggle || error || hasSeenConversation) &&
    !isMenuOpen;

  const isChatView = view === 'chat';
  const isContactView = view === 'contact';
  const isChatLoading = chatStatus === null;
  const showCloseButton = !isMenuOpen && showViewToggle;
  const showContactScreen = !isMenuOpen && isContactView;
  const showChatScreen = !isMenuOpen && isChatView && !isChatLoading;
  const showChatSpinner = !isMenuOpen && isChatView && isChatLoading;

  useEffect(() => {
    if (mountEmbed) {
      logger.info('CSM Widget: Embed component rendered', {
        feature: Feature.HelpBubble,
        csmJourneyId,
      });

      incrementMetric('csm.widget.embed.rendered');

      analytics.track(CSM_AI_WIDGET_EMBED_RENDERED, {
        ...withIdentifiers(
          CSM_AI_WIDGET_EMBED_RENDERED,
          AnalyticsEntityId.csmJourneyId(csmJourneyId, 'csmJourneyId')
        ),
        workspacePlan: workspace?.type,
      });

      return () => {
        incrementMetric('csm.widget.embed.unmounted');

        logger.info('CSM Widget: Embed component unmounted', {
          feature: Feature.HelpBubble,
        });
      };
    }
  }, [mountEmbed, csmJourneyId, workspace?.type]);

  const clearLoadTimeout = useCallback(() => {
    if (typeof loadTimeout.current === 'number') {
      clearTimeout(loadTimeout.current);
      loadTimeout.current = null;
    }
  }, []);

  useEffect(() => {
    if (mountEmbed) {
      loadTimeout.current = setTimeout(() => {
        logger.error(
          'CSM Widget: Load timeout (10s)',
          {
            csmJourneyId,
          },
          {
            feature: Feature.HelpBubble,
            csmJourneyId,
          }
        );

        incrementMetric('csm.widget.embed.error', {
          error: 'widgetLoadTimeout',
        });

        analytics.track(CSM_AI_WIDGET_OPERATION_FAILURE, {
          ...withIdentifiers(
            CSM_AI_WIDGET_OPERATION_FAILURE,
            AnalyticsEntityId.csmJourneyId(csmJourneyId, 'csmJourneyId')
          ),
          failure: 'widgetLoadTimeout',
          workspacePlan: workspace?.type,
        });
        setError(new Error('Chat was not online within 10 seconds.'));
      }, CHAT_LOAD_TIMEOUT);
    }

    return () => {
      clearLoadTimeout();
    };
  }, [mountEmbed, csmJourneyId, workspace?.type, clearLoadTimeout]);

  useEffect(() => {
    const checkIfConversationRestored = async () => {
      if (chatStatus !== 'online') {
        return;
      }

      if (!embedSdkRef.current) {
        logger.error(
          'CSM Widget: Embed SDK not found when chat status is online',
          {
            csmJourneyId,
          },
          {
            feature: Feature.HelpBubble,
            csmJourneyId,
          }
        );

        incrementMetric('csm.widget.embed.error', {
          error: 'checkConversationRestored',
        });

        analytics.track(CSM_AI_WIDGET_OPERATION_FAILURE, {
          ...withIdentifiers(
            CSM_AI_WIDGET_OPERATION_FAILURE,
            AnalyticsEntityId.csmJourneyId(csmJourneyId, 'csmJourneyId')
          ),
          failure: 'checkConversationRestored',
          workspacePlan: workspace?.type,
        });

        return setError(
          new Error(
            'Embed SDK not found when chat status is online. This should never happen.'
          )
        );
      }

      const conversation = await embedSdkRef.current.getCurrentConversation();
      if (conversation) {
        setHasSeenConversation(true);
      }
    };

    checkIfConversationRestored();
  }, [chatStatus, csmJourneyId, workspace?.type]);

  const widgetSettings = useMemo(() => {
    const siteSettings = isProduction
      ? LOOM_PROD_SUPPORT_HUB_SITE_SETTINGS
      : LOOM_STAGING_SUPPORT_HUB_SITE_SETTINGS;

    return {
      ...siteSettings,
      userId,
      uiConfig: {
        errors: {
          message: `We're not sure what went wrong.\n\nSelect 'Contact Support' above to raise a request and our team will follow up to assist you.`,
        },
        chatInput: {
          placeholder: {
            default: 'How can I help?',
            empty: 'Curious about something? Ask away.',
          },
        },
      },
      analyticsContext: {
        attributes: {
          csmJourneyId,
          loomUserId: userId ?? null,
          loomWorkspaceId: workspace?.id ?? null,
        },
      },
    };
  }, [csmJourneyId, workspace?.id, userId]);

  return (
    <div
      role="dialog"
      id="csm-widget"
      aria-hidden={!expanded}
      style={{
        ['--local-widget-bubble-size' as string]: `${WIDGET_BUBBLE_SIZE}px`,
        ['--local-widget-right-edge-offset' as string]: `${rightOffset + WIDGET_EDGE_OFFSET}px`,
        ['--local-widget-bottom-edge-offset' as string]: `${WIDGET_EDGE_OFFSET * 2 + WIDGET_BUBBLE_SIZE}px`,
      }}
      className={cx($.panel, { [$.expanded]: expanded })}
    >
      <header className={cx($.header, { [$.withBorder]: isMenuOpen })}>
        <div className={$.headerButtonSlot}>
          <MenuToggleButton
            isMenuOpen={isMenuOpen}
            onClick={() => setIsMenuOpen(prev => !prev)}
          />
        </div>
        <div>
          {isMenuOpen && <Logo maxWidth="24px" variant="symbol" brand="loom" />}
          {showViewToggle && (
            <ViewToggle view={view} onViewChange={onViewChange} />
          )}
        </div>
        <div className={$.headerButtonSlot}>
          {showCloseButton && <CloseButton onClick={onClose} />}
        </div>
      </header>
      {isMenuOpen && (
        <nav className={cx($.nav)}>
          <CsmWidgetPanelMenu menuGroups={menuGroups} />
        </nav>
      )}
      <div
        aria-hidden={!showContactScreen}
        className={cx($.content, $.formContainer, {
          [$.hidden]: !showContactScreen,
        })}
      >
        {isContactView && (
          <Fragment>
            <h2 className="srOnly">Contact Support</h2>
            <Form
              conversation={conversationForTicket}
              onSuccess={() => {
                setConversationId(null);
                setHasSeenConversation(false);
                embedSdkRef.current?.createNewConversation();
                setDefaultCategory(undefined);
              }}
              onSuccessClose={() => {
                setView('chat');
                onClose();
                setDefaultCategory(undefined);
              }}
              onSuccessReturnToChat={() => {
                setView('chat');
                setDefaultCategory(undefined);
              }}
              category={defaultCategory}
            />
          </Fragment>
        )}
      </div>
      {showChatSpinner && <WidgetSpinner />}
      <div
        aria-hidden={!showChatScreen}
        className={cx($.content, {
          [$.hidden]: !showChatScreen,
        })}
      >
        <h2 className="srOnly">Chat</h2>
        {mountEmbed && (
          <CSMWidgetEmbed
            settings={widgetSettings}
            sdk={embedSdkRef}
            onError={({ message }) => {
              /**
               * If the widget encounters an error before the 10 second timeout,
               * lets assume the widget may have fataly errored and we should
               * instead focus on error rate instead of load timeout errors.
               */
              clearLoadTimeout();

              logger.error(
                'CSM Widget: Error occurred in widget',
                {
                  csmJourneyId,
                  errorMessage: message,
                },
                {
                  feature: Feature.HelpBubble,
                }
              );

              incrementMetric('csm.widget.embed.error', {
                error: 'widgetError',
              });

              analytics.track(CSM_AI_WIDGET_OPERATION_FAILURE, {
                ...withIdentifiers(
                  CSM_AI_WIDGET_OPERATION_FAILURE,
                  AnalyticsEntityId.csmJourneyId(csmJourneyId, 'csmJourneyId')
                ),
                chatStatus: chatStatus ?? 'none',
                failure: 'widgetError',
                workspacePlan: workspace?.type,
                message,
              });
              setError(new Error('Error occurrred in widget'));
            }}
            onDebug={debug => {
              logger.debug(debug.message, {
                csmJourneyId,
                feature: Feature.HelpBubble,
                timeSinceLoadStart: performance.now() - startTimestamp,
                startTimestamp,
              });

              distributionMetric(
                'csm.widget.embed.debug.time',
                performance.now() - startTimestamp,
                {
                  debugMessage: debug.message,
                }
              );
            }}
            onChatStatus={status => {
              analytics.track(CSM_AI_WIDGET_STATUS_CHANGE, {
                ...withIdentifiers(
                  CSM_AI_WIDGET_STATUS_CHANGE,
                  AnalyticsEntityId.csmJourneyId(csmJourneyId, 'csmJourneyId')
                ),
                status,
                workspacePlan: workspace?.type,
              });

              logger.info(`CSM Widget: Widget status changed to ${status}`, {
                feature: Feature.HelpBubble,
                csmJourneyId,
                status,
              });

              incrementMetric('csm.widget.embed.chat.status', {
                status,
              });

              switch (status) {
                case 'online': {
                  if (typeof loadTimeout.current === 'number') {
                    distributionMetric(
                      'csm.widget.render.time',
                      performance.now() - startTimestamp
                    );
                  }
                  clearLoadTimeout();
                  setChatStatus('online');
                  break;
                }

                case 'launching': {
                  setChatStatus('launching');
                  break;
                }

                default: {
                  break;
                }
              }
            }}
            onChatMessage={{
              started: ({ conversationId: startedConversationId }) => {
                logger.info('CSM Widget: User started message send', {
                  feature: Feature.HelpBubble,
                  csmJourneyId,
                  conversationId: startedConversationId,
                });

                incrementMetric('csm.widget.embed.chat.message', {
                  action: 'started',
                });

                setConversationId(startedConversationId);
              },
              completed: ({ conversationId: completedConversationId }) => {
                logger.info(
                  'CSM Widget: User successfully streamed message response',
                  {
                    feature: Feature.HelpBubble,
                    csmJourneyId,
                    conversationId: completedConversationId,
                  }
                );

                incrementMetric('csm.widget.embed.chat.message', {
                  action: 'completed',
                });

                setHasSeenConversation(true);
              },
              failed: ({
                conversationId: failedConversationId,
                error: failure,
              }) => {
                logger.error(
                  'CSM Widget: Failed to send message',
                  {
                    csmJourneyId,
                    conversationId: failedConversationId,
                  },
                  {
                    csmJourneyId,
                    conversationId: failedConversationId,
                    feature: Feature.HelpBubble,
                  }
                );

                incrementMetric('csm.widget.embed.chat.message', {
                  action: 'failed',
                });

                analytics.track(CSM_AI_WIDGET_OPERATION_FAILURE, {
                  ...withIdentifiers(
                    CSM_AI_WIDGET_OPERATION_FAILURE,
                    AnalyticsEntityId.csmJourneyId(csmJourneyId, 'csmJourneyId')
                  ),
                  failure: 'messageSendFailure',
                  workspacePlan: workspace?.type,
                });
                setError(failure);
              },
            }}
          />
        )}
      </div>
    </div>
  );
};
