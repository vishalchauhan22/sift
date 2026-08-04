import {
  __spreadProps,
  __spreadValues
} from "./chunk-DDAAVRWG.js";

// src/browser/buildBrowserLogger.ts
import { loggingUtils } from "@loomhq/shared-utilities";

// src/browser/utils/isLogLevelAllowed.ts
var isLogLevelAllowed = (level, logLevels) => {
  return logLevels.split(",").includes(level);
};

// src/browser/buildBrowserLogger.ts
import { LogLevel } from "@loomhq/enums";
import { StatusType } from "@datadog/browser-logs";
var resolveRequiredTags = loggingUtils.resolveRequiredTags;
var buildBrowserLogger = (config) => {
  const debug = (message, context) => {
    if (isLogLevelAllowed(LogLevel.Debug, config.LOG_LEVELS)) {
      config.logOutput(StatusType.debug, message, context);
    }
  };
  const info = (message, context) => {
    if (isLogLevelAllowed(LogLevel.Info, config.LOG_LEVELS)) {
      config.logOutput(StatusType.info, message, context);
    }
  };
  const warn = (exception, context, tags) => {
    if (isLogLevelAllowed(LogLevel.Warning, config.LOG_LEVELS)) {
      tags = __spreadValues(__spreadValues({}, tags), tags ? resolveRequiredTags(tags) : {});
      const message = typeof exception === "string" ? exception : exception.message;
      config.logOutput(StatusType.warn, message, context, tags);
    }
  };
  const error = (exception, context, tags) => {
    if (isLogLevelAllowed(LogLevel.Error, config.LOG_LEVELS)) {
      tags = __spreadValues(__spreadValues({}, tags), tags ? resolveRequiredTags(tags) : {});
      const message = typeof exception === "string" ? exception : exception.message;
      config.logOutput(StatusType.error, message, context, tags);
      config.tracker.logError(exception, context, __spreadValues({ priority: "p1" }, tags));
    }
  };
  const fatal = (exception, context, tags) => {
    if (isLogLevelAllowed(LogLevel.Fatal, config.LOG_LEVELS)) {
      tags = __spreadValues(__spreadValues({}, tags), tags ? resolveRequiredTags(tags) : {});
      const message = typeof exception === "string" ? exception : exception.message;
      config.logOutput(StatusType.error, message, context, tags);
      config.tracker.logFatal(exception, context, __spreadValues({ priority: "p0" }, tags));
    }
  };
  return {
    fatal,
    error,
    errorMsg: (msg, context, tags) => {
      if (isLogLevelAllowed(LogLevel.Error, config.LOG_LEVELS)) {
        tags = __spreadValues(__spreadValues({}, tags), tags ? resolveRequiredTags(tags) : {});
        config.logOutput(StatusType.error, msg, context, tags);
        config.tracker.logError(new Error(msg), context, __spreadValues({
          priority: "p1"
        }, tags));
      }
    },
    warn,
    warnMsg: (msg, context, tags) => {
      if (isLogLevelAllowed(LogLevel.Warning, config.LOG_LEVELS)) {
        tags = __spreadValues(__spreadValues({}, tags), tags ? resolveRequiredTags(tags) : {});
        config.logOutput(StatusType.warn, msg, context, tags);
      }
    },
    warning: (exception, context, tags) => {
      if (isLogLevelAllowed(LogLevel.Warning, config.LOG_LEVELS)) {
        tags = __spreadValues(__spreadValues({}, tags), tags ? resolveRequiredTags(tags) : {});
        const message = typeof exception === "string" ? exception : exception.message;
        config.logOutput(StatusType.warn, message, context, tags);
      }
    },
    info,
    debug,
    addCrumb: ({
      message = "",
      context = {},
      additionalProps = {}
    }) => {
      config.tracker.addBreadcrumb(__spreadProps(__spreadValues({
        message,
        data: context
      }, additionalProps), {
        timestamp: Date.now()
      }));
    },
    captureCrumb: (categoryName, crumb) => {
      const [timestamp, details] = crumb;
      config.tracker.addBreadcrumb(__spreadValues({
        category: categoryName,
        timestamp: timestamp.getTime()
      }, details));
      const { message, level, context } = details;
      const friendly = () => [message, context];
      const serious = () => [new Error(message), context];
      const handlers = {
        [LogLevel.Debug]: [debug, friendly],
        [LogLevel.Info]: [info, friendly],
        [LogLevel.Warning]: [warn, serious],
        [LogLevel.Error]: [error, serious],
        [LogLevel.Fatal]: [fatal, serious]
      };
      const [fn, argsFn] = handlers[level];
      fn(...argsFn());
    }
  };
};

export {
  buildBrowserLogger
};
//# sourceMappingURL=chunk-YG6DATEB.js.map
