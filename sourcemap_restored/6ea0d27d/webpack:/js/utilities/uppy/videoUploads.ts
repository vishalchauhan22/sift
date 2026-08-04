import AwsS3Multipart from '@uppy/aws-s3-multipart';

import { RequestClient } from '@uppy/companion-client';
import { Uppy } from '@uppy/core';

import { v4 as uuidv4 } from 'uuid';

import { SPECIAL_FOLDER_ID_MY_VIDEOS } from '@loomhq/shared-utilities/constants/folders';

import {
  ALLOWED_VIDEO_UPLOAD_EXTENSIONS,
  ALLOWED_VIDEO_UPLOAD_MIMES,
} from '@loomhq/shared-utilities/constants/mimes';
import { Feature } from '@loomhq/shared-utilities/constants/product';
import { VIDEO_UPLOADS_MAX_FILE_SIZE } from '@loomhq/shared-utilities/constants/videoUploads';
import { PRIVATE_WORKSPACE } from '@loomhq/shared-utilities/constants/workspaces';
import {
  VIDEO_UPLOADS_BATCH_UPLOADED,
  VIDEO_UPLOADS_CANCEL_UPLOADS,
  VIDEO_UPLOADS_FILE_ADDED,
  VIDEO_UPLOADS_FILE_REMOVED,
  VIDEO_UPLOADS_FILE_UPLOAD_FAILED,
  VIDEO_UPLOADS_RESTRICTED_ERR,
  VIDEO_UPLOADS_UPLOADED_TO_S3,
  VIDEO_UPLOADS_UPLOADS_STARTED,
  VIDEO_UPLOADS_UPLOAD_RETRIED,
} from '@js/constants/events';
import { LOOM_URI } from '@js/constants/routes';
import * as analytics from '@js/utilities/analytics';
import fileType from '@js/utilities/file-type';
import * as logger from '@js/utilities/loggerx';

import { getGraphQLClient } from '../graphql';
import { store } from '../store-init';
import CompleteVideoFileUploadMutation from './CompleteVideoFileUpload.gql';
import { Workspace } from './types';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '../analytics/attribute-transformer';

export type DashbooardData = {
  folder_id: string | null;
  root_folder_id: string;
  library: string;
  folder_special_id: string;
  selectedWorkspace: Workspace;
} & (
  | { workspace_id: string; workspace_guid?: never }
  | { workspace_guid: string; workspace_id?: never }
);

const UPLOADED_FILE_MATCH_REGEX =
  /https:\/\/loom-media-(?:dev|staging|production)\.s3\.us-west-2\.amazonaws\.com\/uploads\/\d+\/(.+)/;
const INVALID_FILE_NAME_CHARS_REGEX = /[^\p{L}\p{Emoji_Presentation}\d\s\-_]/gu;

const FALLBACK_FILE_NAME = 'video_upload';

// Patching Uppy for now since it looks like there's an issue
// where 'Content-type' and other headers are being stripped out.
// Modified from:
// https://github.com/transloadit/uppy/blob/d6d4b054255719ab30a5b89bd82255727a55fd3b/packages/%40uppy/companion-client/src/RequestClient.js#L118
//
// Github Issue
// https://github.com/transloadit/uppy/issues/2089
RequestClient.prototype.preflightAndHeaders = function (path) {
  return Promise.all([this.preflight(path), this.headers()]).then(
    ([allowedHeaders, headers]) => {
      const allowedHeadersModified = [...allowedHeaders, 'content-type'];

      // filter to keep only allowed Headers
      Object.keys(headers).forEach(header => {
        if (allowedHeadersModified.indexOf(header.toLowerCase()) === -1) {
          this.uppy.log(
            `[CompanionClient] excluding unallowed header ${header}`
          );
          delete headers[header];
        }
      });

      return headers;
    }
  );
};

export const UPPY_LOCALE_OPTIONS = {
  strings: {
    dropPasteImport: 'Drag and drop videos here or import from',
    dropPaste: 'Drag and drop videos here or %{browse}',
  },
};

let uppyInst;
let uploadStartTimes = {};

