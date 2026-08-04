import * as Types from '../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetBusinessTrialWelcomeCardPropsQueryVariables = Types.Exact<{
  notificationId: Types.Scalars['ID']['input'];
}>;


export type GetBusinessTrialWelcomeCardPropsQuery = { __typename: 'Query', getBusinessTrialWelcomeCardProps: { __typename: 'BusinessTrialWelcomeCardProps', notification: { __typename: 'BusinessTrialWelcomeNotification', workspace: { __typename: 'NotificationWorkspace', id: string | null, name: string | null, icon: string | null } | null } | null } | { __typename: 'GenericError' } | { __typename: 'InputValidationError' } | { __typename: 'UserNotAuthorizedError' } | null };


export const GetBusinessTrialWelcomeCardPropsDocument = gql`
    query getBusinessTrialWelcomeCardProps($notificationId: ID!) {
  getBusinessTrialWelcomeCardProps(notificationId: $notificationId) {
    __typename
    ... on BusinessTrialWelcomeCardProps {
      notification {
        workspace {
          id
          name
          icon
        }
      }
    }
  }
}
    `;

/**
 * __useGetBusinessTrialWelcomeCardPropsQuery__
 *
 * To run a query within a React component, call `useGetBusinessTrialWelcomeCardPropsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBusinessTrialWelcomeCardPropsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBusinessTrialWelcomeCardPropsQuery({
 *   variables: {
 *      notificationId: // value for 'notificationId'
 *   },
 * });
 */
export function useGetBusinessTrialWelcomeCardPropsQuery(baseOptions: Apollo.QueryHookOptions<GetBusinessTrialWelcomeCardPropsQuery, GetBusinessTrialWelcomeCardPropsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBusinessTrialWelcomeCardPropsQuery, GetBusinessTrialWelcomeCardPropsQueryVariables>(GetBusinessTrialWelcomeCardPropsDocument, options);
      }
export function useGetBusinessTrialWelcomeCardPropsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBusinessTrialWelcomeCardPropsQuery, GetBusinessTrialWelcomeCardPropsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBusinessTrialWelcomeCardPropsQuery, GetBusinessTrialWelcomeCardPropsQueryVariables>(GetBusinessTrialWelcomeCardPropsDocument, options);
        }
export type GetBusinessTrialWelcomeCardPropsQueryHookResult = ReturnType<typeof useGetBusinessTrialWelcomeCardPropsQuery>;
export type GetBusinessTrialWelcomeCardPropsLazyQueryHookResult = ReturnType<typeof useGetBusinessTrialWelcomeCardPropsLazyQuery>;
export type GetBusinessTrialWelcomeCardPropsQueryResult = Apollo.QueryResult<GetBusinessTrialWelcomeCardPropsQuery, GetBusinessTrialWelcomeCardPropsQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;