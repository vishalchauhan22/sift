import React from 'react';

import { useCurrentTime, debounce } from '..';
import { CommentBucket, CommentPost, useVideoContext } from '../context';
import { useViewportContext } from '../viewportContext';

const PIXELS_PER_BUCKET = 30;
const DEBOUNCE_MS = 300;

// bucket size in seconds per bucket:
// single icon + breathing room is 20px
const secondsPerBucket = (duration: number, playerWidth: number): number => {
  const totalBuckets = playerWidth / PIXELS_PER_BUCKET;

  return duration / totalBuckets;
};

const bucketizeComments = (
  comments: CommentPost[],
  duration: number,
  playerWidth: number
): CommentBucket[] => {
  const bucketSize: number = secondsPerBucket(duration, playerWidth);

  const bucketInd = (commentTime: number): number => {
    return Math.floor(commentTime / bucketSize);
  };

  const buckets = comments.reduce(
    (buckets: Record<number, CommentBucket>, comment) => {
      const bucketId: number = bucketInd(comment.time);

      const middleOfBucket = bucketSize * bucketId + bucketSize / 2;

      // prefill empty bucket when it hasn't been created yet
      if (!(bucketId in buckets)) {
        buckets[bucketId] = {
          time: middleOfBucket,
          topComment: comment,
          commentCount: 0,
          commentIds: [],
          bucketId,
        };
      }

      const bucket: CommentBucket = buckets[bucketId];

      bucket.commentCount++;
      bucket.commentCount += comment.hasMore || 0;

      bucket.commentIds.push(comment.id);

      // Newest comment should go on top
      if (
        comment.createdAt &&
        bucket.topComment.createdAt &&
        comment.createdAt < bucket.topComment.createdAt
      ) {
        bucket.topComment = comment;
      }

      return buckets;
    },
    {}
  );

  return Object.values(buckets);
};

export function useCommentBuckets(): CommentBucket[] {
  const { video, comments } = useVideoContext();
  const { width } = useViewportContext();
  const { duration } = useCurrentTime(video.id);

  const [commentBuckets, setCommentBuckets] = React.useState<CommentBucket[]>(
    []
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedRecalculateBuckets = React.useCallback(
    debounce((comments, duration, pixelWidth) => {
      setCommentBuckets(
        bucketizeComments(
          comments as CommentPost[],
          duration as number,
          pixelWidth as number
        )
      );
    }, DEBOUNCE_MS),
    []
  );

  React.useEffect(() => {
    debouncedRecalculateBuckets(comments, duration, width);
  }, [comments, duration, width, debouncedRecalculateBuckets]);

  return commentBuckets;
}