export const getDashboardData = (
  currentFolderId: string | null
): DashbooardData => {
  const state = store?.getState();
  const {
    workspace: { workspaces },
  } = state;

  const selectedWorkspace = workspaces.find(workspace => workspace.isSelected);
  return {
    folder_id: currentFolderId,
    root_folder_id: SPECIAL_FOLDER_ID_MY_VIDEOS,
    library: PRIVATE_WORKSPACE,
    folder_special_id: SPECIAL_FOLDER_ID_MY_VIDEOS,
    selectedWorkspace: {
      ...selectedWorkspace,
      ...withIdentifiers(
        'getDashboardData selectedWorkspace',
        AnalyticsEntityId.workspace(selectedWorkspace?.id, 'string', 'id')
      ),
    },
    ...(withIdentifiers(
      'getDashboardData',
      AnalyticsEntityId.workspace(
        selectedWorkspace?.id,
        'string',
        'workspace_id'
      )
    ) as
      | { workspace_id: string; workspace_guid?: never }
      | { workspace_guid: string; workspace_id?: never }),
  };
};

const parseUploadedFileName = url => {
  return url.match(UPLOADED_FILE_MATCH_REGEX)[1];
};

const completeVideoUpload = (
  fileName,
  uploadedFilePath,
  currentFolderId,
  currentSpaceId,
  videoProperties
) => {
  const gqlClient = getGraphQLClient();

  return gqlClient
    .mutate({
      mutation: CompleteVideoFileUploadMutation,
      //All the variables must be present for the mutation to complete
      variables: {
        fileName,
        keyPath: uploadedFilePath,
        folderId: currentFolderId,
        spaceId: currentSpaceId,
        videoProperties,
      },
    })
    .then(({ data }) => {
      const { video } = data;

      return video;
    });
};

const onUploadError = (file, error) => {
  const {
    id,
    type = '',
    extension = '',
    size,
    meta: { file_anonymous_id } = {},
  } = file;

  logger.error(
    error,
    {
      message: 'Error with file',
      fileId: id,
    },
    {
      feature: Feature.VideoUpload,
    }
  );

  analytics.track(VIDEO_UPLOADS_FILE_UPLOAD_FAILED, {
    ...withIdentifiers(
      VIDEO_UPLOADS_FILE_UPLOAD_FAILED,
      AnalyticsEntityId.anonymous(file_anonymous_id, 'file_anonymous_id')
    ),
    mime_type: type.toLowerCase(),
    file_extension: extension.toLowerCase(),
    file_size: size,
    err_message: error.message,
  });
};

const onFileAdded = file => {
  const { type = '', extension = '' } = file;
  const reader = new FileReader();

  reader.onload = () => {
    const arrayBuffer = new Uint8Array(reader.result as ArrayBuffer);
    const { mime } = fileType(arrayBuffer) || {};

    if (!mime) {
      logger.warning('File type can not be read');
    }

    if (mime && !ALLOWED_VIDEO_UPLOAD_MIMES.includes(mime)) {
      uppyInst.removeFile(file.id);
      uppyInst.info(
        `This file was removed its file type isn't supported yet: ${file.name}`,
        'error',
        5000
      );
    }
  };

  reader.readAsArrayBuffer(file.data);

  const fileId = uuidv4();

  uppyInst.setFileMeta(file.id, { file_anonymous_id: fileId });

  analytics.track(VIDEO_UPLOADS_FILE_ADDED, {
    ...withIdentifiers(
      VIDEO_UPLOADS_FILE_ADDED,
      AnalyticsEntityId.anonymous(fileId, 'file_anonymous_id')
    ),
    mime_type: type.toLowerCase(),
    file_extension: extension.toLowerCase(),
  });
};

const onFileRemoved = file => {
  const { type = '', extension = '', meta: { file_anonymous_id } = {} } = file;

  analytics.track(VIDEO_UPLOADS_FILE_REMOVED, {
    ...withIdentifiers(
      VIDEO_UPLOADS_FILE_REMOVED,
      AnalyticsEntityId.anonymous(file_anonymous_id, 'file_anonymous_id')
    ),
    mime_type: type.toLowerCase(),
    file_extension: extension.toLowerCase(),
  });
};

