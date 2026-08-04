import React from 'react';

import { personalizedVideosUtils } from '@loomhq/shared-utilities';

import styles from './styles.module.css';
const { splitStringToFindVariableIndex } = personalizedVideosUtils;

export const StaticTitleWithVariables = ({
  title,
}: {
  title: string;
}): JSX.Element => {
  const videoTitleSplit = splitStringToFindVariableIndex({
    inputText: title,
    includeBraces: false,
  });
  const videoTitleSplitTextArray = videoTitleSplit.text;
  const variableInVideoTitle = videoTitleSplit.variableIndexes;

  return (
    <div>
      {videoTitleSplitTextArray.map((string, index) => {
        const isVariable = variableInVideoTitle.includes(index);

        return (
          <span
            key={index}
            className={isVariable ? styles.highlighted : undefined}
          >
            {isVariable ? `{${string}}` : string}
          </span>
        );
      })}
    </div>
  );
};
