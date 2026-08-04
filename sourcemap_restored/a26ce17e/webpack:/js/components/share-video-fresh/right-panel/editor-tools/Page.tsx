import React from 'react';

import { Arrange } from '@loomhq/lens';
import { useCtaForm } from '@js/common/cta-form';
import { EDIT_TOOLS_LIST, EditToolsTypes } from '@js/pages/share/common';

import { CtaFormWrapper } from './cta-form';
import { ThumbnailWidget } from './thumbnail-widget';

const PageContent = ({
  currentPage,
  goBackToEditPage,
  pageTitle,
  showDefaultCta,
}: {
  currentPage: EditToolsTypes | null;
  goBackToEditPage: () => void;
  pageTitle: string;
  showDefaultCta?: boolean;
}): React.ReactElement => {
  const [isOnDefaultTab, setIsOnDefaultTab] = React.useState(false);

  // this will be where we add the existing edit functionality to the pages
  switch (currentPage) {
    case EDIT_TOOLS_LIST.Link:
      return (
        <CtaFormWrapper
          goBackToEditPage={goBackToEditPage}
          isOnDefaultTab={isOnDefaultTab}
          pageTitle={pageTitle}
          setIsOnDefaultTab={setIsOnDefaultTab}
          showDefaultCta={showDefaultCta ?? false}
        />
      );
    case EDIT_TOOLS_LIST.Thumbnail:
      return (
        <ThumbnailWidget
          goBackToEditPage={goBackToEditPage}
          pageTitle={pageTitle}
        />
      );
    default:
      return <></>;
  }
};

const Page = ({
  currentPage,
  onClose,
  pageTitle,
  showDefaultCta,
}: {
  currentPage: EditToolsTypes;
  onClose: () => void;
  pageTitle: string;
  showDefaultCta?: boolean;
}): JSX.Element => {
  const { setIsEditingCta } = useCtaForm();
  const goBackToEditPage = () => {
    if (currentPage === EDIT_TOOLS_LIST.Link) {
      setIsEditingCta(false);
    }

    onClose();
  };

  return (
    <Arrange
      height="inherit"
      justifyContent="stretch"
      style={{ overflow: 'auto' }}
    >
      <PageContent
        currentPage={currentPage}
        goBackToEditPage={goBackToEditPage}
        pageTitle={pageTitle}
        showDefaultCta={showDefaultCta}
      />
    </Arrange>
  );
};

export { Page };