const onRestrictionError = file => {
  const {
    type = '',
    extension = '',
    size,
    meta: { file_anonymous_id } = {},
  } = file;
  const currentMaxFileSize = uppyInst?.opts?.restrictions?.maxFileSize;

  analytics.track(VIDEO_UPLOADS_RESTRICTED_ERR, {
    ...withIdentifiers(
      VIDEO_UPLOADS_RESTRICTED_ERR,
      AnalyticsEntityId.anonymous(file_anonymous_id, 'file_anonymous_id')
    ),
    mime_type: type.toLowerCase(),
    file_extension: extension.toLowerCase(),
    file_size: size,
    over_size_limit: size > currentMaxFileSize,

    unsupported_file_type: !ALLOWED_VIDEO_UPLOAD_EXTENSIONS.has(
      `.${extension.toLowerCase()}`
    ),
  });
};

const createOnUploadFileSuccessHandler = (currentFolderId, currentSpaceId) => {
  return async (file, response) => {
    const fileNameWithoutExt = file.name.split('.').slice(0, -1).join('.');
    const fileEndTimestamp = new Date().getTime();
    const uploadUrl = decodeURIComponent(response.uploadURL);
    const uploadedFilePath = parseUploadedFileName(uploadUrl);

    const uppyState = uppyInst.getState();
    const { files = {} } = uppyState;
    const currentFileState = files[file.id];
    const { meta: { file_anonymous_id } = {} } = file;

    uppyInst.setFileState(file.id, {
      progress: {
        ...currentFileState.progress,
        uploadComplete: false,
      },
      uploadURL: '',
    });

    let video;

    try {
      video = await completeVideoUpload(
        fileNameWithoutExt,
        uploadedFilePath,
        currentFolderId,
        currentSpaceId,
        {
          file_size: file.size,
          file_anonymous_id: file.meta.file_anonymous_id,
        }
      );
    } catch (error) {
      logger.warning('Unable upload video file', { error });
    }

    if (!video) {
      return;
    }

    const loomShareUrl = `${LOOM_URI}/share/${video.id}`;

    uppyInst.setFileState(file.id, {
      progress: {
        ...currentFileState.progress,
        uploadComplete: true,
      },
      uploadURL: loomShareUrl,
    });

    if (Object.keys(files).length === 1) {
      const otherWindow = window.open(loomShareUrl, '_blank');

      if (otherWindow) {
        otherWindow.opener = null;
        otherWindow.location = loomShareUrl;
      }
    }

    analytics.track(VIDEO_UPLOADS_UPLOADED_TO_S3, {
      ...withIdentifiers(
        VIDEO_UPLOADS_UPLOADED_TO_S3,
        AnalyticsEntityId.anonymous(file_anonymous_id, 'file_anonymous_id'),
        AnalyticsEntityId.video(video.id, 'video_id')
      ),
      mime_type: file.type.toLowerCase(),
      file_extension: file.extension.toLowerCase(),
      file_size: file.size,
      upload_time: fileEndTimestamp - uploadStartTimes[file.id],
    });
  };
};

const refetchVideos = async setRenameId => {
  const uppyState = uppyInst.getState();
  const fileKeys = Object.keys(uppyState.files);
  if (fileKeys.length) {
    setRenameId(null);

    const gqlClient = getGraphQLClient();

    await gqlClient.refetchQueries({
      include: ['GetLooms'],
    });
  }
};

const onUploadStart = data => {
  const { fileIDs } = data;

  const currentTimestamp = new Date().getTime();

  fileIDs.forEach(fileId => {
    uploadStartTimes[fileId] = currentTimestamp;
  });

  analytics.track(VIDEO_UPLOADS_UPLOADS_STARTED, {
    num_files: fileIDs.length,
  });
};

const onCompleteUploads = result => {
  analytics.track(VIDEO_UPLOADS_BATCH_UPLOADED, {
    num_success: result.successful.length,
    num_failed: result.failed.length,
  });
};

