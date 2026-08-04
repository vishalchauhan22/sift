import React from 'react';

import { Arrange, IconButton, Tooltip, Dropdown } from '@loomhq/lens';
import { SvgEditBorder } from '@loomhq/lens/icons/edit-border';
import { SvgLink } from '@loomhq/lens/icons/link';
import { SvgMoreHoriz } from '@loomhq/lens/icons/more-horiz';
import { SvgTrash } from '@loomhq/lens/icons/trash';

import { useCommentsInSmallWidth } from '@js/pages/share/common/comments/useCreateComment';
import { isAutoComment } from '@js/pages/share/common/helpers';

import { isMobile } from '@js/utilities/device';

interface OnHoverButtonProps {
  show: boolean;
  onClick: () => void;
}

type CommentOnHoverButtonsProps = {
  commentId: string;
  editButton: OnHoverButtonProps;
  deleteButton: OnHoverButtonProps;
  copyButton: { onClick: () => void; isCopied: boolean };
};

export const CommentOnHoverButtons = ({
  commentId,
  editButton,
  deleteButton,
  copyButton,
}: CommentOnHoverButtonsProps): React.ReactElement => {
  const inSmallWidth = useCommentsInSmallWidth();
  const shouldCollapseToDropdown = isMobile || inSmallWidth;

  return (
    <>
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
                    icon: <SvgEditBorder />,
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
            ...(isAutoComment(commentId)
              ? []
              : [
                  {
                    title: 'Copy Link',
                    icon: <SvgLink />,
                    onClick: copyButton.onClick,
                  },
                ]),
          ]}
        />
      ) : (
        <Arrange>
          {editButton.show && (
            <Tooltip content="Edit" placement="topCenter">
              <IconButton
                onClick={editButton.onClick}
                className="hover-btn"
                altText="Edit"
                icon={<SvgEditBorder />}
                iconColor="bodyDimmed"
                size="small"
              />
            </Tooltip>
          )}

          {deleteButton.show && (
            <Tooltip content="Delete" placement="topCenter">
              <IconButton
                onClick={deleteButton.onClick}
                className="hover-btn"
                altText="Delete"
                icon={<SvgTrash />}
                iconColor="bodyDimmed"
                size="small"
              />
            </Tooltip>
          )}

          {!isAutoComment(commentId) && (
            <Tooltip
              content={copyButton.isCopied ? 'Link copied!' : 'Copy link'}
              placement="topCenter"
            >
              <IconButton
                onClick={copyButton.onClick}
                className="hover-btn"
                altText="Copy Link"
                icon={<SvgLink />}
                size="small"
                iconColor="bodyDimmed"
              />
            </Tooltip>
          )}
        </Arrange>
      )}
    </>
  );
};
