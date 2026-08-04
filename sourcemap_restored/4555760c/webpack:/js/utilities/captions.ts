import { format, addMilliseconds, parse } from 'date-fns';
import fetch from '@js/utilities/fetch';

import { Feature } from '@loomhq/shared-utilities/constants/product';

import * as logger from './loggerx';

export const convertAndDownloadSrtCaptions = async (
  url: string,
  downloadName: string
): Promise<void> => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const textData = await response.text();

    const srtBlob = new Blob([convertVttToSrt(textData)], {
      type: 'text/plain',
    });

    const downloadLink = document.createElement('a');

    downloadLink.href = URL.createObjectURL(srtBlob);
    downloadLink.download = downloadName;
    downloadLink.click();
  } catch (error) {
    logger.error(
      'There was a problem downloading captions',
      { error },
      { feature: Feature.TranscriptExtraction }
    );
    throw error;
  }
};

export const convertVttToSrt = (vtt: string): string => {
  const lines = vtt.split('\n');
  const stringBuilder: string[] = [];
  let previousEndTime = '';

  for (const line of lines) {
    if (line.includes('-->')) {
      const splitLine = line.split('-->');

      if (splitLine[0] && splitLine[1]) {
        const currentStartTime = splitLine[0].trim();
        const currentEndTime = splitLine[1].trim();

        if (previousEndTime === currentStartTime) {
          const newStartTime = format(
            addMilliseconds(
              parse(currentStartTime, 'HH:mm:ss.SSS', new Date()),
              1
            ),
            'HH:mm:ss,SSS'
          );

          stringBuilder.push(
            newStartTime + ' --> ' + currentEndTime.replace(/\./g, ',')
          );
        } else {
          stringBuilder.push(line.replace(/\./g, ','));
        }

        previousEndTime = currentEndTime;
      }
    } else {
      stringBuilder.push(line.replace(/<v 0>|<\/v>/g, ''));
    }
  }

  return stringBuilder.slice(2).join('\n');
};

export type ScrubberThumbnailTimeMapping = {
  startTime: number;
  endTime: number;
  text: string;
  x: number;
  y: number;
  h: number;
  w: number;
};

export const parseVtt = (
  vttDataString: string
): ScrubberThumbnailTimeMapping[] => {
  const processedList: ScrubberThumbnailTimeMapping[] = [];
  const frames = vttDataString.split(/\r\n\r\n|\n\n|\r\r/);

  frames.forEach(frame => {
    const result = {} as ScrubberThumbnailTimeMapping;
    const lines = frame.split(/\r\n|\n|\r/);

    lines.forEach(line => {
      if (line.trim() === 'WEBVTT' || !line.trim()) {
        return;
      }

      if (!Number.isFinite(result.startTime)) {
        const matchTimes = line.match(
          /(?<startHours>[0-9]{2})?:?(?<startMinutes>[0-9]{2}):(?<startSeconds>[0-9]{2}).(?<startMilliseconds>[0-9]{2,3})( ?--> ?)(?<endHours>[0-9]{2})?:?(?<endMinutes>[0-9]{2}):(?<endSeconds>[0-9]{2}).(?<endMilliseconds>[0-9]{2,3})/
        );

        if (matchTimes) {
          result.startTime =
            Number(matchTimes?.groups?.startHours || 0) * 60 * 60 +
            Number(matchTimes?.groups?.startMinutes) * 60 +
            Number(matchTimes?.groups?.startSeconds) +
            Number(`0.${matchTimes?.groups?.startMilliseconds}`);
          result.endTime =
            Number(matchTimes?.groups?.endHours || 0) * 60 * 60 +
            Number(matchTimes?.groups?.endMinutes) * 60 +
            Number(matchTimes?.groups?.endSeconds) +
            Number(`0.${matchTimes?.groups?.endMilliseconds}`);
        }

        return;
      }

      if (!result.text) {
        const lineSplit = line.trim().split('#xywh=');

        [result.text] = lineSplit;

        // If there's content in lineSplit[1], then we have sprites. If not, then it's just one frame per image
        if (lineSplit[1]) {
          [result.x, result.y, result.w, result.h] = lineSplit[1]
            .split(',')
            .map(n => Number(n));
        }
      }
    });

    if (result.text) {
      processedList.push(result);
    }
  });

  return processedList;
};
