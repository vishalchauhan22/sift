import React from 'react';

import { Toast } from '@loomhq/lens';

import { useErrorStore } from './ErrorStoreProvider';
import styles from './styles.module.less';

export type ErrorItem = {
  message: string;
  key: string;
};

const ErrorToast = ({ message }: { message: string }) => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <Toast isOpen={isOpen} onCloseClick={() => setIsOpen(false)}>
      {message}
    </Toast>
  );
};

export const ErrorLayer = (): JSX.Element => {
  const { errors } = useErrorStore();

  return (
    <div className={styles.container}>
      {errors.map(error => {
        return <ErrorToast key={error.key} message={error.message} />;
      })}
    </div>
  );
};
