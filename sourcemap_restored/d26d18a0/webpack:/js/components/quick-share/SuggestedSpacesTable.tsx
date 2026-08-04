import React from 'react';

import {
  Arrange,
  Container,
  IconButton,
  List,
  ListRow,
  Text,
} from '@loomhq/lens';
import { SvgCheckCircle } from '@loomhq/lens/icons/check-circle';
import { SvgPlusCircle } from '@loomhq/lens/icons/plus-circle';
import { SpacesAvatarWithName } from '@js/common/spaces';
import { SpaceDataRetentionPill } from '@js/components/spaces-data-retention-pill';
import { SHARE_TYPEAHEAD_SEARCH_CLICKTHROUGH } from '@js/constants/events';
import useIsVisible from '@js/hooks/useIsVisible';
import { useGetSelectedWorkspace } from '@js/hooks/workspace-basic';

import * as analytics from '@js/utilities/analytics';

import { QUICK_SHARE_MODAL_VARIANT } from './popover';

import styles from './styles.module.css';
import { SuggestedSpace } from './useSuggestedSpaces';
import { withIdentifiers } from '../../utilities/analytics/attribute-transformer';
import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';

const SPACE_ADDED_ACTION = 'space_added';
const SPACE_REMOVED_ACTION = 'space_removed';

const AddSuggestedSpaceButton = ({
  space,
  spaceIds,
  clicked,
}: {
  space: SuggestedSpace;
  spaceIds: Set<string>;
  clicked: boolean;
}): JSX.Element => {
  const buttonLabel = 'Button to Add Suggested Space';

  if (clicked) {
    return (
      <Arrange>
        <Text fontWeight="bold" color="primary">
          {spaceIds?.has(space.id) ? 'Shared' : ''}
        </Text>
        <IconButton
          aria-label={buttonLabel}
          altText="Space added"
          icon={<SvgCheckCircle />}
          iconColor="primary"
          size="small"
        ></IconButton>
      </Arrange>
    );
  }

  return (
    <Arrange>
      <IconButton
        aria-label={buttonLabel}
        altText="Add space"
        size="small"
        icon={<SvgPlusCircle />}
      />
    </Arrange>
  );
};

export const SuggestedSpacesTable = ({
  spacesToShow,
  spaceIds,
  selectedSpaceIds,
  setSelectedSpaces,
  inputValue,
  showPrimarySpaceDescription,
}: {
  spacesToShow: SuggestedSpace[];
  spaceIds: Set<string>;
  selectedSpaceIds: Set<string>;
  setSelectedSpaces: (callbackFn) => void;
  inputValue: string;
  showPrimarySpaceDescription: boolean;
}): JSX.Element => {
  const [firstElementRef, isFirstElementVisible] = useIsVisible();
  const workspace = useGetSelectedWorkspace();

  const onClick = (
    e: React.SyntheticEvent<Element, Event>,
    space: SuggestedSpace
  ) => {
    e.stopPropagation();
    e.preventDefault();

    if (selectedSpaceIds.has(space.id)) {
      setSelectedSpaces(oldArray =>
        oldArray.filter(oldSpace => oldSpace.id !== space.id)
      );

      if (inputValue) {
        analytics.track(SHARE_TYPEAHEAD_SEARCH_CLICKTHROUGH, {
          modal_variant: QUICK_SHARE_MODAL_VARIANT,
          is_space: true,
          action: SPACE_REMOVED_ACTION,
          ...withIdentifiers(
            SHARE_TYPEAHEAD_SEARCH_CLICKTHROUGH,
            AnalyticsEntityId.space(space.id, 'string', 'result_id')
          ),
        });
      }
    } else {
      setSelectedSpaces(oldArray => [...oldArray, space]);

      if (inputValue) {
        analytics.track(SHARE_TYPEAHEAD_SEARCH_CLICKTHROUGH, {
          modal_variant: QUICK_SHARE_MODAL_VARIANT,
          is_space: true,
          action: SPACE_ADDED_ACTION,
          ...withIdentifiers(
            SHARE_TYPEAHEAD_SEARCH_CLICKTHROUGH,
            AnalyticsEntityId.space(space.id, 'string', 'result_id')
          ),
        });
      }
    }
  };

  return (
    <Container
      maxHeight="10rem"
      // TODO(LNS-315): Add overflow differentiation for x and y so we don't need this custom style
      className={styles.suggestedSpacesTable}
      paddingX="medium"
      borderSide={!isFirstElementVisible ? 'top' : undefined}
    >
      <List columns={['1fr', '0fr']} gap="small" variant="stripe">
        {spacesToShow.map((space, idx) => (
          <ListRow key={space.id} padding="small">
            <Container onClick={e => onClick(e, space)}>
              <Arrange justifyContent="space-between">
                <Arrange justifyContent="space-between">
                  <Container paddingLeft="small">
                    <div ref={idx === 0 ? firstElementRef : undefined} />
                    <SpacesAvatarWithName space={space} />
                  </Container>
                  <Container paddingLeft="small">
                    <SpaceDataRetentionPill
                      spaceId={String(space.id)}
                      toolTipPlacement="bottomCenter"
                    />
                  </Container>
                </Arrange>
                <Container>
                  <AddSuggestedSpaceButton
                    space={space}
                    spaceIds={spaceIds}
                    clicked={selectedSpaceIds.has(space.id)}
                  />
                </Container>
              </Arrange>
              {showPrimarySpaceDescription && space.is_primary && (
                <Container paddingLeft="40px" paddingRight="15px">
                  <Text fontWeight="book" size="body-sm" color="grey6">
                    {`Make your video discoverable to anyone in
                        ${workspace?.name}`}
                  </Text>
                </Container>
              )}
            </Container>
          </ListRow>
        ))}
      </List>
    </Container>
  );
};
