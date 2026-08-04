import React from 'react';

import { Dropdown, IconButton } from '@loomhq/lens';
import { SvgEdit } from '@loomhq/lens/icons/edit';
import { SvgLink } from '@loomhq/lens/icons/link';
import { SvgMoreHoriz } from '@loomhq/lens/icons/more-horiz';
import { SvgTrash } from '@loomhq/lens/icons/trash';

import { useCommentsInSmallWidth } from '@js/pages/share/common/comments/useCreateComment';

import { isMobile } from '@js/utilities/device';

import { CopyLinkButton } from './CopyLinkButton';
import { DeleteIconButton } from './DeleteIconButton';
import { EditIconButton } from './EditIconButton';
import styles from './TaskOnHoverButtons.module.css';

type TaskOnHoverButtonsProps = {
  isHovering: boolean;
  editButton: {
    show: boolean;
    onClick: () => void;
  };
  deleteButton: {
    show: boolean;
    onClick: () => void;
    isLoading: boolean;
  };
  copyLinkButton: {
    show: boolean;
    isCopied: boolean;
    onClick: () => void;
  };
};

export const TaskOnHoverButtons = ({
  isHovering,
  editButton,
  deleteButton,
  copyLinkButton,
}: TaskOnHoverButtonsProps): JSX.Element => {
  const inSmallWidth = useCommentsInSmallWidth();
  const shouldCollapseToDropdown = isMobile || inSmallWidth;

  return (
    <div className={styles.taskIconsOnHover}>
      {shouldCollapseToDropdown ? (
        <Dropdown
          trigger={
            <IconButton
              altText="dropdown"
              icon={<SvgMoreHoriz />}
              size="small"
              iconColor="bodyDimmed"
            />
          }
          options={[
            ...(editButton.show
              ? [
                  {
                    title: 'Edit',
                    icon: <SvgEdit />,
                    onClick: editButton.onClick,
                  },
                ]
              : []),
            ...(deleteButton.show
              ? [
                  {
                    title: 'Delete',
                    icon: <SvgTrash />,
                    onClick: deleteButton.onClick,
                  },
                ]
              : []),
            ...(copyLinkButton.show
              ? [
                  {
                    title: 'Copy Link',
                    icon: <SvgLink />,
                    onClick: copyLinkButton.onClick,
                  },
                ]
              : []),
          ]}
        />
      ) : isHovering ? (
        <>
          {editButton.show && <EditIconButton onClick={editButton.onClick} />}
          {deleteButton.show && (
            <DeleteIconButton
              onClick={deleteButton.onClick}
              isLoading={deleteButton.isLoading}
            />
          )}
          {copyLinkButton.show && (
            <CopyLinkButton
              isCopied={copyLinkButton.isCopied}
              onClick={copyLinkButton.onClick}
            />
          )}
        </>
      ) : null}
    </div>
  );
};
