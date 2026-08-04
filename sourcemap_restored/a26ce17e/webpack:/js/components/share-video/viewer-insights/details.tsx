import classNames from 'classnames';
import _debounce from 'lodash/debounce';
import React, { useEffect, useRef } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

import { Distribute, IconButton, Text, Arrange, Container } from '@loomhq/lens';
import { SvgArrowBack } from '@loomhq/lens/icons/arrow-back';
import { SvgChevronLeft } from '@loomhq/lens/icons/chevron-left';

import { EventsList, ViewerAvatar, ViewerName, ViewsList } from './components';
import styles from './styles.module.less';

const DetailsSummary = ({
  title,
  amount,
  backgroundColor = 'backgroundSecondary',
  className,
  inActivitySidebar = false,
}: {
  title: string;
  amount: string;
  backgroundColor?: string;
  className?: string;
  inActivitySidebar?: boolean;
}): JSX.Element => (
  <>
    {inActivitySidebar ? (
      <Container
        className={className}
        backgroundColor={backgroundColor}
        padding="medium"
        radius="large"
      >
        <Arrange autoFlow="row">
          <Text fontWeight="bold" color="grey8">
            {title}
          </Text>
          <Text size="heading-md" fontWeight="bold" color="grey8">
            {amount}
          </Text>
        </Arrange>
      </Container>
    ) : (
      <div
        className={`flex py:small px:medium items:center ${className} radius:medium`}
        style={{ backgroundColor }}
      >
        <div className="grow:1">
          <Text>{title}</Text>
        </div>
        <Text fontWeight="bold" size="heading-sm">
          {amount}
        </Text>
      </div>
    )}
  </>
);

const Details = ({
  viewer,
  onBack,
  skipAnimation,
  inActivitySidebar,
}: {
  viewer: any;
  onBack: () => void;
  skipAnimation: boolean;
  inActivitySidebar: boolean;
}): JSX.Element => {
  const ref = useRef<HTMLElement | null>(null);
  const {
    user = {},
    views = [],
    percentCompleted = 0,
    ctaClicks,
    events = [],
  } = viewer;

  // scroll the parent on mount and on resize
  // to slide to this element
  // scrollIntoView will also scroll vertically
  // ending up hidden by the header :/
  useEffect(() => {
    const el = ref?.current;
    const shrinkParent = () =>
      el?.parentElement?.classList.add(styles.shrinked);

    document?.documentElement?.scrollTo?.({ top: 0 });
    el?.parentElement?.scrollTo?.({
      left: el.offsetWidth,
      behavior: skipAnimation ? 'auto' : 'smooth',
    });

    if (skipAnimation) {
      shrinkParent();
    } else {
      // shrink after scrolling animation to avoid jank
      setTimeout(shrinkParent, 250);
    }

    const update = (el: ResizeObserverEntry) => {
      el?.target?.parentElement?.scrollTo({
        left: el?.contentRect?.width,
        behavior: 'smooth',
      });
    };

    const ro = new ResizeObserver(
      _debounce(update, 100) as unknown as ResizeObserverCallback
    );

    ro.observe(el as Element);

    return () => ro.disconnect();
  }, [skipAnimation]);

  return (
    <section className={styles.slideable} ref={ref}>
      <Distribute
        htmlTag="header"
        alignment="center"
        isSpread
        className={styles.detailsHeader}
      >
        <Distribute alignment="center" gap="small">
          {inActivitySidebar ? (
            <>
              <IconButton
                altText="Back"
                icon={<SvgChevronLeft />}
                onClick={onBack}
              />

              <a href={`/profile/${user?.profileUrl}`}>
                <Text fontWeight="bold" size="body-lg">
                  {user.name}
                </Text>
              </a>
            </>
          ) : (
            <>
              <IconButton
                altText="Back"
                icon={<SvgArrowBack />}
                onClick={onBack}
              />

              <a href={`/profile/${user?.profileUrl}`}>
                <ViewerAvatar avatar={user.avatar} name={user.name} />
              </a>
              <ViewerName name={user.name} />
            </>
          )}
        </Distribute>
      </Distribute>
      <div>
        <div className="mb:large">
          <DetailsSummary
            title="Video views"
            amount={views.length}
            backgroundColor="blurpleMedium"
            inActivitySidebar={inActivitySidebar}
          />

          <DetailsSummary
            className={inActivitySidebar ? 'mt:medium' : 'mt:small'}
            title="Completion rate"
            amount={percentCompleted != null ? `${percentCompleted}%` : '--'}
            backgroundColor="blueLight"
            inActivitySidebar={inActivitySidebar}
          />

          {Boolean(ctaClicks) && (
            <DetailsSummary
              className={classNames(
                inActivitySidebar ? 'mt:medium' : 'mt:small',
                'test-call-to-action-clicks'
              )}
              title="Call-to-Action Clicks"
              amount={ctaClicks}
              backgroundColor="yellowLight"
              inActivitySidebar={inActivitySidebar}
            />
          )}
        </div>

        <div className="p:medium bgc:backgroundSecondary mb:large radius:medium">
          <div className="mb:medium">
            <Text fontWeight="bold">View Times</Text>
          </div>
          <ViewsList views={views} />
        </div>
      </div>

      <EventsList events={events} />
    </section>
  );
};

// eslint-disable-next-line import/no-default-export
export default Details;
