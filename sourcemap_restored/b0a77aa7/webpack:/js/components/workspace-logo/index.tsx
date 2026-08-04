import { CLOUDFRONT_URI } from '@js/constants/routes';

import { Workspace } from '@js/pages/share/join-team-banner/types';
import React from 'react';

import { Avatar } from '@loomhq/lens';

interface Props {
  workspace?: Workspace | null;
  size?: string | number;
  letter?: string;
  filePreview?: string;
}

const WorkspaceLogo = ({
  workspace,
  filePreview = undefined,
  size = 4,
  letter = '',
}: Props): JSX.Element | null => {
  // the workspace that is passed in may be the selected workspace which isn't available
  // when the parent component initially loads so we need to return here just in case.
  const shouldShow = workspace?.id || filePreview || letter;

  if (!shouldShow) {
    return null;
  }

  if (filePreview) {
    return <Avatar size={size} imageSrc={filePreview} />;
  }

  if (workspace?.workspaceLogoPath) {
    const logo = `${CLOUDFRONT_URI}/${workspace.workspaceLogoPath}`;

    return <Avatar size={size} imageSrc={logo} />;
  }

  const avatarLetter = letter || workspace?.name?.charAt(0)?.toUpperCase();

  return <Avatar size={size} letter={avatarLetter} />;
};

// eslint-disable-next-line import/no-default-export
export default WorkspaceLogo;
