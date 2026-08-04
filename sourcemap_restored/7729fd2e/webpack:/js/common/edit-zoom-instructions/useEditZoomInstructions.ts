import { type EditZoomInstruction } from '@js/pages/consolidated-edit/common';
import { useConsolidatedEditZoomInstructionsDataQuery } from './ConsolidateEditZoomInstructionsData.generated';
import { useVideoPasswordContext } from '@js/common/video-password/useVideoPasswordContext';
import { useFlagIsActivated } from '@js/hooks/featureFlag';
import {
  EXPERIMENTS,
  FlagReturnValues,
  ControlType,
} from '@loomhq/shared-utilities/constants/statsig';
import { useCallback, useMemo } from 'react';
import { useConsolidateEditZoomInstructionRemovalByVideoIdMutation } from './ConsolidateEditZoomInstructionRemovalByVideoId.generated';
import { useConsolidatedRemoveAllEditZoomInstructionsMutation } from './ConsolidatedRemoveAllEditZoomInstructions.generated';
import { useConsolidatedEditAddAutoZoomsToVideoMutation } from './ConsolidatedEditAddAutoZoomsToVideo.generated';

export const useEditZoomInstructions = (
  videoId: string
): {
  zooms: EditZoomInstruction[];
  isZoomQueryLoading: boolean;
  isLoomZoomToClickEnabled: boolean;
  removeZoomById: (zoomId: string) => void;
  removeAllZooms: VoidFunction;
  addAutoZoomsToVideo: VoidFunction;
  isAddAutoZoomsToVideoLoading: boolean;
} => {
  const isLoomZoomToClickEnabled = useFlagIsActivated({
    flag: EXPERIMENTS.EXPERIMENT_LOOM_ZOOM_TO_CLICK,
    controlType: ControlType.STATSIG_EXPERIMENT,
    activationValues: [FlagReturnValues.VARIANT],
  });

  const { password } = useVideoPasswordContext();

  const { data, loading: isZoomQueryLoading } =
    useConsolidatedEditZoomInstructionsDataQuery({
      variables: {
        videoId,
        password,
      },
      skip: !isLoomZoomToClickEnabled,
    });
  const [removeZoomMutation] =
    useConsolidateEditZoomInstructionRemovalByVideoIdMutation();
  const [removeAllZoomInstructionsMutation] =
    useConsolidatedRemoveAllEditZoomInstructionsMutation();
  const [
    addAutoZoomsToVideoMutation,
    { loading: isAddAutoZoomsToVideoLoading },
  ] = useConsolidatedEditAddAutoZoomsToVideoMutation();

  const zooms = useMemo(() => {
    if (data?.getVideo?.__typename !== 'RegularUserVideo') {
      return [];
    }
    return data.getVideo.editZoomInstructions;
  }, [data]);

  const editPreview = useMemo(() => {
    if (data?.getVideo?.__typename !== 'RegularUserVideo') {
      return null;
    }

    return data.getVideo.editPreview;
  }, [data]);

  const removeZoomById = useCallback(
    (zoomId: string) => {
      removeZoomMutation({
        variables: {
          input: { videoId, zoomId },
        },
        optimisticResponse: {
          __typename: 'Mutation',
          removeEditZoomInstruction: {
            __typename: 'RemoveEditZoomInstructionPayload',
            video: {
              __typename: 'RegularUserVideo',
              id: videoId,
              editZoomInstructions: zooms.filter(zoom => zoom.id !== zoomId),
              editPreview,
            },
          },
        },
      });
    },
    [removeZoomMutation, videoId, zooms, editPreview]
  );

  const removeAllZooms = useCallback(() => {
    removeAllZoomInstructionsMutation({
      variables: {
        videoId,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        removeAllEditZoomInstructions: {
          __typename: 'RemoveAllEditZoomInstructionsPayload',
          video: {
            __typename: 'RegularUserVideo',
            id: videoId,
            editZoomInstructions: [],
            editPreview,
          },
        },
      },
    });
  }, [removeAllZoomInstructionsMutation, videoId, editPreview]);

  const addAutoZoomsToVideo = useCallback(() => {
    addAutoZoomsToVideoMutation({
      variables: {
        videoId,
      },
    });
  }, [addAutoZoomsToVideoMutation, videoId]);

  return {
    zooms,
    isZoomQueryLoading,
    isLoomZoomToClickEnabled,
    removeZoomById,
    removeAllZooms,
    addAutoZoomsToVideo,
    isAddAutoZoomsToVideoLoading,
  };
};
