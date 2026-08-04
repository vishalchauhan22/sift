import * as Types from '../../../../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TaskStatusSubscriptionVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
}>;


export type TaskStatusSubscription = { __typename: 'Subscription', taskStatus: { __typename: 'TaskStatusPayload', id: string, status: string, audioVariables: Array<{ __typename: 'AudioVariable', id: string, taskId: string | null, startTsInOriginalForSentence: number | null, endTsInOriginalForSentence: number | null }> } | null };

export type AudioVariableFromTaskFragment = { __typename: 'AudioVariable', id: string, taskId: string | null, startTsInOriginalForSentence: number | null, endTsInOriginalForSentence: number | null };

export type TaskStatusFragment = { __typename: 'TaskStatusPayload', id: string, status: string };

export const AudioVariableFromTaskFragmentDoc = gql`
    fragment AudioVariableFromTask on AudioVariable {
  __typename
  id
  taskId
  startTsInOriginalForSentence
  endTsInOriginalForSentence
}
    `;
export const TaskStatusFragmentDoc = gql`
    fragment TaskStatus on TaskStatusPayload {
  __typename
  id
  status
}
    `;
export const TaskStatusDocument = gql`
    subscription TaskStatus($videoId: ID!) {
  taskStatus(videoId: $videoId) {
    ...TaskStatus
    audioVariables {
      ...AudioVariableFromTask
    }
  }
}
    ${TaskStatusFragmentDoc}
${AudioVariableFromTaskFragmentDoc}`;

/**
 * __useTaskStatusSubscription__
 *
 * To run a query within a React component, call `useTaskStatusSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTaskStatusSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaskStatusSubscription({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useTaskStatusSubscription(baseOptions: Apollo.SubscriptionHookOptions<TaskStatusSubscription, TaskStatusSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<TaskStatusSubscription, TaskStatusSubscriptionVariables>(TaskStatusDocument, options);
      }
export type TaskStatusSubscriptionHookResult = ReturnType<typeof useTaskStatusSubscription>;
export type TaskStatusSubscriptionResult = Apollo.SubscriptionResult<TaskStatusSubscription>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;