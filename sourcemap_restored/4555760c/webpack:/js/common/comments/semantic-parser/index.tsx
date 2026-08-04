import React, { useMemo } from 'react';

import {
  mentionsHandler,
  textsHandler,
  lineBreaksHandler,
  trimHandler,
  componentsHandler,
  linksHandler,
} from './handlers';

// /!\ The order matters:

// https://www.loom.com/share/ceb1ffa65a9943b498e0d510e722ddd8

// 1/ mentionsHandler: Replace mention tags by semantic mention objects
// 2/ linksHandler: Replace HTML anchors by URL + replace URLs by semantic URL objects
//    Be careful as the regexp grabs the whole URL until the next space.
// 3/ lineBreaksHandler: Replace \n by semantic lineBreak objects
// 4/ textsHandler: Replace all the strings left into semantic objects
// 5/ trimHandler: Analyze semantic objects to trim the sentence
// 6/ componentsHandler: Convert semantic objects by react components
export const commentSanitizers = [
  mentionsHandler,
  linksHandler,
  lineBreaksHandler,
  textsHandler,
  trimHandler,
];

const SanitizedAndMentionedContent = ({
  comment,
  beforeBlock,
  afterBlock,
  withPills,
  trimLength,
  useNewEmbedPlayer,
  inPlayer,
  forceSemanticParser,
}) => {
  const sanitizedContent = useMemo(() => {
    if (!comment.content) {
      return <></>;
    }

    const options = {
      maxAllowedLength: trimLength ?? Number.POSITIVE_INFINITY,
      inPlayer,
      useNewEmbedPlayer,
      withPills,
      forceSemanticParser,
    };

    const semanticParts = commentSanitizers.reduce(
      (acc, func) => func(acc, options),
      [comment?.content]
    );

    return componentsHandler(semanticParts, options);
  }, [
    trimLength,
    withPills,
    useNewEmbedPlayer,
    inPlayer,
    forceSemanticParser,
    comment?.content,
  ]);

  return (
    <>
      {beforeBlock}
      {sanitizedContent}
      {afterBlock}
    </>
  );
};

const FILTERED_OUT_PROPS = [
  'workspaceTeamMembers',
  'withPills',
  'content',
  'forwardRef',
  'trimLength',
  'beforeBlock',
  'afterBlock',
  'useNewEmbedPlayer',
  'inPlayer',
  'comment',
  'forceSemanticParser',
];

type SemanticParserType = (props: {
  withPills?: boolean;
  comment: { content?: string | null };
  beforeBlock?: JSX.Element;
  afterBlock?: JSX.Element;
  trimLength?: number;
  forwardRef?: React.MutableRefObject<HTMLDivElement>;
  useNewEmbedPlayer?: boolean;
  inPlayer?: boolean;
  forceSemanticParser?: boolean;
}) => JSX.Element;

export const SemanticParser: SemanticParserType = props => {
  const {
    withPills,
    comment,
    beforeBlock,
    afterBlock,
    trimLength,
    forwardRef: embedRef,
    useNewEmbedPlayer,
    inPlayer = false,
    forceSemanticParser = false,
  } = props;

  const filteredProps = Object.keys(props)
    .filter(k => !FILTERED_OUT_PROPS.includes(k))
    .reduce((newProps, key) => ({ ...newProps, [key]: props[key] }), {});

  return (
    <div {...filteredProps} ref={embedRef}>
      <SanitizedAndMentionedContent
        comment={comment}
        beforeBlock={beforeBlock}
        afterBlock={afterBlock}
        withPills={withPills}
        trimLength={trimLength}
        useNewEmbedPlayer={useNewEmbedPlayer}
        inPlayer={inPlayer}
        forceSemanticParser={forceSemanticParser}
      />
    </div>
  );
};
