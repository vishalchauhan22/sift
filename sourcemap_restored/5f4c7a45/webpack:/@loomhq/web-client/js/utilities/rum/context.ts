import React from 'react';

import * as loggerX from '../loggerx';
import { RUMMark } from './types';

interface IRUMContext {
  markSuccess: (mark: RUMMark) => void;
  markError: (mark: RUMMark, error?: Error) => void;
}

function logRumSetupError(mark: RUMMark) {
  loggerX.debug('RUM Context not correctly setup', { mark });
}

const DEFAULT_RUM_CONTEXT: IRUMContext = {
  markSuccess: logRumSetupError,
  markError: logRumSetupError,
};

// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
export const RUMContext = React.createContext<IRUMContext>(DEFAULT_RUM_CONTEXT);
