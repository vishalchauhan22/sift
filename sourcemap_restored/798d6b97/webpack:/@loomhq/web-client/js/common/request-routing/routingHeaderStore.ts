import create from 'zustand';

import { routingUtils } from '@loomhq/shared-utilities';
import { EntityLookupMetadata } from '@loomhq/shared-utilities/constants/siteEntities';

interface RoutingHeaderState {
  entityRoutingHeader: string | undefined;
  setEntityRoutingHeader: (entityLookupMetadata: EntityLookupMetadata) => void;
  clearEntityRoutingHeader: () => void;
}

export const useRoutingHeaderStore = create<RoutingHeaderState>(set => ({
  entityRoutingHeader: undefined,
  setEntityRoutingHeader: entityLookupMetadata =>
    set({
      entityRoutingHeader:
        routingUtils.encodeEntityRoutingMetadata(entityLookupMetadata),
    }),
  clearEntityRoutingHeader: () => set({ entityRoutingHeader: undefined }),
}));
