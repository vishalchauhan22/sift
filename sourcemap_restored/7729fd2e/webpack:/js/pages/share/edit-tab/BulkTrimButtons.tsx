import { useConfirmationToast } from '@js/common/confirmation-toast';
import { useUpdateVideoAfterBulkTrims } from '@js/common/useUpdateVideoAfterBulkTrims';
import { useFeatureFlagValue } from '@js/hooks/featureFlag';
import {
  fireFillerWordToggleEvent,
  fireSilenceToggleEvent,
} from '@js/pages/common/bulk-trim-operations/analytics';
import {
  BulkTrimOperations,
  REMOVE_FILLER_WORDS,
  REMOVE_FILLER_WORDS_PLUS,
  REMOVE_FILLER_WORDS_TTS,
  REMOVE_SILENCES,
  UNDO_REMOVE_FILLER_WORDS,
  UNDO_REMOVE_SILENCES,
  UNDO_REMOVE_FILLER_WORDS_TTS,
} from '@js/pages/common/bulk-trim-operations/constants';
import { RemoveFillerWordsPopover } from '@js/pages/common/bulk-trim-operations/remove-filler-words-popover/RemoveFillerWordsPopover';
import { useHasAccessToRemoveFillerWordsPlus } from '@js/pages/common/bulk-trim-operations/useHasAccessToRemoveFillerWordsPlus';
import pluralize from 'pluralize';
import React, { useCallback, useState } from 'react';

import { useHover, useLayer } from 'react-laag';

import { IconButton, Loader, Popover, Switch, TooltipBox } from '@loomhq/lens';

import { SvgChevronDown } from '@loomhq/lens/icons/chevron-down';
import { SvgFillerWordRemoval } from '@loomhq/lens/icons/filler-word-removal';
import { SvgSilenceRemoval } from '@loomhq/lens/icons/silence-removal';

import {
  FEATURE_GATES,
  ControlType,
} from '@loomhq/shared-utilities/constants/statsig';

import { FillerWordPlusRemovalPopoverFtux } from './common/popovers';
import { EditItem } from './edit-item';

import { useEditTabBulkTrimVideoMutation } from './editTabBulkTrimVideo.generated';
import { useEditTabFillerWordRemovalTtsMutation } from './editTabFillerWordRemovalTTS.generated';
import { useEditTabRemoveFillerWordsPlusMutation } from './editTabRemoveFillerWordsPlus.generated';
import { useEditTabUndoBulkTrimVideoMutation } from './editTabUndoBulkTrimVideo.generated';
import { useEditTabUndoFillerWordRemovalTtsMutation } from './editTabUndoFillerWordRemovalTTS.generated';
import {
  GetEditTabBulkTrimCountsDocument,
  useGetEditTabBulkTrimCountsQuery,
} from './getEditTabBulkTrimCounts.generated';

import { selectBulkTrimCounts } from './selectBulkTrimCounts';

