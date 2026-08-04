import { useRef, useCallback, ReactElement, createElement } from 'react';

export type FileUploaderConfig = {
  onFileSelected: (file: File) => void;
  onError?: (error: Error) => void;
  accept?: string;
  multiple?: boolean;
  maxFileSizeInMB?: number;
  disabled?: boolean;
  validate?: boolean;
};

export type FileUploaderReturn = {
  openFileDialog: () => void;
  fileInputElement: ReactElement;
  reset: () => void;
  isDisabled: boolean;
};

/**
 * Headless file uploader hook that provides file selection functionality
 * Can be wired to any clickable element
 * Eventually hook with Uppy and upload to S3
 *
 * @example Basic usage with any button
 *
 * const MyComponent = () => {
 *   const { openFileDialog, fileInputElement } = useFileUploader({
 *     onFileSelected: (file) => console.log('Selected:', file.id),
 *     accept: 'image/*',
 *     maxFileSizeInMB: 10, // 10MB max file size
 *     onError: (error) => {
 *      toast.error(`Upload failed: ${error.message}`);
 *     },
 *   });
 *
 *   return (
 *     <div>
 *       <button onClick={openFileDialog}>Upload Photo</button>
 *       <div onClick={openFileDialog}>Click anywhere</div>
 *       <Icon onClick={openFileDialog} icon={<SvgUpload />} />
 *       {fileInputElement}
 *     </div>
 *   );
 * };
 *
 *
 * @example Multiple file selection
 *
 * const { openFileDialog, fileInputElement } = useFileUploader({
 *   onFileSelected: (file) => {
 *     setFiles(prev => [...prev, file]);
 *   },
 *   multiple: true,
 *   accept: '.pdf,.doc,.docx',
 * });
 *
 */
export const useFileUploader = ({
  onFileSelected,
  onError,
  accept = '*/*',
  multiple = false,
  maxFileSizeInMB = 10, // 10MB default
  disabled = false,
  validate = true,
}: FileUploaderConfig): FileUploaderReturn => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Convert MB to bytes
  const maxFileSize = maxFileSizeInMB * 1024 * 1024;

  const validateFile = useCallback(
    (file: File): boolean => {
      // Validate file size if specified
      if (validate && maxFileSize && file.size > maxFileSize) {
        const error = new Error(
          `Upload failed: File size must be under ${maxFileSizeInMB}MB`
        );
        onError?.(error);
        return false;
      }

      return true;
    },
    [maxFileSize, validate, maxFileSizeInMB, onError]
  );

  const openFileDialog = useCallback(() => {
    if (fileInputRef.current && !disabled) {
      fileInputRef.current.click();
    }
  }, [disabled]);

  const reset = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files || files.length === 0) {
        return;
      }

      try {
        if (multiple) {
          // Handle multiple files
          Array.from(files).forEach(file => {
            if (validateFile(file)) {
              onFileSelected(file);
            }
          });
        } else {
          // Handle single file
          const file = files[0];
          if (validateFile(file)) {
            onFileSelected(file);
          }
        }
      } catch (error) {
        const err =
          error instanceof Error ? error : new Error('Unknown error occurred');
        onError?.(err);
      }

      // Reset the input so the same file can be selected again
      reset();
    },
    [onFileSelected, onError, multiple, validateFile, reset]
  );

  // Hidden file input element to trigger file selection
  const fileInputElement = createElement('input', {
    ref: fileInputRef,
    type: 'file',
    accept,
    multiple,
    style: { display: 'none' },
    onChange: handleFileChange,
    disabled,
    'aria-hidden': 'true',
  });

  return {
    openFileDialog,
    fileInputElement,
    reset,
    isDisabled: disabled,
  };
};
