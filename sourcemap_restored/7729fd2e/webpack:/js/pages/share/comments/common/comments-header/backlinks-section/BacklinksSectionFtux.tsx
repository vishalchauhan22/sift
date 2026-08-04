import React from 'react';
import FtuxWrapper from '@js/components/ftux/ftux-wrapper';
import { FTUX_LAAG_OPTIONS, FTUXTooltip } from '@js/components/ftux-tooltip';
import { UserPropertyEnum } from '@loomhq/shared-utilities/constants/userProperties';
import { useLayer } from 'react-laag';
import { useMount } from '@js/hooks/useMount';
import styles from './styles.module.css';

type Props = {
  setIsFtuxOpen: (isFtuxOpen: boolean) => void;
  handleDismissFtux: () => void;
};

const FtuxContent = ({ setIsFtuxOpen, handleDismissFtux }: Props) => {
  useMount(() => {
    setIsFtuxOpen(true);
  });

  return (
    <FTUXTooltip
      title="Mentions in Slack"
      subtitle="No more missing context — post a Loom video to a public channel, and find a link to it here."
      dismissTooltip={handleDismissFtux}
      source={UserPropertyEnum.SLACK_BACKLINKS_FTUX}
      hasNewPill
      ctaProps={{
        text: 'Got it',
        handleClick: handleDismissFtux,
      }}
    />
  );
};

export const BacklinksSectionFtux = ({
  setIsFtuxOpen,
  handleDismissFtux,
}: Props): JSX.Element => {
  const { layerProps, triggerProps, renderLayer } = useLayer({
    ...FTUX_LAAG_OPTIONS,
    placement: 'bottom-end',
    overflowContainer: true,
    triggerOffset: 10,
    auto: false,
  });

  return (
    <>
      <div {...triggerProps} />
      {renderLayer(
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events, @atlassian/a11y/interactive-element-not-keyboard-focusable
        <div
          onClick={e => e.stopPropagation()}
          {...layerProps}
          className={styles.ftuxWrapper}
        >
          <FtuxWrapper name={UserPropertyEnum.SLACK_BACKLINKS_FTUX}>
            <FtuxContent
              setIsFtuxOpen={setIsFtuxOpen}
              handleDismissFtux={handleDismissFtux}
            />
          </FtuxWrapper>
        </div>
      )}
    </>
  );
};
