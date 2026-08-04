const REDUX_ACTION = 'redux-action';

type Action = { type: unknown };
type Next = (action: Action) => unknown;
type Scope = {
  addEventProcessor: (
    callback: (event: { extra: Record<string, unknown> }) => unknown
  ) => void;
};

const sentryActionState = (Sentry: {
  configureScope: (callback: (scope: Scope) => void) => void;
  addBreadcrumb: (breadcrumb: { message: unknown; category: string }) => void;
}) => {
  return () => {
    let previousAction;

    Sentry.configureScope(scope => {
      scope.addEventProcessor(event => {
        event.extra = {
          ...event.extra,
          previousAction,
        };

        // Add anything to the event here
        // returning null will drop the event
        return event;
      });
    });

    return (next: Next) =>
      (action: Action): unknown => {
        Sentry.addBreadcrumb({
          message: action.type,
          category: REDUX_ACTION,
          // FIXME: Add back the relevant parts of the state
          // check git history to get `removeSensitiveState` back,
          // this file was named raven.js
          // data: removeSensitiveState(store.getState()),
        });

        previousAction = action;

        return next(action);
      };
  };
};

// eslint-disable-next-line import/no-default-export
export default sentryActionState;
