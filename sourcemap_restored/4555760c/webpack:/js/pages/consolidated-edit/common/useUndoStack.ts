import isEqual from 'lodash/isEqual';
import { useMemo, useState, useCallback } from 'react';

import { useOnKeyDown } from './useOnKeyDown';

export type UndoStack<TEntry> = TEntry[];

export type UseUndoStackArgs<TEntry, TError> = {
  onUndo: (entry: TEntry) => void | Promise<void>;
  onRedo: (entry: TEntry) => void | Promise<void>;
  onUndoError?: (error: TError) => void;
  onRedoError?: (error: TError) => void;
};

export type UseUndoStackResult<TEntry> = {
  addEntryToUndoStack: (entry: TEntry) => void;
  resetUndoStack: () => void;
  canUndo: boolean;
  undo: () => void;
  canRedo: boolean;
  redo: () => void;
  undoStackSize: number;
};

export const useUndoStack = <TEntry, TError>({
  onUndo,
  onRedo,
  onUndoError,
  onRedoError,
}: UseUndoStackArgs<TEntry, TError>): UseUndoStackResult<TEntry> => {
  const [undoStack, setUndoStack] = useState<UndoStack<TEntry>>([]);
  const [undoStackCurrentIndex, setUndoStackCurrentIndex] = useState<
    number | null
  >(null);
  const [isProcessingAsyncEntry, setIsProcessingAsyncEntry] = useState(false);

  const canUndo = useMemo(
    () => undoStackCurrentIndex !== null && !isProcessingAsyncEntry,
    [isProcessingAsyncEntry, undoStackCurrentIndex]
  );
  const canRedo = useMemo(() => {
    const nextIndex =
      undoStackCurrentIndex === null ? 0 : undoStackCurrentIndex + 1;
    return (
      nextIndex >= 0 && nextIndex < undoStack.length && !isProcessingAsyncEntry
    );
  }, [undoStackCurrentIndex, undoStack.length, isProcessingAsyncEntry]);

  const addEntryToUndoStack = useCallback(
    (entry: TEntry) => {
      const lastEntry =
        undoStackCurrentIndex !== null
          ? undoStack[undoStackCurrentIndex]
          : null;
      if (isEqual(entry, lastEntry)) {
        return;
      }

      // If we're adding a new entry, but we're not at the top of the stack,
      // we need to remove all entries above the current one.
      const newUndoStack =
        undoStackCurrentIndex !== null
          ? undoStack.slice(0, undoStackCurrentIndex + 1)
          : [];

      // Add the new entry to the top of the stack
      newUndoStack.push(entry);

      // Update the undo stack and the current index
      setUndoStack(newUndoStack);
      setUndoStackCurrentIndex(newUndoStack.length - 1);
    },
    [undoStack, undoStackCurrentIndex]
  );

  const resetUndoStack = () => {
    setUndoStack([]);
    setUndoStackCurrentIndex(null);
  };

  const undo = useCallback(async () => {
    if (!canUndo || undoStackCurrentIndex === null) {
      return;
    }

    const result = onUndo(undoStack[undoStackCurrentIndex]);

    // If this is an async operation, we need to block further undo/redo while we process it
    if (result instanceof Promise) {
      setIsProcessingAsyncEntry(true);
      try {
        await result;
      } catch (error) {
        onUndoError?.(error);
      }
      setIsProcessingAsyncEntry(false);
    }

    const previousIndex =
      undoStackCurrentIndex - 1 >= 0 ? undoStackCurrentIndex - 1 : null;
    setUndoStackCurrentIndex(previousIndex);
  }, [canUndo, onUndoError, onUndo, undoStack, undoStackCurrentIndex]);

  const redo = useCallback(async () => {
    if (!canRedo) {
      return;
    }

    const nextIndex =
      undoStackCurrentIndex === null ? 0 : undoStackCurrentIndex + 1;

    const result = onRedo(undoStack[nextIndex]);

    // If this is an async operation, we need to block further undo/redo while we process it
    if (result instanceof Promise) {
      setIsProcessingAsyncEntry(true);
      try {
        await result;
      } catch (error) {
        onRedoError?.(error);
      }
      setIsProcessingAsyncEntry(false);
    }

    setUndoStackCurrentIndex(nextIndex);
  }, [canRedo, onRedo, onRedoError, undoStack, undoStackCurrentIndex]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.code === 'KeyZ' &&
        !event.shiftKey
      ) {
        event.preventDefault();
        event.stopPropagation();

        if (canUndo) {
          undo();
        }
      } else if (
        (event.metaKey || event.ctrlKey) &&
        event.code === 'KeyZ' &&
        event.shiftKey
      ) {
        event.preventDefault();
        event.stopPropagation();
        if (canRedo) {
          redo();
        }
      }
    },
    [canRedo, canUndo, redo, undo]
  );

  useOnKeyDown(onKeyDown);

  return {
    addEntryToUndoStack,
    resetUndoStack,
    undo,
    redo,
    canUndo,
    canRedo,
    undoStackSize: undoStack.length,
  };
};
