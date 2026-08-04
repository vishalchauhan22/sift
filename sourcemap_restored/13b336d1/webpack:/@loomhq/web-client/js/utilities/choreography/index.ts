import { choreographerFactory, ProductIds } from '@atlassian/ipm-choreographer';
import { analyticsEnv } from '@js/common/analytics/atlassian-analytics/constants';

const { withChoreographedRender } = choreographerFactory(
  ProductIds.LOOM,
  analyticsEnv
);

export { withChoreographedRender };
