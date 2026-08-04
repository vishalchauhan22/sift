import { type SeasonContent, Variant } from '../types';
import {
  TitleSlot,
  CenteredSubtitleSlot,
} from '@js/common/seasonal-launch-modal/get-content/modalSlots';
import { ImageAsset } from '@js/common/seasonal-launch-modal/get-content/ImageAsset';
import { Feature } from '@js/common/seasonal-launch-modal/feature';
import { PlanUpgradeCta } from '@js/common/seasonal-launch-modal/featureCta';
import React from 'react';

import { Button } from '@loomhq/lens';

import { SvgNotes } from '@loomhq/lens/icons/notes';
import { SvgActionItem } from '@loomhq/lens/icons/actionItem';
import { SvgVersionControl } from '@loomhq/lens/icons/version-control';
import { SvgComment } from '@loomhq/lens/icons/comment';

export const summer25Content: SeasonContent = {
  [Variant.SUMMER_LAUNCH_25_STARTER_FREE]: {
    modal: {
      maxWidth: 110,
    },
    titleSlot: <TitleSlot>Let Loom take your meeting notes</TitleSlot>,
    belowSubtitleSlot: (
      <CenteredSubtitleSlot>
        See how Loom AI can keep work moving even when you&apos;re out of
        office.
      </CenteredSubtitleSlot>
    ),
    featuresSlot: [
      {
        feature: props => (
          <Feature
            {...props}
            featureId="summer-launch-25-catch-up-quickly"
            title="Catch up quickly"
            description="With AI-powered notes and email recaps, scan the summary and dive in if needed."
            icon={<SvgNotes />}
          />
        ),
        asset: (
          <ImageAsset
            src="https://cdn.loom.com/assets/img/seasonal-launch/summer-25-catch-up-quickly.jpg"
            alt="Catch up quickly"
          />
        ),
      },
      {
        feature: props => (
          <Feature
            {...props}
            featureId="summer-launch-25-see-what-you-missed"
            title="See what you missed while you were away"
            description="All your meeting context — attendees, shared links, chat history — in one place."
            icon={<SvgVersionControl />}
          />
        ),
        asset: (
          <ImageAsset
            src="https://cdn.loom.com/assets/img/seasonal-launch/summer-25-see-what-you-missed.jpg"
            alt="See what you missed while you were away"
          />
        ),
      },
      {
        feature: props => (
          <Feature
            {...props}
            featureId="summer-launch-25-to-do-list"
            title="Return with a clear, prioritized to-do list"
            description="Easily keep track of next steps with auto assigned action items."
            icon={<SvgActionItem />}
          />
        ),
        asset: (
          <ImageAsset
            src="https://cdn.loom.com/assets/img/seasonal-launch/summer-25-prioritized-todo-list.jpg"
            alt="Return with a clear, prioritized to-do list"
          />
        ),
      },
    ],
    upgradeCtaSlot: props => (
      <PlanUpgradeCta {...props}>Upgrade</PlanUpgradeCta>
    ),
    featureTourCtaSlot: props => (
      <Button {...props} type="button" variant="neutral" size="large" />
    ),
  },
  [Variant.SUMMER_LAUNCH_25_BUSINESS]: {
    modal: {
      maxWidth: 110,
    },
    titleSlot: <TitleSlot>Let Loom take your meeting notes</TitleSlot>,
    belowSubtitleSlot: (
      <CenteredSubtitleSlot>
        Keep work moving even when you&apos;re out of office with Loom AI for
        free on your next 5 videos or meetings.
      </CenteredSubtitleSlot>
    ),
    featuresSlot: [
      {
        feature: props => (
          <Feature
            {...props}
            featureId="summer-launch-25-catch-up-quickly"
            title="Catch up quickly"
            description="With AI-powered notes and email recaps, scan the summary and dive in if needed."
            icon={<SvgNotes />}
          />
        ),
        asset: (
          <ImageAsset
            src="https://cdn.loom.com/assets/img/seasonal-launch/summer-25-catch-up-quickly.jpg"
            alt="Catch up quickly"
          />
        ),
      },
      {
        feature: props => (
          <Feature
            {...props}
            featureId="summer-launch-25-see-what-you-missed"
            title="See what you missed while you were away"
            description="All your meeting context — attendees, shared links, chat history — in one place."
            icon={<SvgVersionControl />}
          />
        ),
        asset: (
          <ImageAsset
            src="https://cdn.loom.com/assets/img/seasonal-launch/summer-25-see-what-you-missed.jpg"
            alt="See what you missed while you were away"
          />
        ),
      },
      {
        feature: props => (
          <Feature
            {...props}
            featureId="summer-launch-25-to-do-list"
            title="Return with a clear, prioritized to-do list"
            description="Easily keep track of next steps with auto assigned action items."
            icon={<SvgActionItem />}
          />
        ),
        asset: (
          <ImageAsset
            src="https://cdn.loom.com/assets/img/seasonal-launch/summer-25-prioritized-todo-list.jpg"
            alt="Return with a clear, prioritized to-do list"
          />
        ),
      },
    ],
    upgradeCtaSlot: props => (
      <PlanUpgradeCta {...props}>Upgrade</PlanUpgradeCta>
    ),
    featureTourCtaSlot: props => (
      <Button {...props} type="button" variant="neutral" size="large" />
    ),
  },
  [Variant.SUMMER_LAUNCH_25_BUSINESS_AI_ENTERPRISE]: {
    modal: {
      maxWidth: 110,
    },
    titleSlot: <TitleSlot>Let Loom take your meeting notes</TitleSlot>,
    belowSubtitleSlot: (
      <CenteredSubtitleSlot>
        See how Loom AI can keep work moving even when you&apos;re out of
        office.
      </CenteredSubtitleSlot>
    ),
    featuresSlot: [
      {
        feature: props => (
          <Feature
            {...props}
            featureId="summer-launch-25-catch-up-quickly"
            title="Catch up quickly"
            description="With AI-powered notes and email recaps, scan the summary and dive in if needed."
            icon={<SvgNotes />}
          />
        ),
        asset: (
          <ImageAsset
            src="https://cdn.loom.com/assets/img/seasonal-launch/summer-25-catch-up-quickly.jpg"
            alt="Catch up quickly"
          />
        ),
      },
      {
        feature: props => (
          <Feature
            {...props}
            featureId="summer-launch-25-see-what-you-missed"
            title="See what you missed while you were away"
            description="All your meeting context — attendees, shared links, chat history — in one place."
            icon={<SvgVersionControl />}
          />
        ),
        asset: (
          <ImageAsset
            src="https://cdn.loom.com/assets/img/seasonal-launch/summer-25-see-what-you-missed.jpg"
            alt="See what you missed while you were away"
          />
        ),
      },
      {
        feature: props => (
          <Feature
            {...props}
            featureId="summer-launch-25-to-do-list"
            title="Return with a clear, prioritized to-do list"
            description="Easily keep track of next steps with auto assigned action items."
            icon={<SvgActionItem />}
          />
        ),
        asset: (
          <ImageAsset
            src="https://cdn.loom.com/assets/img/seasonal-launch/summer-25-prioritized-todo-list.jpg"
            alt="Return with a clear, prioritized to-do list"
          />
        ),
      },
    ],
    featureTourCtaSlot: props => (
      <Button {...props} type="button" variant="primary" size="large" />
    ),
  },
  [Variant.SUMMER_LAUNCH_25_BUSINESS_ATLASSIAN]: {
    modal: {
      maxWidth: 110,
    },
    titleSlot: <TitleSlot>Let Loom take your meeting notes</TitleSlot>,
    belowSubtitleSlot: (
      <CenteredSubtitleSlot>
        Loom AI is free on your next 5 videos so you can see how Loom pairs with
        Confluence and Jira to keep work moving even when you&apos;re OOO.
      </CenteredSubtitleSlot>
    ),
    featuresSlot: [
      {
        feature: props => (
          <Feature
            {...props}
            featureId="summer-launch-25-catch-up-quickly"
            title="Catch up quickly"
            description="Meeting notes are sent to Confluence so you can scan the summary and dive in if needed."
            icon={<SvgNotes />}
          />
        ),
        asset: (
          <ImageAsset
            src="https://cdn.loom.com/assets/img/seasonal-launch/summer-25-catch-up-quickly-atlassian.jpg"
            alt="Catch up quickly"
          />
        ),
      },
      {
        feature: props => (
          <Feature
            {...props}
            featureId="summer-launch-25-chat-with-rovo"
            title="Chat with Rovo to get up to speed"
            description="No need to ask your boss what you missed — just ask Rovo."
            icon={<SvgComment />}
          />
        ),
        asset: (
          <ImageAsset
            src="https://cdn.loom.com/assets/img/seasonal-launch/summer-25-chat-with-rovo.jpg"
            alt="Chat with Rovo to get up to speed"
          />
        ),
      },
      {
        feature: props => (
          <Feature
            {...props}
            featureId="summer-launch-25-to-do-list"
            title="Return with a clear, prioritized to-do list"
            description="Easily turn action items with auto @mentions into trackable work in Jira."
            icon={<SvgActionItem />}
          />
        ),
        asset: (
          <ImageAsset
            src="https://cdn.loom.com/assets/img/seasonal-launch/summer-25-prioritized-todo-list.jpg"
            alt="Return with a clear, prioritized to-do list"
          />
        ),
      },
    ],
    upgradeCtaSlot: props => (
      <PlanUpgradeCta {...props}>Upgrade</PlanUpgradeCta>
    ),
    featureTourCtaSlot: props => (
      <Button {...props} type="button" variant="neutral" size="large" />
    ),
  },
  [Variant.SUMMER_LAUNCH_25_BUSINESS_AI_ENTERPRISE_ATLASSIAN]: {
    modal: {
      maxWidth: 110,
    },
    titleSlot: <TitleSlot>Let Loom take your meeting notes</TitleSlot>,
    belowSubtitleSlot: (
      <CenteredSubtitleSlot>
        Loom&apos;s AI-powered notetaker pairs perfectly with Confluence and
        Jira to keep work moving even when you&apos;re out of office.
      </CenteredSubtitleSlot>
    ),
    featuresSlot: [
      {
        feature: props => (
          <Feature
            {...props}
            featureId="summer-launch-25-catch-up-quickly"
            title="Catch up quickly"
            description="Meeting notes are sent to Confluence so you can scan the summary and dive in if needed."
            icon={<SvgNotes />}
          />
        ),
        asset: (
          <ImageAsset
            src="https://cdn.loom.com/assets/img/seasonal-launch/summer-25-catch-up-quickly-atlassian.jpg"
            alt="Catch up quickly"
          />
        ),
      },
      {
        feature: props => (
          <Feature
            {...props}
            featureId="summer-launch-25-chat-with-rovo"
            title="Chat with Rovo to get up to speed"
            description="No need to ask your boss what you missed — just ask Rovo."
            icon={<SvgComment />}
          />
        ),
        asset: (
          <ImageAsset
            src="https://cdn.loom.com/assets/img/seasonal-launch/summer-25-chat-with-rovo.jpg"
            alt="Chat with Rovo to get up to speed"
          />
        ),
      },
      {
        feature: props => (
          <Feature
            {...props}
            featureId="summer-launch-25-to-do-list"
            title="Return with a clear, prioritized to-do list"
            description="Easily turn action items with auto @mentions into trackable work in Jira."
            icon={<SvgActionItem />}
          />
        ),
        asset: (
          <ImageAsset
            src="https://cdn.loom.com/assets/img/seasonal-launch/summer-25-prioritized-todo-list.jpg"
            alt="Return with a clear, prioritized to-do list"
          />
        ),
      },
    ],
    featureTourCtaSlot: props => (
      <Button {...props} type="button" variant="primary" size="large" />
    ),
  },
};
