import { getSdkInstance } from '@js/pages/share/common/sdk/use-cases/recordReply';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import * as loggerx from '@js/utilities/loggerx';

import { Button } from '@loomhq/lens';
import { SvgVideoCam } from '@loomhq/lens/icons/video-cam';

import { SDKResult } from '@loomhq/record-sdk';
import { Feature } from '@loomhq/shared-utilities/constants/product';

import { ContactSupportRecordButtonProps } from './types';

export function ContactSupportRecordButton({
  onInsert,
}: ContactSupportRecordButtonProps): JSX.Element {
  const [loom, setLoom] = useState<SDKResult | null>(null);
  const ref = useRef(null);

  useEffect(() => {
    async function fetchLoom() {
      const instance = await getSdkInstance().waitOnInstance();

      if (!loom) {
        setLoom(instance);
      }
    }

    fetchLoom();
  }, [loom]);

  useLayoutEffect(() => {
    if (ref?.current && loom) {
      loom.configureButton({
        element: ref.current,
        hooks: {
          onInsertClicked: oembed => {
            onInsert(oembed.sharedUrl);
          },

          onRecordingComplete: () => {
            loggerx.info('Contact Support Form: Recording complete', {
              feature: Feature.SDKRecorder,
            });
          },
          onUploadComplete: () => {
            loggerx.info('Contact Support Form: Upload complete', {
              feature: Feature.VideoUpload,
            });
          },
        },
      });
    }
  }, [loom, onInsert]);

  return (
    // TODO(lens): Allow passing a ref to IconButton so that we don't have nested interactive elements here
    // eslint-disable-next-line  jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, @atlassian/a11y/interactive-element-not-keyboard-focusable
    <div ref={ref} onClick={() => {}}>
      <Button variant="primary" icon={<SvgVideoCam />}>
        Record a Loom
      </Button>
    </div>
  );
}
