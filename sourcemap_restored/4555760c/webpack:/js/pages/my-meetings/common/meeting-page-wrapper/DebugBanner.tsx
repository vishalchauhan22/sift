import React, { useEffect, useState } from 'react';
import fetch from '@js/utilities/fetch';

import { Container, Text } from '@loomhq/lens';

export const DebugBanner = (): JSX.Element => {
  interface DevInfo {
    booted_at?: string;
    tunnel_url?: string;
    error?: string;
  }

  const [devInfo, setDevInfo] = useState<DevInfo>({
    booted_at: 'loading',
    tunnel_url: 'loading',
  });

  useEffect(() => {
    fetch('https://loomlocal.com:3001/healthcheck/dev')
      .then(resp =>
        resp
          .json()
          .then(info => {
            setDevInfo(info);
          })
          .catch(err => {
            setDevInfo({ error: err.message });
          })
      )
      .catch(err => {
        setDevInfo({ error: err.message });
      });
  }, [setDevInfo]);

  return !devInfo.booted_at || !devInfo.tunnel_url ? (
    <Container
      padding="large"
      borderSide="all"
      radius="large"
      backgroundColor="warning"
      borderColor="backgroundSecondary"
      marginBottom="xlarge"
    >
      {!devInfo.booted_at && (
        <Text>
          The rewatch calendar service does not appear to be available. Try
          restarting <pre>jig</pre> and reloading the page. If that does not
          work, check the logs of your rewatch container for the issue.
        </Text>
      )}
      {devInfo.booted_at && !devInfo.tunnel_url && (
        <Text>
          The atlas tunnel required to receive calendar events does not appear
          to be available. Try running{' '}
          <pre>atlas tunnel start --port 3000 --public</pre> and reloading the
          page.
        </Text>
      )}
    </Container>
  ) : (
    <></>
  );
};
