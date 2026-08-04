import { ErrorSeverities } from '@js/constants/error-severities';

import {
  CSM_AI_WIDGET_TICKET_CREATE_FAILED,
  CSM_AI_WIDGET_TICKET_CREATE_SUCCESS,
} from '@js/constants/events';

import { LOOM_URI } from '@js/constants/routes';

import { AutoCloseTimings } from '@js/common/error-management/error-bar/types';
import { useErrorBar } from '@js/common/error-management/error-bar/useErrorBar';
import { useContactSupportMutation } from '@js/common/help-bubble/contact-support-modal/ContactSupport.generated';
import { ContactSupportRecordButton } from '@js/common/help-bubble/contact-support-modal/contact-support-record-button';
import { useIsAtlassianManagedWorkspace } from '@js/hooks/useIsAtlassianManagedWorkspace';
import { useSearchParams } from '@js/hooks/useSearchParams';
import { useGetSelectedWorkspace } from '@js/hooks/workspace-basic';
import { useContactSupportNonLoggedInUserMutation } from '@js/pages/login/ContactSupportNonLoggedInUser.generated';
import React, { useEffect, useState } from 'react';

import * as analytics from '@js/utilities/analytics';

import * as logger from '@js/utilities/loggerx';

import { incrementMetric } from '@js/utilities/metrics';

import {
  Arrange,
  Button,
  Checkbox,
  Container,
  FormField,
  Select,
  Spacer,
  Text,
  Textarea,
  TextInput,
} from '@loomhq/lens';
import { validateUtils } from '@loomhq/shared-utilities';
import {
  CATEGORY_ISSUES_MAP,
  CATEGORY_OPTIONS,
  PLATFORM_OPTIONS_ATLASSIAN_MANAGED,
  TICKET_CATEGORIES,
  USER_LOCALE,
} from '@loomhq/shared-utilities/constants/helpBubble';
import { Feature } from '@loomhq/shared-utilities/constants/product';

import { useCsmJourneyId } from '../../csm-journey-id';
import { SuccessMessage, SuccessMessageProps } from './success-message';

import type { CSMWidgetEmbedSDK } from '@atlassian/customer-service-management-widget-sdk-react';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '../../../../../utilities/analytics/attribute-transformer';

const { LOOM_SHARE_PAGE_REGEX_STR, EMAIL_REGEX_CHECK } = validateUtils;

// Helper functions
const isSupportCategoryValid = (category: string) =>
  Object.values(TICKET_CATEGORIES).includes(category);
const isNonEmptyString = (value: string | null) =>
  value !== null && value.trim() !== '';

// Helper constants
const errorMessage = 'Unable to submit support ticket. Please try again.';
const supportRequestCategoryName = 'support_request_category'; // Sent from request pages on support.loom.com: Support request category search param name
const loomRegex = new RegExp(LOOM_SHARE_PAGE_REGEX_STR);

type CSMWidgetConversation = Awaited<
  ReturnType<CSMWidgetEmbedSDK['getConversation']>
>;

interface FormProps extends SuccessMessageProps {
  category?: string;
  ticketIssue?: string | null;
  isNonLoggedInUser?: boolean;
  conversation: CSMWidgetConversation | null;
  /**
   * Callback to run when the form is successfully submitted
   */
  onSuccess: () => void;
}