export const BulkTrimButtons = ({
  videoId,
  password,
  lastTrimId,
  isUnavailable,
  disabledTooltipText,
}: {
  videoId: string;
  password: string | null;
  lastTrimId: string | number;
  isUnavailable: boolean;
  disabledTooltipText?: string;
}): JSX.Element => {
  const { setShowConfirmationToast } = useConfirmationToast();
  const updateVideoAfterBulkTrims = useUpdateVideoAfterBulkTrims();

  const [isFillerWordPopoverOpen, setIsFillerWordPopoverOpen] = useState(false);

  const hasFillerWordsPlusAccess = useHasAccessToRemoveFillerWordsPlus({
    videoId,
  });

  const inFillerWordsPlusFlag = useFeatureFlagValue(
    FEATURE_GATES.TESTING_AUTO_SHORTEN_VIDEOS,
    ControlType.STATSIG_FEATURE_GATE
  ) as boolean;

  const isFillerWordRemovalTtsEnabled = useFeatureFlagValue(
    FEATURE_GATES.LOOM_TTS_FILLER_WORD_REMOVAL,
    ControlType.STATSIG_FEATURE_GATE
  );

  // Populate the counts with the initial results from a query
  const { data: bulkTrimCountsData, error: bulkTrimCountsError } =
    useGetEditTabBulkTrimCountsQuery({
      variables: { videoId, password },
    });

  const bulkTrimHasApolloError = Boolean(bulkTrimCountsError);

  const {
    hasTrimmedSilences,
    secondsOfSilenceTrimmed,
    hasAnyTrimmedFillerWords,
    numberOfFillerWordsTrimmed,
    fillerWordAppliedType,
  } = selectBulkTrimCounts(bulkTrimCountsData);

  // 2 separate instances of each mutation so they can independently track loading state
  const [removeSilences, { loading: isRemovingSilences }] =
    useEditTabBulkTrimVideoMutation({
      variables: {
        videoId,
        includeSilences: true,
        includeFillers: false,
        password,
        lastTrimId,
        forceSave: false,
      },
      refetchQueries: [GetEditTabBulkTrimCountsDocument],
      awaitRefetchQueries: true,
      onCompleted: data => {
        if (
          data?.bulkTrimClips?.__typename !== 'BulkTrimClipsPayload' ||
          !data.bulkTrimClips.video
        ) {
          setShowConfirmationToast(
            'Failed to remove silences. Please try again.'
          );
          return;
        }

        fireSilenceToggleEvent({
          videoId,
          enabled: true,
          source: 'share-page',
          secondsRemoved:
            data.bulkTrimClips?.removalCounts?.secondsOfSilence ?? 0,
        });

        updateVideoAfterBulkTrims(data.bulkTrimClips.video);
      },
      onError: () => {
        setShowConfirmationToast(
          'Failed to remove silences. Please try again.'
        );
      },
    });

  const [removeFillerWords, { loading: isRemovingFillerWords }] =
    useEditTabBulkTrimVideoMutation({
      variables: {
        videoId,
        includeSilences: false,
        includeFillers: true,
        password,
        lastTrimId,
        forceSave: false,
      },
      refetchQueries: [GetEditTabBulkTrimCountsDocument],
      awaitRefetchQueries: true,
      onCompleted: data => {
        if (
          data?.bulkTrimClips?.__typename !== 'BulkTrimClipsPayload' ||
          !data.bulkTrimClips.video
        ) {
          setShowConfirmationToast(
            'Failed to remove filler words. Please try again.'
          );
          return;
        }

        fireFillerWordToggleEvent({
          videoId,
          enabled: true,
          source: 'share-page',
          type: 'regular',
          inFillerWordsPlusFlag,
          wordsRemoved: data.bulkTrimClips?.removalCounts?.fillerWords ?? 0,
        });

        updateVideoAfterBulkTrims(data.bulkTrimClips.video);
      },
      onError: () => {
        setShowConfirmationToast(
          'Failed to remove filler words. Please try again.'
        );
      },
    });

  // Handle TTS based filler word removal. Currently an experimental feature
  const [removeFillerWordsTts, { loading: isRemovingFillerWordsTts }] =
    useEditTabFillerWordRemovalTtsMutation({
      variables: {
        videoId,
        password,
      },
      refetchQueries: [GetEditTabBulkTrimCountsDocument],
      awaitRefetchQueries: true,
      onCompleted: data => {
        if (
          data?.applyFillerWordRemovalTTS?.__typename !==
            'ApplyFillerWordRemovalTTSPayload' ||
          !data.applyFillerWordRemovalTTS.video
        ) {
          setShowConfirmationToast(
            'Failed to remove filler words. Please try again.'
          );
          return;
        }

        updateVideoAfterBulkTrims(data.applyFillerWordRemovalTTS.video);
      },
      onError: () => {
        setShowConfirmationToast(
          'Failed to remove filler words. Please try again.'
        );
      },
    });

  // Handle TTS based filler word removal. Currently an experimental feature
  const [undoRemoveFillerWordsTts, { loading: isUndoingRemoveFillerWordsTts }] =
    useEditTabUndoFillerWordRemovalTtsMutation({
      variables: {
        videoId,
        password,
      },
      refetchQueries: [GetEditTabBulkTrimCountsDocument],
      awaitRefetchQueries: true,
      onCompleted: data => {
        if (
          data?.undoFillerWordRemovalTTS?.__typename !==
            'UndoFillerWordRemovalTTSPayload' ||
          !data.undoFillerWordRemovalTTS.video
        ) {
          setShowConfirmationToast(
            'Failed to undo filler word removal. Please try again.'
          );
          return;
        }

        updateVideoAfterBulkTrims(data.undoFillerWordRemovalTTS.video);
      },
      onError: () => {
        setShowConfirmationToast(
          'Failed to undo filler word removal. Please try again.'
        );
      },
    });

  const [undoRemoveSilences, { loading: isUndoingSilenceRemoval }] =
    useEditTabUndoBulkTrimVideoMutation({
      variables: {
        videoId,
        includeSilences: true,
        includeFillers: false,
        password,
        lastTrimId,
        forceSave: false,
      },
      refetchQueries: [GetEditTabBulkTrimCountsDocument],
      awaitRefetchQueries: true,
      onCompleted: data => {
        if (
          data?.bulkUndoTrim?.__typename !== 'BulkUndoTrimPayload' ||
          !data.bulkUndoTrim.video
        ) {
          setShowConfirmationToast(
            'Failed to undo silence removal. Please try again.'
          );
          return;
        }

        fireSilenceToggleEvent({
          videoId,
          enabled: false,
          source: 'share-page',
        });

        updateVideoAfterBulkTrims(data.bulkUndoTrim.video);
      },
      onError: () => {
        setShowConfirmationToast(
          'Failed to undo silence removal. Please try again.'
        );
      },
    });

  const [undoRemoveFillerWords, { loading: isUndoingFillerWordRemoval }] =
    useEditTabUndoBulkTrimVideoMutation({
      variables: {
        videoId,
        includeSilences: false,
        includeFillers: true,
        includeFillerWordsPlus: true,
        password,
        lastTrimId,
        forceSave: false,
      },
      refetchQueries: [GetEditTabBulkTrimCountsDocument],
      awaitRefetchQueries: true,
      onCompleted: data => {
        if (
          data?.bulkUndoTrim?.__typename !== 'BulkUndoTrimPayload' ||
          !data.bulkUndoTrim.video
        ) {
          setShowConfirmationToast(
            'Failed to undo filler word removal. Please try again.'
          );
          return;
        }

        fireFillerWordToggleEvent({
          videoId,
          enabled: false,
          source: 'share-page',
          type: null,
          inFillerWordsPlusFlag,
        });

        updateVideoAfterBulkTrims(data.bulkUndoTrim.video);
      },
      onError: () => {
        setShowConfirmationToast(
          'Failed to undo filler word removal. Please try again.'
        );
      },
    });

  const [removeFillerWordsPlus, { loading: isRemovingFillerWordsPlus }] =
    useEditTabRemoveFillerWordsPlusMutation({
      variables: {
        videoId,
        password,
      },
      awaitRefetchQueries: true,
      refetchQueries: [GetEditTabBulkTrimCountsDocument],
      onCompleted: data => {
        if (
          data?.trimDisfluencies?.__typename !== 'TrimDisfluenciesPayload' ||
          !data.trimDisfluencies.video
        ) {
          setShowConfirmationToast(
            'Failed to remove filler words. Please try again.'
          );
          return;
        }

        fireFillerWordToggleEvent({
          videoId,
          enabled: true,
          source: 'share-page',
          type: 'plus',
          inFillerWordsPlusFlag,
          wordsRemoved: data.trimDisfluencies?.wordsRemoved ?? 0,
        });

        updateVideoAfterBulkTrims(data.trimDisfluencies.video);
      },
      onError: () => {
        setShowConfirmationToast(
          'Failed to remove filler words. Please try again.'
        );
      },
    });

  const bulkTrimFillerWords = useCallback(
    (type: BulkTrimOperations) => {
      if (type === REMOVE_SILENCES) {
        removeSilences();
        return;
      }
      if (type === REMOVE_FILLER_WORDS) {
        removeFillerWords();
        return;
      }

      if (type === UNDO_REMOVE_SILENCES) {
        undoRemoveSilences();
        return;
      }

      if (type === UNDO_REMOVE_FILLER_WORDS) {
        undoRemoveFillerWords();
        return;
      }

      if (type === REMOVE_FILLER_WORDS_PLUS) {
        removeFillerWordsPlus();
        return;
      }

      if (type === REMOVE_FILLER_WORDS_TTS) {
        removeFillerWordsTts();
        return;
      }

      if (type === UNDO_REMOVE_FILLER_WORDS_TTS) {
        undoRemoveFillerWordsTts();
        return;
      }
    },
    [
      removeFillerWords,
      removeFillerWordsPlus,
      removeFillerWordsTts,
      removeSilences,
      undoRemoveFillerWords,
      undoRemoveFillerWordsTts,
      undoRemoveSilences,
    ]
  );

  const onFillerWordsButtonClick = useCallback(() => {
    hasAnyTrimmedFillerWords
      ? bulkTrimFillerWords(UNDO_REMOVE_FILLER_WORDS)
      : hasFillerWordsPlusAccess
        ? bulkTrimFillerWords(REMOVE_FILLER_WORDS_PLUS)
        : bulkTrimFillerWords(REMOVE_FILLER_WORDS);
  }, [bulkTrimFillerWords, hasAnyTrimmedFillerWords, hasFillerWordsPlusAccess]);

  const onFillerWordsTtsButtonClick = useCallback(() => {
    hasAnyTrimmedFillerWords
      ? bulkTrimFillerWords(UNDO_REMOVE_FILLER_WORDS_TTS)
      : bulkTrimFillerWords(REMOVE_FILLER_WORDS_TTS);
  }, [bulkTrimFillerWords, hasAnyTrimmedFillerWords]);

  const isFillerWordsRemovalInProgress =
    isRemovingFillerWords ||
    isRemovingFillerWordsPlus ||
    isRemovingFillerWordsTts ||
    isUndoingRemoveFillerWordsTts ||
    isUndoingFillerWordRemoval;

  const isSilenceRemovalInProgress =
    isRemovingSilences || isUndoingSilenceRemoval;

  const isBulkTrimInProgress =
    isFillerWordsRemovalInProgress || isSilenceRemovalInProgress;
  const isDisabled =
    isBulkTrimInProgress || isUnavailable || bulkTrimHasApolloError;

  disabledTooltipText = bulkTrimHasApolloError
    ? 'Feature unavailable due to error'
    : disabledTooltipText;

  const showRemoveFillerWordsDropdown =
    hasFillerWordsPlusAccess && hasAnyTrimmedFillerWords && !isDisabled;

  const onRemoveFillerWordsDropdownClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFillerWordPopoverOpen(!isFillerWordPopoverOpen);
  };

  const [isFillerWordTooltipHovered, fillerWordTooltipHoverProps] = useHover();

  const shouldShowFillerWordsTooltip =
    isFillerWordTooltipHovered && !isFillerWordPopoverOpen && !isDisabled;

  const {
    renderLayer: renderFillerWordTooltipLayer,
    triggerProps: triggerFillerWordTooltipProps,
    layerProps: layerFillerWordTooltipProps,
  } = useLayer({
    isOpen: shouldShowFillerWordsTooltip,
    auto: true, // automatically find best placement
    placement: 'bottom-center',
    triggerOffset: 4,
  });

  const shouldShowFillerWordsPlusPopoverFtux =
    hasFillerWordsPlusAccess &&
    !isFillerWordPopoverOpen &&
    !shouldShowFillerWordsTooltip &&
    !isDisabled;

  return (
    <>
      <EditItem
        icon={<SvgSilenceRemoval />}
        title={
          isRemovingSilences
            ? 'Removing silences...'
            : isUndoingSilenceRemoval
              ? 'Undoing removal...'
              : hasTrimmedSilences
                ? `${secondsOfSilenceTrimmed}s of silence removed`
                : 'Remove silences'
        }
        onClick={hasTrimmedSilences ? undoRemoveSilences : removeSilences}
        rightOption={
          isSilenceRemovalInProgress ? (
            <Loader />
          ) : (
            <Switch
              isActive={hasTrimmedSilences}
              isDisabled={isDisabled}
              readOnly
            />
          )
        }
        isDisabled={isDisabled}
        disabledTooltipText={disabledTooltipText}
      />

      <EditItem
        icon={<SvgFillerWordRemoval />}
        title={
          isRemovingFillerWords || isRemovingFillerWordsPlus
            ? 'Removing filler words...'
            : isUndoingFillerWordRemoval
              ? 'Undoing removal...'
              : hasAnyTrimmedFillerWords
                ? `${numberOfFillerWordsTrimmed} filler ${pluralize(
                    'word',
                    numberOfFillerWordsTrimmed
                  )} removed`
                : 'Remove filler words'
        }
        onClick={onFillerWordsButtonClick}
        textOption={
          showRemoveFillerWordsDropdown ? (
            <Popover
              offset={1}
              isOpen={isFillerWordPopoverOpen}
              placement="bottomCenter"
              rootId="container"
              content={
                <RemoveFillerWordsPopover
                  onClose={() => setIsFillerWordPopoverOpen(false)}
                  bulkTrim={bulkTrimFillerWords}
                  appliedFillerWordRemoval={fillerWordAppliedType}
                  showOffOption={false}
                  showEditTtsInfoPanel={false}
                />
              }
            >
              <div
                {...triggerFillerWordTooltipProps}
                {...fillerWordTooltipHoverProps}
                tabIndex={-1}
              >
                <IconButton
                  icon={<SvgChevronDown />}
                  size="small"
                  onClick={onRemoveFillerWordsDropdownClick}
                  altText="Open remove filler words popover"
                  isDisabled={isDisabled}
                />
              </div>

              {shouldShowFillerWordsTooltip
                ? renderFillerWordTooltipLayer(
                    <TooltipBox
                      layerProps={layerFillerWordTooltipProps}
                      zIndex={1100}
                    >
                      Fine-tune your filler words here
                    </TooltipBox>
                  )
                : null}
            </Popover>
          ) : null
        }
        rightOption={
          isFillerWordsRemovalInProgress ? (
            <Loader />
          ) : (
            <Switch
              isActive={hasAnyTrimmedFillerWords}
              isDisabled={isDisabled}
              readOnly
            />
          )
        }
        isDisabled={isDisabled}
        disabledTooltipText={disabledTooltipText}
        popoverContent={
          shouldShowFillerWordsPlusPopoverFtux ? (
            <FillerWordPlusRemovalPopoverFtux />
          ) : null
        }
      />

      {isFillerWordRemovalTtsEnabled ? (
        <EditItem
          icon={<SvgFillerWordRemoval />}
          title={
            isRemovingFillerWordsTts
              ? 'Removing filler words (TTS)...'
              : isUndoingFillerWordRemoval
                ? 'Undoing removal (TTS)...'
                : 'Remove filler words (TTS)'
          }
          onClick={onFillerWordsTtsButtonClick}
          rightOption={
            isFillerWordsRemovalInProgress ? (
              <Loader />
            ) : (
              <Switch
                isActive={hasAnyTrimmedFillerWords}
                isDisabled={isDisabled}
                readOnly
              />
            )
          }
          isDisabled={isDisabled}
          disabledTooltipText={disabledTooltipText}
        />
      ) : null}
    </>
  );
};
