/* eslint-disable sort-keys */
import camelCase from 'lodash/camelCase';

import {
  KeysToCamelCase,
  LoggedInUser,
  LoggedInUserResponse,
  NonNullArray,
} from './types';

const nullOrDate = (dateString: string | null): Date | null =>
  dateString === null ? null : new Date(dateString);

const nonNullArray = <T extends Array<unknown> | null>(
  inputArray: T
): NonNullArray<T> => {
  if (inputArray === null) {
    return [] as NonNullArray<T>;
  }

  return inputArray.filter(x => x !== null) as NonNullArray<T>;
};

const keysToCamelCase = <T extends Record<string, unknown>>(
  obj: T
): KeysToCamelCase<T> => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      return [camelCase(key), value];
    })
  ) as KeysToCamelCase<T>;
};

export const normalizeCurrentUser = (
  user: LoggedInUserResponse
): LoggedInUser => {
  const {
    id,
    aaDateMastered,
    aaDateLinked,
    createdAt,
    aaIsMastered,
    deletionPending,
    hasActivatedMobile,
    hasActivatedChromeExtension,
    hasActivatedDesktopApp,
    hasWebPushSubcription,
    identityMigrationEligibleDate,
    isEducationVerified,
    isFirstRecording,
    isSdkSharedUser,
    passwordIsSet,
    availableFtux,
    avatars,
    memberships,
    oauths,
    scopes,
    triggers,
    defaultWorkspaceId,
    ...unmodifiedProps
  } = keysToCamelCase<LoggedInUserResponse>(user);

  return {
    ...unmodifiedProps,

    id: Number(id),

    // Dates
    aaDateMastered: nullOrDate(aaDateMastered),
    aaDateLinked: nullOrDate(aaDateLinked),
    createdAt: new Date(createdAt),
    identityMigrationEligibleDate: nullOrDate(identityMigrationEligibleDate),

    // Booleans
    aaIsMastered: Boolean(aaIsMastered),
    deletionPending: Boolean(deletionPending),
    hasActivatedMobile: Boolean(hasActivatedMobile),
    hasActivatedChromeExtension: Boolean(hasActivatedChromeExtension),
    hasActivatedDesktopApp: Boolean(hasActivatedDesktopApp),
    hasWebPushSubscription: Boolean(hasWebPushSubcription),
    isEducationVerified: Boolean(isEducationVerified),
    isFirstRecording: Boolean(isFirstRecording),
    isSdkSharedUser: Boolean(isSdkSharedUser),
    passwordIsSet: Boolean(passwordIsSet),

    // Arrays
    availableFtux: nonNullArray(availableFtux),
    avatars: nonNullArray(avatars),
    memberships: nonNullArray(memberships),
    oauths: nonNullArray(oauths),
    scopes: nonNullArray(scopes),
    triggers: nonNullArray(triggers),

    // Foreign keys
    defaultWorkspaceId,

    _typename: undefined, // Delete this because it 1) camel case removed leading _ and 2) it is not relevant after transform
    __typename: 'CurrentUser',
  };
};
