import React from 'react';

import { Button, Text, Arrange, Container, Icon } from '@loomhq/lens';
import { SvgFolder } from '@loomhq/lens/icons/folder';
import {
  getContentIcon,
  getHomepageId,
} from '@js/common/confluence-location-selection/utilities';

import { useGetMeetingNotesLocationQuery } from './GetMeetingNotesLocation.generated';
import {
  ConfluenceContent,
  ConfluenceContentTypes,
  ConfluenceSpace,
} from '@js/globalTypes.generated';

// either an icon, or a URL pointing at an image, never both.
type IconProps =
  | { logoSrc: string; icon?: never }
  | { icon: React.ReactNode; logoSrc?: never };

const SelectLocationEmptyStateButton = ({
  hasError = false,
  onClick,
}: {
  hasError?: boolean;
  onClick: () => void;
}): JSX.Element => {
  return (
    <Button
      icon={<SvgFolder />}
      style={{
        ...(hasError && { borderColor: `var(--lns-color-danger)` }),
      }}
      onClick={onClick}
    >
      Select a location<span className="c:danger">*</span>
    </Button>
  );
};

const SelectLocationButton = ({
  location,
  onClick,
}: {
  location: ConfluenceContent | null;
  onClick: (location: ConfluenceContent | null) => void;
}): JSX.Element => {
  if (location === null) {
    return <SelectLocationEmptyStateButton onClick={() => onClick(null)} />;
  }

  const spaceLocation: ConfluenceSpace | undefined =
    location.space ?? undefined;
  const spaceLocationHomepageId = getHomepageId(spaceLocation?.homepage);
  const isSpaceLocation =
    spaceLocation !== undefined &&
    spaceLocationHomepageId === String(location.id ?? '');

  let iconProps: IconProps;
  let buttonText: string;

  if (isSpaceLocation) {
    iconProps = { logoSrc: spaceLocation.icon?.url ?? '' };
    buttonText = spaceLocation.name as string; // Confluence Spaces will always have titles
  } else {
    const contentType: ConfluenceContentTypes = location.type
      ? location.type
      : ConfluenceContentTypes.Page;
    iconProps = { icon: getContentIcon(contentType) };
    buttonText = location.title as string; // Confluence Content will always have titles
  }

  return (
    <Button onClick={() => onClick(location)} style={{ maxWidth: '210px' }}>
      <Arrange gap="small" alignItems="center">
        {'logoSrc' in iconProps ? (
          <Icon
            icon={
              <img
                src={iconProps.logoSrc}
                alt=""
                width="24"
                height="24"
                style={{ borderRadius: `var(--lns-radius-50)` }}
              />
            }
            size="24px"
          />
        ) : (
          <Icon icon={iconProps.icon} size="24px" />
        )}
        <Container overflow="hidden" minWidth={0}>
          <Text hasEllipsis fontWeight="bold">
            {buttonText}
          </Text>
        </Container>
      </Arrange>
    </Button>
  );
};

export const MeetingNotesDefaultLocationSelectionModalButton = ({
  onClick,
  onError,
  selectedLocation,
}: {
  onClick: (location: ConfluenceContent | null) => void;
  onError: () => void;
  selectedLocation?: ConfluenceContent | null;
}): JSX.Element => {
  const { data, loading, error } = useGetMeetingNotesLocationQuery({
    skip: selectedLocation !== undefined,
    fetchPolicy: 'network-only',
  });

  if (selectedLocation !== undefined) {
    return (
      <SelectLocationButton location={selectedLocation} onClick={onClick} />
    );
  }

  if (loading) {
    return <Button hasLoader />;
  }

  if (
    data?.aiMeetingNotesLocation?.__typename !==
      'AiMeetingNotesLocationPayload' ||
    Boolean(error)
  ) {
    onError();
    return (
      <SelectLocationEmptyStateButton hasError onClick={() => onClick(null)} />
    );
  }

  if (!data.aiMeetingNotesLocation?.location) {
    return <SelectLocationEmptyStateButton onClick={() => onClick(null)} />;
  }

  const location = data.aiMeetingNotesLocation?.location as ConfluenceContent;
  return <SelectLocationButton location={location} onClick={onClick} />;
};

export const MeetingNotesSpecificLocationSelectionModalButton = ({
  calendarMeetingGuid,
  onClick,
  onError,
}: {
  calendarMeetingGuid: string;
  onClick: (location: ConfluenceContent | null) => void;
  onError: (locationValidationError: boolean) => void;
}): JSX.Element => {
  // need to also check the network when theres a specific location because we want to
  // reload the data used in the meeting setting modal that opens before the location selection modal
  const { data, loading, error } = useGetMeetingNotesLocationQuery({
    variables: {
      calendarMeetingGuid,
    },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return <Button hasLoader isDisabled />;
  }

  if (
    data?.aiMeetingNotesLocation?.__typename !==
      'AiMeetingNotesLocationPayload' ||
    Boolean(error)
  ) {
    let locationValidationError = false;
    if (
      data?.aiMeetingNotesLocation?.__typename === 'AiMeetingNotesLocationError'
    ) {
      locationValidationError =
        data.aiMeetingNotesLocation.locationValidationError;
    }
    onError(locationValidationError);
    return (
      <SelectLocationEmptyStateButton hasError onClick={() => onClick(null)} />
    );
  }

  if (!data.aiMeetingNotesLocation?.location) {
    // If no specific location has been set, we need to show the current default location
    return (
      <MeetingNotesDefaultLocationSelectionModalButton
        onClick={onClick}
        onError={() => onError(false)}
      />
    );
  }

  const location = data.aiMeetingNotesLocation?.location as ConfluenceContent;
  return <SelectLocationButton location={location} onClick={onClick} />;
};
