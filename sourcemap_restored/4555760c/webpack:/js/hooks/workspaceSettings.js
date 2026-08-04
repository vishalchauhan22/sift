/* eslint-disable @loomhq/loom/no-js-extension */
import { ErrorSeverities } from '@js/constants/error-severities';

import { useIsCurrentUserLoggedIn } from '@js/common/current-user';
import { AutoCloseTimings } from '@js/common/error-management/error-bar/types';
import { useErrorBar } from '@js/common/error-management/error-bar/useErrorBar';
import * as logger from '@js/utilities/loggerx';

import { Feature } from '@loomhq/shared-utilities/constants/product';

import {
  useGetWorkspaceSettingQuery,
  GetWorkspaceSettingDocument,
} from './GetWorkspaceSetting.generated';

import { useUpdateWorkspaceSettingMutation } from './UpdateWorkspaceSetting.generated';

function findDefinedValue(values) {
  return values.find(v => v !== undefined);
}

export const useWorkspaceSetting = (settingName, options = {}) => {
  const { showErrorBar } = useErrorBar();
  const isLoggedIn = useIsCurrentUserLoggedIn();
  const { loading, error, data } = useGetWorkspaceSettingQuery({
    ...options,
    variables: { settingName },
    onError: err => {
      const WORKSPACE_SETTING_FAIL =
        "We couldn't grab your workspace setting. Please try again.";

      logger.error(
        err,
        {
          message: WORKSPACE_SETTING_FAIL,
          error: err,
        },
        { feature: Feature.WorkspaceManagement }
      );

      showErrorBar({
        autoCloseTimer: AutoCloseTimings.THREE_SECONDS,
        message: WORKSPACE_SETTING_FAIL,
        severity: ErrorSeverities.ERROR,
      });
    },
    skip: !isLoggedIn,
  });

  const { stringValue, booleanValue, intValue, jsonValue } =
    data?.getWorkspaceSetting?.setting ?? {};

  const value = findDefinedValue([
    stringValue,
    booleanValue,
    intValue,
    jsonValue,
  ]);

  return {
    loading,
    error,
    value,
  };
};

// TODO: update this mutation to return the workspace id and the settings value
// nesting the setting name and value in the setting object is preventing
// Apollo from updating the cache properly and forcing us to update it manually
// ref for TODO2

export const useUpdateWorkspaceSetting = (settingName, hideBanner = false) => {
  const { showErrorBar } = useErrorBar();
  const isLoggedIn = useIsCurrentUserLoggedIn();
  const [updateSetting, { loading, error, called }] =
    useUpdateWorkspaceSettingMutation({
      onCompleted: () => {
        const message = 'Your setting was saved successfully.';

        if (!hideBanner) {
          showErrorBar({
            autoCloseTimer: AutoCloseTimings.THREE_SECONDS,
            message,
            severity: ErrorSeverities.SUCCESS,
          });
        }
      },
      onError: () => {
        const message =
          'There was a problem while saving your setting. Please try again.';

        if (!hideBanner) {
          showErrorBar({
            autoCloseTimer: AutoCloseTimings.THREE_SECONDS,
            message,
            severity: ErrorSeverities.ERROR,
          });
        }
      },

      // TODO2: This should go away once we update the payload of updateSettingMutation
      // For a simple value update, the Apollo cache updates the cache value
      // by default when we return the appropriate payload
      update: (cache, updatedData) => {
        const { getWorkspaceSetting } = cache.readQuery({
          query: GetWorkspaceSettingDocument,
          variables: { settingName },
        });

        const { setting } = getWorkspaceSetting;

        const data = {
          getWorkspaceSetting: {
            ...getWorkspaceSetting,
            setting: {
              ...setting,
            },
          },
        };

        if (setting.__typename === 'JSONObject') {
          data.getWorkspaceSetting.setting.jsonValue = {
            ...setting.value,
            ...updatedData.data.result.setting.value,
          };
        } else if (setting.__typename === 'IntObject') {
          data.getWorkspaceSetting.setting.intValue =
            updatedData.data.result.setting.value;
        } else if (setting.__typename === 'StringObject') {
          data.getWorkspaceSetting.setting.stringValue =
            updatedData.data.result.setting.value;
        } else if (setting.__typename === 'BooleanObject') {
          data.getWorkspaceSetting.setting.booleanValue =
            updatedData.data.result.setting.value;
        }

        cache.writeQuery({
          query: GetWorkspaceSettingDocument,
          variables: { settingName },
          data,
        });
      },
    });

  // HOTFIX: We are getting a high volume of user not logged in values on this mutation
  // Temporary fix to reduce the error noise while we look for a more considered solution
  const boundUpdate = settingValue => {
    if (!isLoggedIn) {
      return;
    }

    updateSetting({
      variables: {
        name: settingName,
        value: settingValue,
      },
    });
  };

  return {
    updateSetting: boundUpdate,
    loading,
    error,
    called,
  };
};
