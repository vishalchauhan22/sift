import { QueryHookOptions, ApolloError } from '@apollo/client';
import { useIsCurrentUserLoggedIn } from '@js/common/current-user';

import {
  UserPropertiesKey,
  UserPropertyValueType as UserPropertyValueTypeBase,
} from '@loomhq/shared-utilities/constants/userProperties';

import { useGetUserPropertyQuery } from './GetUserProperty.generated';

type UserPropertyValueType<Key extends UserPropertiesKey = UserPropertiesKey> =
  UserPropertyValueTypeBase<Key>;

interface UserPropertyReturnType<
  Key extends UserPropertiesKey = UserPropertiesKey,
> {
  loading: boolean;
  error: ApolloError | undefined;
  value: UserPropertyValueType<Key> | null;
}

export const useUserProperty = <Key extends UserPropertiesKey>(
  propertyName: Key,
  options: QueryHookOptions = {}
): UserPropertyReturnType<Key> => {
  const isLoggedIn = useIsCurrentUserLoggedIn();
  const { onError } = options;

  const { loading, error, data } = useGetUserPropertyQuery({
    variables: { name: propertyName },
    onError: err => onError && onError(err),
    skip: !isLoggedIn,
  });

  return {
    loading,
    error,
    value:
      data?.result?.__typename === 'PersonProperty'
        ? (data.result.value as UserPropertyValueType<Key>)
        : null,
  };
};
