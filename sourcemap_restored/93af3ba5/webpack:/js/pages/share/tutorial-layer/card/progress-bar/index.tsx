import classNames from 'classnames';
import React from 'react';

import { Container } from '@loomhq/lens';

import styles from './styles.module.css';

type TutorialProgressBarProps = {
  tutorialComplete?: boolean;
};

export const TutorialProgressBar = ({
  tutorialComplete,
}: TutorialProgressBarProps): React.ReactElement => {
  return (
    <Container
      backgroundColor="grey6"
      height="6px"
      overflow="hidden"
      position="relative"
      radius="full"
      width="212px"
      zIndex={1}
    >
      <div
        className={classNames(
          styles.stepAnimation,
          tutorialComplete && styles.tutorialComplete
        )}
      />
      <svg
        width="212"
        height="6"
        viewBox="0 0 212 6"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M212 0H0V3.00175V6H2.8967C1.28768 5.94555 0 4.62403 0 3.00175C0 1.34489 1.34315 0.00174546 3 0.00174546H29C30.6569 0.00174546 32 1.34489 32 3.00175C32 4.62403 30.7123 5.94555 29.1033 6H38.8967C37.2877 5.94555 36 4.62403 36 3.00175C36 1.34489 37.3431 0.00174546 39 0.00174546H65C66.6569 0.00174546 68 1.34489 68 3.00175C68 4.62403 66.7123 5.94555 65.1033 6H74.8967C73.2877 5.94555 72 4.62403 72 3.00175C72 1.34489 73.3431 0.00174546 75 0.00174546H101C102.657 0.00174546 104 1.34489 104 3.00175C104 4.62403 102.712 5.94555 101.103 6H110.897C109.288 5.94555 108 4.62403 108 3.00175C108 1.34489 109.343 0.00174546 111 0.00174546H137C138.657 0.00174546 140 1.34489 140 3.00175C140 4.62403 138.712 5.94555 137.103 6H146.897C145.288 5.94555 144 4.62403 144 3.00175C144 1.34489 145.343 0.00174546 147 0.00174546H173C174.657 0.00174546 176 1.34489 176 3.00175C176 4.62403 174.712 5.94555 173.103 6H182.897C181.288 5.94555 180 4.62403 180 3.00175C180 1.34489 181.343 0.00174546 183 0.00174546H209C210.657 0.00174546 212 1.34489 212 3.00175C212 4.62403 210.712 5.94555 209.103 6H212V3.00175V0Z"
          fill="#2B1C50"
        />
      </svg>
    </Container>
  );
};
