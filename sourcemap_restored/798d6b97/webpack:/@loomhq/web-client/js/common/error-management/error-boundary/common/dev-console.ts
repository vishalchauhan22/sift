import { ErrorInfo } from 'react';

import { getOrCreateNamespace } from '@js/utilities/dev-console';

type ComponentDidCatch = (error: Error, errorInfo: ErrorInfo) => void;

interface ErrorBoundaryDevConsole {
  [name: string]: {
    name: string;
    componentDidCatch: ComponentDidCatch;
  };
}

const NAMESPACE = 'errorBoundaries';

function getNamespace(): ErrorBoundaryDevConsole {
  return getOrCreateNamespace<ErrorBoundaryDevConsole>(NAMESPACE);
}

export function registerErrorBoundary(
  name: string,
  componentDidCatch: ComponentDidCatch
): void {
  getNamespace()[name] = { name, componentDidCatch };
}

export function unregisterErrorBoundary(name: string): void {
  delete getNamespace()[name];
}
