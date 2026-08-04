import noop from 'lodash/noop';
import {
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

// The default amount to move when using the arrow keys
const DEFAULT_KEYBOARD_MOVE_INCREMENT_PX = 10;

// The amount to multiply the keyboardMoveIncrementPx by when using angle brackets
const ANGLE_BRACKET_MULTIPLIER = 0.1;

// The amount to multiple the keyboardMoveIncrementPx by when using shift + arrow keys
const SHIFT_ARROW_MULTIPLIER = 5;

// eslint-disable-next-line @loomhq/loom/no-important
const addGlobalCursorStyleForDragging = (cursor: string) => {
  // Because of the way cursors are handled in the browser, just setting a cursor property
  // with !important on the document is not sufficient. We need to create a style element
  // that will apply the cursor property when the 'dragging' class is applied to every element
  const style = document.createElement('style');

  style.innerHTML = `
    html.dragging * {
      cursor: ${cursor} !important;
    }
  `;
  document.head.appendChild(style);

  return style;
};

export type DragStartArgs<T extends HTMLElement | SVGElement> = {
  mouseX: number;
  mouseY: number;
  event: React.MouseEvent<T, MouseEvent>;
};

export type DragMoveArgs = {
  deltaX: number;
  deltaY: number;
  mouseX: number;
  mouseY: number;
  event: MouseEvent;
};

export type DragEndArgs = {
  mouseX: number;
  mouseY: number;
  event: MouseEvent;
};

export type KeyboardMoveArgs = {
  deltaX: number;
  deltaY: number;
};

type UseKeyboardFocusableDragHandlerArgs<T extends HTMLElement | SVGElement> = {
  onDragMove: (args: DragMoveArgs) => void;
  onKeyboardMove: (args: KeyboardMoveArgs) => void;
  cursorDuringDrag: string;

  shouldFocusOnDragStart?: boolean;
  keyboardMoveIncrementPx?: number;
  onDragStart?: (args: DragStartArgs<T>) => void;
  onDragEnd?: (args: DragEndArgs) => void;
  onClickWithoutDrag?: () => void;
};

type UseKeyboardFocusableDragHandlerReturn<T extends HTMLElement | SVGElement> =
  {
    draggableProps: {
      ref: RefObject<T>;
      onKeyDown: (event: React.KeyboardEvent<T>) => void;
      onMouseDown: (event: React.MouseEvent<T, MouseEvent>) => void;
      tabIndex: number;
      role: 'button';
      'aria-grabbed': boolean;
      'aria-dropeffect': 'move';
    };
    isDragging: boolean;
  };

export const useKeyboardFocusableDragHandler = <
  T extends HTMLElement | SVGElement,
>({
  onDragMove,
  onKeyboardMove,
  cursorDuringDrag,

  shouldFocusOnDragStart = true,
  keyboardMoveIncrementPx = DEFAULT_KEYBOARD_MOVE_INCREMENT_PX,
  onDragStart = noop,
  onDragEnd = noop,
  onClickWithoutDrag = noop,
}: UseKeyboardFocusableDragHandlerArgs<T>): UseKeyboardFocusableDragHandlerReturn<T> => {
  const ref = useRef<T>(null);
  const dragStartMousePosition = useRef<{ x: number; y: number } | null>(null);

  const [isDragging, setIsDragging] = useState(false);

  const [styleElement, setStyleElement] = useState<HTMLStyleElement | null>(
    null
  );

  const onMouseDown = useCallback(
    (event: React.MouseEvent<T, MouseEvent>) => {
      event.stopPropagation();

      // Set the initial mouse position, it will be used when calculating deltas on mouse move
      dragStartMousePosition.current = { x: event.clientX, y: event.clientY };
      setIsDragging(true);

      // Emit the drag start event for consumers
      onDragStart({ event, mouseX: event.clientX, mouseY: event.clientY });

      // If there is a custom cursor during drag, add the global style element
      // and then add the 'dragging' class to the document element to force the dragging
      // cursor to be applied until the drag is completed
      if (cursorDuringDrag) {
        if (!styleElement) {
          // Add the global style element, that will apply the cursor property when the 'dragging' class is applied
          const style = addGlobalCursorStyleForDragging(cursorDuringDrag);

          setStyleElement(style);
        }

        // Add the `dragging` class to the document element to apply the cursor
        document.documentElement.classList.add('dragging');
      }

      if (!shouldFocusOnDragStart) {
        event.preventDefault();
      }
    },
    [onDragStart, cursorDuringDrag, shouldFocusOnDragStart, styleElement]
  );

  const onMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!isDragging || !dragStartMousePosition.current) {
        return;
      }

      // Calculate the deltas between the current mouse position and the initial mouse position
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      const deltaX = mouseX - dragStartMousePosition.current.x;
      const deltaY = mouseY - dragStartMousePosition.current.y;

      // Emit the drag move event for consumers
      onDragMove({
        event,
        mouseX,
        mouseY,
        deltaX,
        deltaY,
      });
    },
    [isDragging, onDragMove]
  );

  const onMouseUp = useCallback(
    (event: MouseEvent) => {
      if (!isDragging || !dragStartMousePosition.current) {
        return;
      }

      // Calculate the deltas between the current mouse position and the initial mouse position
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      const deltaX = mouseX - dragStartMousePosition.current.x;
      const deltaY = mouseY - dragStartMousePosition.current.y;

      // Fire a click without drag event if the mouse hasn't moved
      if (deltaX === 0 && deltaY === 0) {
        onClickWithoutDrag();
      }

      // Clear the initial drag start mouse position
      dragStartMousePosition.current = null;
      setIsDragging(false);

      // Emit the drag end event for consumers
      onDragEnd({ event, mouseX, mouseY });

      // Remove the 'dragging' class from the document
      document.documentElement.classList.remove('dragging');

      if (styleElement) {
        // Remove the global style element
        document.head.removeChild(styleElement);
        setStyleElement(null);
      }
    },
    [isDragging, onClickWithoutDrag, onDragEnd, styleElement]
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<T>) => {
      if (!ref.current) {
        return;
      }

      let deltaX = 0;
      let deltaY = 0;

      switch (event.key) {
        // Non movement handlers
        case 'Enter':
          onClickWithoutDrag();
          return;
        case 'Escape':
          ref.current.blur();
          return;

        // Movement handlers
        case 'ArrowLeft':
          deltaX = -keyboardMoveIncrementPx;
          if (event.shiftKey) {
            deltaX *= SHIFT_ARROW_MULTIPLIER;
          }
          break;
        case 'ArrowRight':
          deltaX = keyboardMoveIncrementPx;
          if (event.shiftKey) {
            deltaX *= SHIFT_ARROW_MULTIPLIER;
          }
          break;
        case 'ArrowUp':
          deltaY = -keyboardMoveIncrementPx;
          if (event.shiftKey) {
            deltaY *= SHIFT_ARROW_MULTIPLIER;
          }
          break;
        case 'ArrowDown':
          deltaY = keyboardMoveIncrementPx;
          if (event.shiftKey) {
            deltaY *= SHIFT_ARROW_MULTIPLIER;
          }
          break;
        case ',':
          deltaX = -keyboardMoveIncrementPx * ANGLE_BRACKET_MULTIPLIER;
          break;
        case '.':
          deltaX = keyboardMoveIncrementPx * ANGLE_BRACKET_MULTIPLIER;
          break;

        default:
          return;
      }

      event.stopPropagation();
      event.preventDefault();
      onKeyboardMove({
        deltaX,
        deltaY,
      });
      ref.current.scrollIntoView();
    },
    [keyboardMoveIncrementPx, onClickWithoutDrag, onKeyboardMove]
  );

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    } else {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging, onMouseMove, onMouseUp]);

  // Package up the props for the consumer to spread on their drag handle
  const draggableProps = useMemo(
    () => ({
      ref,
      onKeyDown,
      onMouseDown,
      tabIndex: 0,
      role: 'button' as const,
      'aria-dropeffect': 'move' as const,
      'aria-grabbed': isDragging,
    }),
    [isDragging, onKeyDown, onMouseDown]
  );

  return {
    draggableProps,
    isDragging,
  };
};
