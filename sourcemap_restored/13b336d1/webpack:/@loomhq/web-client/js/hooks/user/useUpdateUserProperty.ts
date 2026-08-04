import { QueryHookOptions, ApolloError } from '@apollo/client';

import {
  userProperties,
  UserPropertyValueType as UserPropertyValueTypeBase,
} from '@loomhq/shared-utilities/constants/userProperties';

import GetUserProperty from './GetUserProperty.graphql';
import { useUpdateUserPropertyMutation } from './UpdateUserProperty.generated';

type UserPropertyValueType = UserPropertyValueTypeBase<
  keyof typeof userProperties
>;

interface UpdateUserPropertyReturnType {
  updateUserProperty: (propertyValue: UserPropertyValueType) => void;
  loading: boolean;
  error: ApolloError | boolean | undefined;
}

export const useUpdateUserProperty = (
  propertyName: string,
  options: QueryHookOptions = {}
): UpdateUserPropertyReturnType => {
  const { onCompleted, onError } = options;
  const [updateUserProperty, { loading, error }] =
    useUpdateUserPropertyMutation({
      onCompleted: data => onCompleted && onCompleted(data),
      onError: err => onError && onError(err),
      update: (cache, updatedData) => {
        cache.writeQuery({
          query: GetUserProperty,
          variables: { name: propertyName },
          data: {
            result:
              updatedData?.data?.result?.__typename === 'UpdatedPersonProperty'
                ? updatedData?.data?.result?.property
                : null,
          },
        });
      },
    });

  const boundUpdate = propertyValue => {
    updateUserProperty({
      variables: {
        name: propertyName,
        value: propertyValue,
      },
    });
  };

  return {
    updateUserProperty: boundUpdate,
    loading,
    error,
  };
};
