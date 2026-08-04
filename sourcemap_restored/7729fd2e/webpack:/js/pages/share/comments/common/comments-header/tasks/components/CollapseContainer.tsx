import React from 'react';

export const CollapseContainer = ({
  children,
  isCollapsed,
}: {
  children: JSX.Element;
  isCollapsed: boolean;
}): JSX.Element => {
  return (
    <div
      style={
        isCollapsed
          ? { height: 0, overflow: 'hidden' }
          : { height: 'auto', overflow: 'unset' }
      }
    >
      <div>{children}</div>
    </div>
  );
};
