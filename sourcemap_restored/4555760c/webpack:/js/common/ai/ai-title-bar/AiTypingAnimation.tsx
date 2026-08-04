import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { AiFeatureMarkers } from '@js/utilities/rum/constants';
import { SuccessMarker } from '@js/utilities/rum/markers';

import { TextWrapper } from '../../../pages/share/common/title-bar/common/TextWrapper';

export const AiTypingAnimation = ({
  autoTitle,
  setIsCompleted,
}: {
  autoTitle: string;
  setIsCompleted: (isCompleted: boolean) => void;
}): JSX.Element => {
  return (
    <>
      <SuccessMarker name={AiFeatureMarkers.AutoTitle} />
      <TextWrapper>
        <TypeAnimation
          sequence={[
            autoTitle,
            () => {
              setIsCompleted(true);
            },
          ]}
          wrapper="div"
          cursor={false}
          speed={60}
        />
      </TextWrapper>
    </>
  );
};
