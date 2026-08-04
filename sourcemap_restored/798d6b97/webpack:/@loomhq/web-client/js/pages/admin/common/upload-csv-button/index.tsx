import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';

import { Button, Tooltip } from '@loomhq/lens';
import { SvgCheck } from '@loomhq/lens/icons/check';
import { SvgList } from '@loomhq/lens/icons/list';
import { CSV } from '@loomhq/shared-utilities/constants/mimes';

import styles from './styles.module.css';

type UploadCsvButtonProps = {
  onClick: (value: any) => void;
  limit?: number | null;
  text?: string;
};

export const UploadCsvButton = forwardRef(
  (
    { onClick, limit = null, text = 'Upload CSV' }: UploadCsvButtonProps,
    ref
  ) => {
    const csvInputRef = useRef<HTMLInputElement>(null);
    const [uploadedFileName, setUploadedFileName] = useState<string | null>(
      null
    );
    UploadCsvButton.displayName = 'UploadCsvButton';

    const onUploadCsvClick = () => csvInputRef?.current?.click();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setUploadedFileName(`${file.name}, ${file.size}kb`);
        onClick(file);
      }
    };

    useImperativeHandle(ref, () => ({
      resetUploadState() {
        setUploadedFileName(null);
        if (csvInputRef.current) {
          csvInputRef.current.value = '';
        }
      },
    }));

    return (
      <>
        <input
          accept={CSV}
          className={styles.uploadInput}
          onChange={handleFileChange}
          ref={csvInputRef}
          type="file"
        />

        <Tooltip
          content={
            limit && !uploadedFileName
              ? `Limit ${limit}`
              : uploadedFileName
                ? `${uploadedFileName}`
                : null
          }
        >
          <Button
            icon={uploadedFileName ? <SvgCheck /> : <SvgList />}
            onClick={onUploadCsvClick}
          >
            {uploadedFileName ? 'Uploaded' : text}
          </Button>
        </Tooltip>
      </>
    );
  }
);
