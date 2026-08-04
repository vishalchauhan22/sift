import { useVideoContext } from '@js/common/video-player';
import { WorkflowTemplateType } from '@js/globalTypes.generated';

import { useUpdateRecordingVideoDocumentTypeMutation } from './UpdateRecordingVideoDocumentType.generated';

export const useUpdateRecordingVideoDocumentType = ({
  recordingDocumentationType,
}: {
  recordingDocumentationType: WorkflowTemplateType | null | undefined;
}): void => {
  const {
    video: { id: videoId },
  } = useVideoContext();

  const [updateRecordingVideoDocumentType, { error }] =
    useUpdateRecordingVideoDocumentTypeMutation({
      variables: {
        videoId,
        recordingDocumentationType:
          recordingDocumentationType as WorkflowTemplateType,
      },
    });

  if (
    recordingDocumentationType !== null &&
    recordingDocumentationType !== undefined &&
    videoId
  ) {
    updateRecordingVideoDocumentType();
  }
};
