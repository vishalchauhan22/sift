/* eslint-disable @loomhq/loom/no-js-extension */
const REDUX_ACTION = 'redux-action';

const sentryActionState = Sentry => {
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

    return next => action => {
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