const onUploadRetry = () => {
  analytics.track(VIDEO_UPLOADS_UPLOAD_RETRIED);
};

const onCancelAll = () => {
  analytics.track(VIDEO_UPLOADS_CANCEL_UPLOADS);
};

const updateFileSizeLimit = uppyInst => {
  const videoSizeLimit = VIDEO_UPLOADS_MAX_FILE_SIZE;

  uppyInst?.setOptions({
    restrictions: { maxFileSize: videoSizeLimit },
  });
};

const onBeforeFileAdded = currentFile => {
  const nameSplit = currentFile.name.split('.');
  const extension = nameSplit.pop();
  const fileName = nameSplit.join('.');

  const newFileName =
    fileName.replace(INVALID_FILE_NAME_CHARS_REGEX, '') || FALLBACK_FILE_NAME;

  const modifiedFile = {
    ...currentFile,
    name: `${newFileName}.${extension}`,
  };

  return modifiedFile;
};

export const configureUppy = (
  uppyOptions = {},
  setRenameId: (newId: string | null) => void,
  currentFolderId: string | null,
  currentSpaceId: string | null
): Uppy => {
  if (uppyInst) {
    unmountUppy(setRenameId, currentFolderId, currentSpaceId);
  }

  uppyInst = new Uppy({
    restrictions: {
      // This only validates by extension name. The mime-type
      // Uppy provides seemed to be based on filename and can be
      // fooled by just renaming the file extension.
      // We do additional mime-type checks server-side
      allowedFileTypes: Array.from(ALLOWED_VIDEO_UPLOAD_EXTENSIONS),
      maxFileSize: VIDEO_UPLOADS_MAX_FILE_SIZE,
      maxNumberOfFiles: 10,
    },
    onBeforeFileAdded,
    ...uppyOptions,
  }).use(AwsS3Multipart, {
    companionUrl: '/video_uploads',
  });

  // file selection
  uppyInst.on('file-added', onFileAdded);
  uppyInst.on('file-removed', onFileRemoved);
  uppyInst.on('restriction-failed', onRestrictionError);

  // upload process
  uppyInst.on('upload', onUploadStart);
  uppyInst.on('upload-retry', onUploadRetry);
  uppyInst.on(
    'upload-success',
    createOnUploadFileSuccessHandler(currentFolderId, currentSpaceId)
  );
  uppyInst.on('upload-error', onUploadError);

  // completion and cleanup
  uppyInst.on('complete', onCompleteUploads);
  uppyInst.on('cancel-all', onCancelAll);
  uppyInst.on('dashboard:modal-closed', () => refetchVideos(setRenameId));

  updateFileSizeLimit(uppyInst);

  return uppyInst;
};

export const unmountUppy = (
  setRenameId: (newId: string | null) => void,
  currentFolderId: string | null,
  currentSpaceId: string | null
): void => {
  if (!uppyInst) {
    return;
  }

  // file selection
  uppyInst.off('file-added', onFileAdded);
  uppyInst.off('file-removed', onFileRemoved);
  uppyInst.off('restriction-failed', onRestrictionError);

  // upload process
  uppyInst.off('upload', onUploadStart);
  uppyInst.off('upload-retry', onUploadRetry);
  uppyInst.off(
    'upload-success',
    createOnUploadFileSuccessHandler(currentFolderId, currentSpaceId)
  );
  uppyInst.off('upload-error', onUploadError);

  // completion and cleanup
  uppyInst.off('complete', onCompleteUploads);
  uppyInst.off('cancel-all', onCancelAll);
  uppyInst.off('dashboard:modal-closed', () => refetchVideos(setRenameId));

  uppyInst.close();

  uppyInst = null;

  uploadStartTimes = {};
};

declare module '@uppy/companion-client' {
  interface RequestClient {
    preflightAndHeaders(path: string): Promise<Record<string, string>>;
    preflight(path: string): Promise<string>;
    headers(): Promise<Record<string, string>>;
    uppy: Uppy;
  }
}
