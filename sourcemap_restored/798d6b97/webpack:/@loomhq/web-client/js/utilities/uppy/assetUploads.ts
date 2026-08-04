import { Uppy, UppyFile } from '@uppy/core';
import AwsS3Multipart from '@uppy/aws-s3-multipart';
import { useEffect, useRef } from 'react';
import { useUppy } from '@uppy/react';
import * as metrics from '@js/utilities/metrics';
import {
  ASSET_UPLOAD_START,
  ASSET_UPLOAD_ERROR,
  ASSET_UPLOAD_SUCCESS,
} from '@js/constants/metrics';

type UppyForAssetUploadsProps = {
  allowedFileTypes?: string[];
  maxFileSizeMB?: number;
  maxNumberOfFiles?: number;
  onBeforeFileAdded?: (file: UppyFile) => UppyFile | undefined;
  onUploadStart?: (data: { id: string; fileIDs: string[] }) => void;
  onUploadSuccess?: (
    file: UppyFile,
    response: { body?: { key: string }; status?: number }
  ) => void;
  onUploadError?: (file: UppyFile, error: Error) => void;
  localeOptions?: {
    strings?: Record<string, string>;
  };
};

export const useUppyForAssetUploads = ({
  allowedFileTypes = ['image/*'], // default to image files
  maxFileSizeMB = 10, // 10MB max file size
  maxNumberOfFiles = 1, // only allow one file at a time
  onBeforeFileAdded = () => undefined,
  onUploadStart = () => undefined,
  onUploadSuccess = () => undefined,
  onUploadError = () => undefined,
  localeOptions,
}: UppyForAssetUploadsProps): Uppy => {
  // Refs to avoid stale closures
  const uploadStartRef = useRef(onUploadStart);
  const uploadSuccessRef = useRef(onUploadSuccess);
  const uploadErrorRef = useRef(onUploadError);

  // Convert MB to bytes
  const maxFileSize = maxFileSizeMB * 1024 * 1024;

  // Update refs when props change
  useEffect(() => {
    uploadStartRef.current = onUploadStart;
    uploadSuccessRef.current = onUploadSuccess;
    uploadErrorRef.current = onUploadError;
  }, [onUploadStart, onUploadSuccess, onUploadError]);

  // Init Uppy instance once
  const uppy = useUppy(() => {
    // Set Uppy options, checkout https://uppy.io/docs/uppy/#options for more details
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const uppyOptions: any = {
      restrictions: {
        allowedFileTypes,
        maxFileSize,
        maxNumberOfFiles,
      },
      autoProceed: true, // Automatically upload after file selection
      onBeforeFileAdded,
    };

    // If locale options are provided, set them
    // This allows for custom error messages
    // checkout https://uppy.io/docs/uppy/#locale for more details
    if (localeOptions?.strings) {
      uppyOptions.locale = { strings: localeOptions.strings };
    }

    return new Uppy(uppyOptions).use(AwsS3Multipart, {
      companionUrl: '/asset_uploads',
    });
  });

  useEffect(() => {
    // Event handlers using refs
    const handleUploadStart = (data: { id: string; fileIDs: string[] }) => {
      metrics.incrementMetric(ASSET_UPLOAD_START);
      uploadStartRef.current(data);
    };

    const handleUploadSuccess = (
      file: UppyFile,
      response: { body?: { key: string }; status?: number }
    ) => {
      metrics.incrementMetric(ASSET_UPLOAD_SUCCESS);
      uploadSuccessRef.current(file, response);
    };

    const handleUploadError = (file: UppyFile, error: Error) => {
      metrics.incrementMetric(ASSET_UPLOAD_ERROR);
      uploadErrorRef.current(file, error);
    };

    // Register listeners
    uppy.on('upload', handleUploadStart);
    uppy.on('upload-success', handleUploadSuccess);
    uppy.on('upload-error', handleUploadError);

    return () => {
      // Cleanup listeners on unmount
      uppy.off('upload', handleUploadStart);
      uppy.off('upload-success', handleUploadSuccess);
      uppy.off('upload-error', handleUploadError);
      uppy.close();
    };
  }, [uppy]);

  return uppy;
};
