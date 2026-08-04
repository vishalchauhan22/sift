import { LO_OAUTH as LO_OAUTH_MESSAGE } from '@js/constants/messages';
import { LOOM_BARE_URI } from '@js/constants/routes';

import { jsonParseOrDefault } from '@js/utilities/json/safe-json-parse';

import { SLACK_BACKLINKS_USER_CONNECT_PROVIDER } from '@loomhq/shared-utilities/constants/slack';

type ReturnType = (connectUrl: string) => void;

export const useOpenSlackConnectPopup = ({
  onAuthComplete,
}: {
  onAuthComplete: () => void;
}): ReturnType => {
  return connectUrl => {
    const newPopup = window.open(connectUrl, '', 'width=600,height=800');

    const messageCheck = event => {
      const origin = event.origin || '';
      let data;

      if (typeof event.data === 'string') {
        const defaultData = {
          type: 'default-oauth-type',
        };

        const value = jsonParseOrDefault(event.data, defaultData);
        data = value;

        if (
          origin.indexOf(LOOM_BARE_URI) < 0 ||
          data.type !== LO_OAUTH_MESSAGE
        ) {
          return;
        }

        window.removeEventListener('message', messageCheck);

        if (data?.provider === SLACK_BACKLINKS_USER_CONNECT_PROVIDER) {
          newPopup?.close();
          onAuthComplete();
        }
      }
    };

    window.addEventListener('message', messageCheck);
  };
};