export const Form = ({
  category: ticketCategory = '',
  ticketIssue = null,
  isNonLoggedInUser = false,
  conversation = null,
  onSuccess,
  onSuccessClose,
  onSuccessReturnToChat,
}: FormProps): React.ReactNode => {
  const csmJourneyId = useCsmJourneyId();
  const { showErrorBar } = useErrorBar();
  const [isValid, setIsValid] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [isValidEmail, setIsValidEmail] = useState<boolean | null>(null);
  // TODO CHECK ISSUE PROP?
  const [category, setCategory] = useState(ticketCategory);
  const [issue, setIssue] = useState(ticketIssue);
  const [subject, setSubject] = useState<string>('');
  const [platform, setPlatform] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  const [videoUrl, setVideoUrl] = useState('');
  const [permissionToImpersonate, setPermissionToImpersonate] = useState(false);
  const [userLocale, setUserLocale] = useState<string>('');
  const searchParams = useSearchParams();
  const isValidLink = loomRegex.test(videoUrl) || videoUrl.length === 0;
  const [successfulTicketCreation, setSuccessfulTicketCreation] =
    useState(false);

  const isAtlassianManagedWorkspace = useIsAtlassianManagedWorkspace();
  const workspace = useGetSelectedWorkspace();
  const workspacePlan = workspace?.type;
  const [supportPlatform, setSupportPlatform] = useState(
    isAtlassianManagedWorkspace ? 'atlassian' : 'zendesk'
  );

  // Modal helper functions
  const showSubmissionError = () => {
    showErrorBar({
      autoCloseTimer: AutoCloseTimings.FIVE_SECONDS,
      message: errorMessage,
      severity: ErrorSeverities.ERROR,
    });
  };

  const showSubmissionSuccess = () => {
    setIsValid(false);
    setSuccessfulTicketCreation(true);
  };

  const redirectAfter = searchParams.get('redirect_after');

  const redirectAfterUrl = redirectAfter
    ? new URL(`https://${LOOM_URI}${redirectAfter}`)
    : null;

  // Get Support Request Category Search Param on URL with redirect_after param
  const redirectAfterUrlSupportRequestCategorySearchParam = redirectAfterUrl
    ? redirectAfterUrl.searchParams.get(supportRequestCategoryName)
    : null;

  // Validate support category on URL with redirect_after param
  const isRedirectAfterUrlSupportRequestCategorySearchParamValid =
    redirectAfterUrlSupportRequestCategorySearchParam
      ? isSupportCategoryValid(
          redirectAfterUrlSupportRequestCategorySearchParam
        )
      : false;

  // Get Support Request Category Search Param on URL without redirect_after param
  const supportRequestCategorySearchParam = !redirectAfter
    ? searchParams.get(supportRequestCategoryName)
    : null;

  // Validate support category for Loom videos page
  const isSupportRequestCategorySearchParamValid =
    supportRequestCategorySearchParam
      ? isSupportCategoryValid(supportRequestCategorySearchParam)
      : false;

  const getChatTranscript = () => {
    if (conversation) {
      let transcriptString =
        '**Transcript of CSM conversation:** ' +
        conversation.conversationId +
        '\n\n';
      transcriptString += conversation.messages
        .map(chatMessage => {
          const author = getAuthorString(chatMessage.role);

          return `**${author}:**\n\n` + `${chatMessage.content}`;
        })
        .join('\n\n');

      return transcriptString;
    }
    return null;
  };

  function getAuthorString(role: string) {
    if (role === 'HUMAN') {
      return 'Customer';
    } else if (role === 'ASSISTANT') {
      return 'AI Agent';
    }
    // Should never get here, but lets have a fallback in case
    return role;
  }

  useEffect(() => {
    // Validate and set support category on URL with redirect_after param
    if (
      isRedirectAfterUrlSupportRequestCategorySearchParamValid &&
      redirectAfterUrlSupportRequestCategorySearchParam
    ) {
      setCategory(redirectAfterUrlSupportRequestCategorySearchParam);
    }

    // Validate and set support category on URL without redirect_after param
    if (
      isSupportRequestCategorySearchParamValid &&
      supportRequestCategorySearchParam
    ) {
      setCategory(supportRequestCategorySearchParam);
    }
  }, [
    isRedirectAfterUrlSupportRequestCategorySearchParamValid,
    isSupportRequestCategorySearchParamValid,
    redirectAfterUrlSupportRequestCategorySearchParam,
    supportRequestCategorySearchParam,
  ]);

  useEffect(() => {
    if (category === TICKET_CATEGORIES.TECHNICAL) {
      setIsValid(
        Boolean(
          isNonEmptyString(category) &&
            issue &&
            isNonEmptyString(platform) &&
            isNonEmptyString(message) &&
            isValidLink &&
            isNonEmptyString(userLocale)
        )
      );
    } else if (
      category === TICKET_CATEGORIES.FEATURE_REQUEST ||
      category === TICKET_CATEGORIES.OTHER
    ) {
      setIsValid(
        Boolean(
          isNonEmptyString(category) &&
            isNonEmptyString(subject) &&
            isNonEmptyString(message) &&
            isValidLink &&
            isNonEmptyString(userLocale)
        )
      );
    } else {
      setIsValid(
        Boolean(
          isNonEmptyString(category) &&
            issue &&
            isNonEmptyString(message) &&
            isValidLink &&
            isNonEmptyString(userLocale)
        )
      );
    }
  }, [
    category,
    issue,
    subject,
    platform,
    message,
    isValidLink,
    setIsValid,
    userLocale,
  ]);

  const [contactSupport, { loading: contactSupportLoading }] =
    useContactSupportMutation({
      onCompleted: data => {
        if (
          data?.createSupportTicket?.__typename === 'CreateSupportTicketPayload'
        ) {
          const { success } = data?.createSupportTicket;

          if (success) {
            analytics.track(CSM_AI_WIDGET_TICKET_CREATE_SUCCESS, {
              ...withIdentifiers(
                CSM_AI_WIDGET_TICKET_CREATE_SUCCESS,
                AnalyticsEntityId.conversation(
                  conversation ? conversation.conversationId : null,
                  'conversationId'
                ),
                AnalyticsEntityId.csmJourneyId(csmJourneyId, 'csmJourneyId')
              ),
              category,
              platform,
              isNonLoggedInUser,
              csmExperimentCohort: 'variant',
              workspacePlan,
            });

            logger.info('CSM Widget: Ticket create success', {
              feature: Feature.HelpBubble,
              csmJourneyId,
              conversationId: conversation ? conversation.conversationId : null,
            });

            incrementMetric('csm.widget.embed.ticket.create', {
              status: 'success',
              loggedIn: !isNonLoggedInUser,
            });

            showSubmissionSuccess();
            onSuccess();
          } else {
            incrementMetric('csm.widget.embed.ticket.create', {
              status: 'failure',
              loggedIn: !isNonLoggedInUser,
            });
            showSubmissionError();
          }
        } else if (data?.createSupportTicket?.__typename === 'GenericError') {
          showSubmissionError();
        }
      },
      onError: () => {
        analytics.track(CSM_AI_WIDGET_TICKET_CREATE_FAILED, {
          ...withIdentifiers(
            CSM_AI_WIDGET_TICKET_CREATE_FAILED,
            AnalyticsEntityId.csmJourneyId(csmJourneyId, 'csmJourneyId')
          ),
          isNonLoggedInUser,
          workspacePlan,
        });

        logger.info('CSM Widget: Ticket create failed', {
          feature: Feature.HelpBubble,
          csmJourneyId,
          conversationId: conversation ? conversation.conversationId : null,
        });

        incrementMetric('csm.widget.embed.ticket.create', {
          status: 'failed',
        });
        showSubmissionError();
      },
    });

  const [
    contactSupportNonLoggedInUser,
    { loading: contactSupportNonLoggedInLoading },
  ] = useContactSupportNonLoggedInUserMutation({
    onCompleted: data => {
      if (
        data?.createSupportTicketNonLoggedInUser?.__typename ===
        'CreateSupportTicketNonLoggedInUserPayload'
      ) {
        const { success } = data?.createSupportTicketNonLoggedInUser;

        if (success) {
          analytics.track(CSM_AI_WIDGET_TICKET_CREATE_SUCCESS, {
            ...withIdentifiers(
              CSM_AI_WIDGET_TICKET_CREATE_SUCCESS,
              AnalyticsEntityId.conversation(
                conversation ? conversation.conversationId : null,
                'conversationId'
              ),
              AnalyticsEntityId.csmJourneyId(csmJourneyId, 'csmJourneyId')
            ),
            category,
            platform,
            isNonLoggedInUser,
            workspacePlan,
          });

          showSubmissionSuccess();
          onSuccess();
        } else {
          analytics.track(CSM_AI_WIDGET_TICKET_CREATE_FAILED, {
            ...withIdentifiers(
              CSM_AI_WIDGET_TICKET_CREATE_FAILED,
              AnalyticsEntityId.csmJourneyId(csmJourneyId, 'csmJourneyId')
            ),
            isNonLoggedInUser,
            workspacePlan,
          });
          showSubmissionError();
        }
      }
    },
    onError: () => {
      showSubmissionError();
    },
  });

  if (successfulTicketCreation) {
    return (
      <SuccessMessage
        onSuccessClose={onSuccessClose}
        onSuccessReturnToChat={onSuccessReturnToChat}
      />
    );
  }

  return (
    <Arrange rows={['auto', 'auto', 'auto']} gap={3}>
      <Container>
        <Text>
          Need to contact someone from the team? Tell us a little more about
          your situation and we’ll get in touch as soon as possible.
          <Spacer top={1} />
          <Arrange gap="xsmall">
            <Text>Required fields are marked with an asterisk</Text>
            <Text color="red">*</Text>
          </Arrange>
        </Text>
      </Container>
      <Arrange gap={3} autoFlow="row">
        {isNonLoggedInUser && (
          <FormField labelFor="email">
            <Arrange gap="xsmall">
              <Text fontWeight="bold">Please enter your email</Text>
              <Text color="red">*</Text>
            </Arrange>
            <Spacer top={1} />
            <TextInput
              id="email"
              placeholder="Provide your email address"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
                if (isValidEmail !== null) {
                  setIsValidEmail(EMAIL_REGEX_CHECK.test(e.target.value));
                }
              }}
              onBlur={() => {
                setIsValidEmail(email ? EMAIL_REGEX_CHECK.test(email) : false);
              }}
            />
            <Spacer top={0.5} />
            {isValidEmail !== null && !isValidEmail && (
              <Text color="red">Please provide a valid email</Text>
            )}
          </FormField>
        )}

        <FormField
          labelFor="categoryFormField"
          label={
            <Arrange gap="xsmall" id="categoryQuestion">
              <Text fontWeight="bold">How can we help today?</Text>
              <Text color="red">*</Text>
              <span className="srOnly">required</span>
            </Arrange>
          }
        >
          <Spacer top={1} />
          <Select
            id="categoryFormField"
            aria-labelledby="categoryQuestion categoryFormField"
            placeholder="Select option"
            selectedOptionValue={category}
            options={CATEGORY_OPTIONS[supportPlatform]}
            onChange={({ value }) => {
              setCategory(value);
              setIssue(null);
              setSubject('');

              const useGsacForSupportTicketCreation =
                value === TICKET_CATEGORIES.BILLING;

              if (useGsacForSupportTicketCreation) {
                setSupportPlatform('atlassian');
              }

              if (value !== TICKET_CATEGORIES.TECHNICAL) {
                setPlatform(null);
              }
            }}
          />
        </FormField>

        {category && (
          <FormField
            labelFor="issueFormField"
            label={
              <Arrange gap="xsmall" id="issueQuestion">
                <Text fontWeight="bold">What is your specific issue?</Text>
                <Text color="red">*</Text>
                <span className="srOnly">required</span>
              </Arrange>
            }
          >
            <Spacer top={1} />
            {category === TICKET_CATEGORIES.FEATURE_REQUEST ||
            category === TICKET_CATEGORIES.OTHER ? (
              <TextInput
                id="issueFormField"
                aria-labelledby="issueFormField"
                placeholder="Enter a short description"
                onChange={e => {
                  setSubject(e.target.value);
                }}
              />
            ) : (
              <Select
                aria-labelledby="issueFormField issueQuestion"
                key={category}
                id="issueFormField"
                placeholder="Select option"
                selectedOptionValue={issue}
                options={
                  CATEGORY_ISSUES_MAP[category][
                    isNonLoggedInUser && category === TICKET_CATEGORIES.ACCOUNT
                      ? 'nonLoggedInUser'
                      : supportPlatform
                  ]
                }
                onChange={({ title, value }) => {
                  setIssue(value);
                  setSubject(title as string);
                }}
              />
            )}
          </FormField>
        )}

        {category && category === TICKET_CATEGORIES.TECHNICAL && (
          <FormField
            labelFor="platformFormField"
            label={
              <Arrange gap="xsmall" id="platformQuestion">
                <Text fontWeight="bold">What platform are you using?</Text>
                <Text color="red">*</Text>
                <span className="srOnly">required</span>
              </Arrange>
            }
          >
            <Spacer top={1} />
            <Select
              id="platformFormField"
              aria-labelledby="platformFormField platformQuestion"
              placeholder="Select option"
              selectedOptionValue={platform}
              options={PLATFORM_OPTIONS_ATLASSIAN_MANAGED}
              onChange={({ value }) => {
                setPlatform(value);
              }}
            />
          </FormField>
        )}

        <FormField
          labelFor="issueMessageInput"
          label={
            <Arrange gap="xsmall" id="message">
              <Text fontWeight="bold">Tell us about the issue</Text>
              <Text color="red">*</Text>
            </Arrange>
          }
        >
          <Spacer top={1} />
          <Textarea
            id="issueMessageInput"
            aria-labelledby="message"
            placeholder="e.g., I get an error when I try to upload a new recording."
            onChange={e => {
              setMessage(e.target.value);
            }}
            required
          />
        </FormField>

        <FormField
          labelFor="videoUrl"
          label={
            <div>
              <Text fontWeight="bold">Describe it with a Loom</Text>
              <Arrange gap="xsmall">
                <Text color="bodyDimmed">
                  Include a video showing us the issue, it helps us a lot
                </Text>
                {/* eslint-disable-next-line jsx-a11y/aria-role */}
                <span role="emoji" aria-label="smiley face">
                  😄
                </span>
              </Arrange>
            </div>
          }
        >
          <Spacer top={1} />
          <Arrange gap={1} alignItems="stretch" columns={['1fr', 'auto']}>
            <TextInput
              id="videoUrl"
              placeholder="Insert video link"
              value={videoUrl}
              onChange={e => {
                const newVal = e.target.value;

                if (newVal !== videoUrl) {
                  setVideoUrl(e.target.value);
                }
              }}
            />

            <ContactSupportRecordButton
              onInsert={url => {
                setVideoUrl(url);
              }}
            />
          </Arrange>
          <Spacer top={0.5} />
          {!isValidLink && <Text color="red">Please include a valid link</Text>}
        </FormField>

        <FormField
          labelFor="isUserInEurope"
          label={
            <Arrange gap="xsmall" id="isUserInEurope">
              <Text fontWeight="bold">
                Are you located in Europe, or submitting on behalf of a European
                resident?
              </Text>
              <Text color="red">*</Text>
              <span className="srOnly">required</span>
            </Arrange>
          }
        >
          <Spacer top={1} />
          <Select
            aria-labelledby="isUserInEurope"
            placeholder="Select option"
            selectedOptionValue={userLocale}
            options={USER_LOCALE}
            onChange={({ value }) => {
              setUserLocale(value);
            }}
          />
        </FormField>

        <Container
          backgroundColor="backgroundSecondary"
          radius="medium"
          padding="medium"
        >
          <FormField direction="row">
            <Arrange gap="medium" alignItems="start">
              <Checkbox
                aria-labelledby="permissionToImpersonate"
                id="permissionToImpersonate"
                isChecked={permissionToImpersonate}
                onChange={() => {
                  setPermissionToImpersonate(!permissionToImpersonate);
                }}
              />

              <Text size="body-sm" id="permissionToImpersonate">
                I give permission for the Loom Support Team to temporarily
                access my account (which may include viewing my videos) for
                troubleshooting purposes if necessary.
              </Text>
            </Arrange>
          </FormField>
        </Container>
      </Arrange>
      <Arrange justifyContent="end">
        <Button
          variant="primary"
          isDisabled={
            !isValid ||
            contactSupportLoading ||
            contactSupportNonLoggedInLoading ||
            (isNonLoggedInUser && !isValidEmail)
          }
          hasLoader={contactSupportLoading}
          onClick={() => {
            const userTimezoneOffset = Math.floor(
              (new Date().getTimezoneOffset() / 60) * -1
            );
            isNonLoggedInUser
              ? contactSupportNonLoggedInUser({
                  variables: {
                    subject,
                    category,
                    issue,
                    platform,
                    message,
                    videoUrl,
                    permissionToImpersonate,
                    userLocale,
                    userTimezoneOffset,
                    email,
                  },
                })
              : contactSupport({
                  variables: {
                    subject,
                    category,
                    issue,
                    platform,
                    message,
                    videoUrl,
                    permissionToImpersonate,
                    userLocale,
                    userTimezoneOffset,
                    chatHistory: getChatTranscript(),
                    conversationId: conversation
                      ? conversation.conversationId
                      : null,
                  },
                });
          }}
        >
          Send message
        </Button>
      </Arrange>
    </Arrange>
  );
};
