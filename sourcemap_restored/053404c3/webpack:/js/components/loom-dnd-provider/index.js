/* eslint-disable @loomhq/loom/no-js-extension */
import React, { useRef } from 'react';
import { DndProvider, createDndContext } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
const RNDContext = createDndContext(HTML5Backend);

// the following implementation comes from this github issue comment:
// https://github.com/react-dnd/react-dnd/issues/186#issuecomment-635699417
// this is to fix the "Cannot have two HTML5 backends at the same time"
// error that happens otherwise when webpack hot reloads the page
const LoomDndProvider = ({ children }) => {
  const manager = useRef(RNDContext);

  return (
    <DndProvider manager={manager.current.dragDropManager}>
      {children}
    </DndProvider>
  );
};

// eslint-disable-next-line import/no-default-export
export default LoomDndProvider;
