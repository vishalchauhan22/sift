import { init as initAtlassianAnalytics } from '@js/common/analytics';
import { init as initRum } from '@js/utilities/rum';

import { init as initSentry } from '@js/utilities/sentry';

initSentry();

initRum();

initAtlassianAnalytics();
