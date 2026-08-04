import React, { useEffect } from 'react';

import './styles.less';

const SIDEBAR_OPEN_CLASS = 'sidebar-open';

type NavigationSidebarProps = {
  children: React.ReactNode;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

export const NavigationSidebar = ({
  children,
  isSidebarOpen,
  toggleSidebar,
}: NavigationSidebarProps): JSX.Element => {
  useEffect(() => {
    // Handle toggling the body class when isSidebarOpen prop changes
    document.body?.classList?.toggle(SIDEBAR_OPEN_CLASS, isSidebarOpen);
  }, [isSidebarOpen]);

  useEffect(() => {
    // Cleanup when the component is unmounted
    return () => {
      const isOpen = document.body.classList.contains(SIDEBAR_OPEN_CLASS);
      if (isOpen) {
        toggleSidebar();
      }
      document.body.classList.remove(SIDEBAR_OPEN_CLASS);
    };
  }, [toggleSidebar]);

  return (
    <div className="navigationSidebar">
      <ul>{children}</ul>
    </div>
  );
};
