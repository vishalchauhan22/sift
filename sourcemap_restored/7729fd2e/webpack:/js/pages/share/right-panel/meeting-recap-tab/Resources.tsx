import { useVideoPasswordContext } from '@js/common/video-password/useVideoPasswordContext';
import { useVideoContext } from '@js/common/video-player';

import React from 'react';

import { Split, Container, Pill, Logo } from '@loomhq/lens';
import { SvgBitbucket } from '@loomhq/lens/icons/bitbucket';
import { SvgConfluence } from '@loomhq/lens/icons/confluence';
import { SvgExternalLink } from '@loomhq/lens/icons/external-link';
import { SvgFigma } from '@loomhq/lens/icons/figma';
import { SvgGithub } from '@loomhq/lens/icons/github';
import { SvgGoogleDocs } from '@loomhq/lens/icons/google_docs';
import { SvgGoogleSheets } from '@loomhq/lens/icons/google_sheets';
import { SvgGoogleSlides } from '@loomhq/lens/icons/google_slides';
import { SvgJira } from '@loomhq/lens/icons/jira';
import { SvgMicrosoftExcel } from '@loomhq/lens/icons/microsoft_excel';
import { SvgMicrosoftOneNote } from '@loomhq/lens/icons/microsoft_one_note';
import { SvgMicrosoftPowerpoint } from '@loomhq/lens/icons/microsoft_powerpoint';
import { SvgMicrosoftWord } from '@loomhq/lens/icons/microsoft_word';

import { ServiceEnum } from '@loomhq/shared-utilities/constants/services';

import { useGetVideoAttachmentsQuery } from './GetVideoAttachments.generated';

const SERVICE_LOGO_BY_NAME = {
  [ServiceEnum.Loom]: (
    <div style={{ height: '16px' }}>
      <Logo variant="symbol" maxWidth={'16px'} style={{ height: '16px' }} />
    </div>
  ),
  [ServiceEnum.Jira]: <SvgJira />,
  [ServiceEnum.Confluence]: <SvgConfluence />,
  [ServiceEnum.BitBucket]: <SvgBitbucket />,
  [ServiceEnum.GoogleDoc]: <SvgGoogleDocs />,
  [ServiceEnum.GoogleSheet]: <SvgGoogleSheets />,
  [ServiceEnum.GoogleSlides]: <SvgGoogleSlides />,
  [ServiceEnum.Figma]: <SvgFigma />,
  [ServiceEnum.GithubGist]: <SvgGithub />,
  [ServiceEnum.GithubPr]: <SvgGithub />,
  [ServiceEnum.Word]: <SvgMicrosoftWord />,
  [ServiceEnum.Excel]: <SvgMicrosoftExcel />,
  [ServiceEnum.Powerpoint]: <SvgMicrosoftPowerpoint />,
  [ServiceEnum.Onenote]: <SvgMicrosoftOneNote />,
};

export const Resources = (): JSX.Element => {
  const {
    video: { id: videoId },
  } = useVideoContext();
  const { password } = useVideoPasswordContext();
  const { data } = useGetVideoAttachmentsQuery({
    variables: { videoId, password },
  });

  let attachments: JSX.Element[] = [];
  if (data?.getVideo?.__typename === 'RegularUserVideo') {
    attachments = data.getVideo.attachments.map(({ id, service, url }) => (
      <a key={id} href={url} target="_blank" rel="noreferrer">
        <Pill
          icon={
            service && SERVICE_LOGO_BY_NAME[service.name] ? (
              SERVICE_LOGO_BY_NAME[service.name]
            ) : (
              <SvgExternalLink />
            )
          }
          iconPosition="left"
          style={{
            border: '1px solid var(--lns-color-border)',
          }}
        >
          {service?.humanName || url}
        </Pill>
      </a>
    ));
  }

  if (attachments.length === 0) {
    return <></>;
  }

  return (
    <Container marginBottom="large">
      <Split gap="small">{attachments}</Split>
    </Container>
  );
};
