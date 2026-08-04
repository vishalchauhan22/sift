import { LOOM_VERSION } from '@js/constants/versions';

import AnalyticsWebClient, {
  productEmbedType,
  ProductInfoType,
} from '@atlassiansox/analytics-web-client';
import * as loggerx from '@js/utilities/loggerx';

import { Feature } from '@loomhq/shared-utilities/constants/product';

import { LOOM_EMBED_PAGE_REGEX } from '@loomhq/shared-utilities/utilities/validateUtils';

import { analyticsEnv } from './constants';

let analyticsClient: AnalyticsWebClient | null = null;
let isInitialized = false;

const getEmbedContext = (): ProductInfoType['embeddedContext'] => {
  const isEmbed = LOOM_EMBED_PAGE_REGEX.test(window.location.href);
  if (!isEmbed) {
    return undefined;
  }

  const productParam = new URLSearchParams(window.location.search).get(
    'product'
  );

  const referrerHost = document.referrer ? new URL(document.referrer).host : '';

  if (productParam) {
    // first party embed in Atlassian
    return {
      embeddedType: productEmbedType.FIRST_PARTY,
      embeddedFromProduct: productParam,
      embeddedFromTopLevelDomain: referrerHost,
    };
  }

  // Third party embed
  return {
    embeddedType: productEmbedType.THIRD_PARTY,
    embeddedFromTopLevelDomain: referrerHost,
  };
};

export const init = (): AnalyticsWebClient => {
  try {
    if (!analyticsClient) {
      const clientConfig: ProductInfoType = {
        env: analyticsEnv,
        product: 'loom',
        version: LOOM_VERSION,
        origin: 'web',
        platform: 'web',
        locale: 'en-US',
        embeddedContext: getEmbedContext(),
      };
      const clientOptions = {
        useLegacyUrl: true,
        logger: {
          debug: (message, context) => loggerx.debug(message, context),
          log: (message, context) => loggerx.info(message, context),
          warn: (message, context) => loggerx.warning(message, context),
          error: (exception, context) =>
            loggerx.error(exception, context, {
              feature: Feature.AtlassianAnalytics,
            }),
        },
      };

      analyticsClient = new AnalyticsWebClient(clientConfig, clientOptions);
      loggerx.info('[Atlassian Analytics] Client successfully initialized!', {
        feature: Feature.AtlassianAnalytics,
      });
      isInitialized = true;
    } else {
      if (!isInitialized) {
        loggerx.info('[Atlassian Analytics] Client already initialized.', {
          feature: Feature.AtlassianAnalytics,
        });
      }
    }
  } catch (error) {
    loggerx.error('Failed to initialize Atlassian Analytics client', error, {
      feature: Feature.AtlassianAnalytics,
    });
    throw error;
  }

  return analyticsClient;
};
