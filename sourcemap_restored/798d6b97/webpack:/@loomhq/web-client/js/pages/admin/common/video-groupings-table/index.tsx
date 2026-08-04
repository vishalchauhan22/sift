import _isEmpty from 'lodash/isEmpty';
import _omit from 'lodash/omit';
import React, { Fragment } from 'react';

import {
  Arrange,
  Button,
  Checkbox,
  List,
  ListRow,
  Modal,
  Spacer,
  Text,
  Toast,
  Tooltip,
} from '@loomhq/lens';
import { ADMIN_DELETABLE_GROUPING_TYPES } from '@loomhq/shared-utilities/constants/groupingTypes';
import { useFeatureFlagValue } from '@js/hooks/featureFlag';
import {
  FEATURE_GATES,
  ControlType,
} from '@loomhq/shared-utilities/constants/statsig';

import { useAdminBulkDeleteGroupingsByPrimaryKeyMutation } from './AdminBulkDeleteGroupingsByPrimaryKey.generated';
import { Grouping } from './types';

const HEADERS = [
  { key: 'select', label: 'Select', width: '50px' },
  { key: 'groupingId', label: 'Grouping Id' },
  { key: 'videoId', label: 'Video Id', width: '2fr' },
  { key: 'folder', label: 'Folder' },
  { key: 'spaces', label: 'Spaces' },
  { key: 'groupingType', label: 'Grouping Type' },
  { key: 'createdAt', label: 'CreatedAt' },
  { key: 'updatedAt', label: 'UpdatedAt' },
];

// Columns default to 1fr width unless explicitly set in HEADERS above
const COLUMN_WIDTHS = HEADERS.map(header => header.width || '1fr');

const GroupingsHeader = () => (
  <ListRow paddingX="medium" paddingY="12px">
    {HEADERS.map(header => (
      <Text key={header.key} fontWeight="bold" color="bodyDimmed">
        {header.label}
      </Text>
    ))}
  </ListRow>
);

type VideoGroupingsTableProps = {
  groupings: Grouping[] | null;
};

export const VideoGroupingsTable = ({
  groupings,
}: VideoGroupingsTableProps): JSX.Element | null => {
  const isDaRe = Boolean(
    useFeatureFlagValue<boolean>(
      FEATURE_GATES.LOOM_EDGE_SHARD_ROUTING_GATE,
      ControlType.STATSIG_FEATURE_GATE
    )
  );
  const [modalOpen, setModalOpen] = React.useState(false);
  const [deleteConfirmationMessage, setDeleteConfirmationMessage] =
    React.useState('');
  const [selectedGroupings, setSelectedGroupings] = React.useState<
    Record<string, Grouping>
  >({});

  const [deleteGroupings, { loading: deleteGroupingsLoading }] =
    useAdminBulkDeleteGroupingsByPrimaryKeyMutation({
      onCompleted: data => {
        if (
          data?.adminBulkDeleteGroupingsByPrimaryKey?.__typename ===
            'AdminBulkDeleteGroupingsByPrimaryKeyPayload' &&
          data?.adminBulkDeleteGroupingsByPrimaryKey?.success
        ) {
          setDeleteConfirmationMessage('Groupings successfully deleted!');
        }

        if (
          data?.adminBulkDeleteGroupingsByPrimaryKey?.__typename ===
          'GenericError'
        ) {
          setDeleteConfirmationMessage(
            data?.adminBulkDeleteGroupingsByPrimaryKey?.message
          );
        }
      },
      onError: err => {
        setDeleteConfirmationMessage(err.message);
      },
      refetchQueries: [
        'AdminGetVideoGroupingsByOwner',
        'AdminGetGroupingsByVideoId',
      ],
    });

  if (!groupings) {
    return null;
  }

  return (
    <Arrange gap="small" autoFlow="row">
      <Button
        variant="danger"
        onClick={() => setModalOpen(true)}
        style={{ width: 'fit-content' }}
        isDisabled={_isEmpty(selectedGroupings)}
      >
        Delete
      </Button>
      <List columns={COLUMN_WIDTHS} gap="medium" variant="stripe">
        <GroupingsHeader />
        {groupings.map(grouping => {
          const groupingCanBeDeleted =
            grouping.type !== null &&
            ADMIN_DELETABLE_GROUPING_TYPES.includes(grouping.type);
          const groupingKey = `${grouping.groupingId}_${grouping.video.id}`;

          return (
            <ListRow paddingX="medium" key={groupingKey} paddingY="12px">
              <Tooltip
                content={`Groupings of type ${grouping.type} cannot be deleted`}
                placement="topCenter"
                isDisabled={groupingCanBeDeleted}
              >
                <Checkbox
                  isDisabled={!groupingCanBeDeleted}
                  onChange={e => {
                    if (e.target.checked) {
                      setSelectedGroupings({
                        ...selectedGroupings,
                        [groupingKey]: grouping,
                      });
                    } else {
                      setSelectedGroupings(
                        _omit(selectedGroupings, [groupingKey])
                      );
                    }
                  }}
                />
              </Tooltip>
              <Text>{grouping.groupingId}</Text>
              <Text>
                <pre>{grouping.video.id}</pre>
              </Text>
              <Text>{grouping?.video.folder?.name}</Text>
              <Text>
                {grouping?.video.spaces?.map(space => (
                  <Fragment key={space.id}>
                    {space.name}
                    <br />
                  </Fragment>
                ))}
              </Text>
              <Text>{grouping.type}</Text>
              <Text>{grouping.createdAt}</Text>
              <Text>{grouping.updatedAt}</Text>
            </ListRow>
          );
        })}
        <Modal
          isOpen={modalOpen}
          onCloseClick={() => {
            setModalOpen(false);
          }}
          mainButton={
            <Button
              isDisabled={deleteGroupingsLoading}
              hasLoader={deleteGroupingsLoading}
              variant="record"
              onClick={async () => {
                await deleteGroupings({
                  variables: {
                    groupingPrimaryKeys: Object.values(selectedGroupings).map(
                      grouping => ({
                        groupingId: grouping.groupingId,
                        videoId: grouping.video.id.toString(),
                      })
                    ),
                  },
                  context:
                    isDaRe && Object.values(selectedGroupings).length > 0
                      ? {
                          sharding: {
                            entityType: 'video',
                            entityId:
                              Object.values(
                                selectedGroupings
                              )[0].video.id.toString(),
                          },
                        }
                      : undefined,
                });
                setModalOpen(false);
                setSelectedGroupings({});
              }}
            >
              Confirm
            </Button>
          }
        >
          Are you sure you want to permanently delete the following groupings?
          {Object.values(selectedGroupings).map(grouping => {
            const groupingKey = `${grouping.groupingId}_${grouping.video.id}`;

            return (
              <Spacer top="medium" key={groupingKey}>
                <Arrange gap="xsmall" autoFlow="row">
                  <span>
                    <Text fontWeight="bold" isInline>
                      Grouping Id:
                    </Text>{' '}
                    {grouping.groupingId}
                  </span>
                  <span>
                    <Text fontWeight="bold" isInline>
                      Video Id:
                    </Text>{' '}
                    {grouping.video.id}
                  </span>
                  <span>
                    <Text fontWeight="bold" isInline>
                      Grouping Type:
                    </Text>{' '}
                    {grouping.type}
                  </span>
                </Arrange>
              </Spacer>
            );
          })}
        </Modal>
        <Toast
          isOpen={Boolean(deleteConfirmationMessage)}
          onCloseClick={() => setDeleteConfirmationMessage('')}
        >
          {deleteConfirmationMessage}
        </Toast>
      </List>
    </Arrange>
  );
};
