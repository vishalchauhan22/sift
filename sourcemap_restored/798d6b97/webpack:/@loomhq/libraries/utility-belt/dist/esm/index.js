var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

// src/retry.ts
var delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function calculateExponentialBackoff({
  currentTry,
  backoffExponent = 2,
  maxRetryTimeoutMs = 3e4,
  // 30 second default
  baseWaitSeconds = 2
}) {
  const backoffTimeoutMs = (Math.pow(currentTry, backoffExponent) - Math.pow(currentTry, 1.9) + baseWaitSeconds) * 1e3;
  return Math.floor(Math.min(backoffTimeoutMs, maxRetryTimeoutMs));
}
var retry = async (options, provisionedAttempts, advanced) => {
  provisionedAttempts = provisionedAttempts || options.remainingAttempts;
  const { fn, shouldRetry, remainingAttempts } = options;
  let backoffExponent;
  let maxRetryTimeoutMs;
  let baseWaitSeconds;
  let logger;
  let logPrefix = "retryFn";
  if (advanced) {
    backoffExponent = advanced.backoffExponent;
    maxRetryTimeoutMs = advanced.maxRetryTimeoutMs;
    baseWaitSeconds = advanced.baseWaitSeconds;
    logger = advanced.logger;
    logPrefix = advanced.logPrefix;
  }
  const result = await fn();
  const currentTry = provisionedAttempts - remainingAttempts + 1;
  if (shouldRetry(result) && remainingAttempts > 1) {
    const waitTimeoutMs = calculateExponentialBackoff({
      currentTry,
      backoffExponent,
      maxRetryTimeoutMs,
      baseWaitSeconds
    });
    if (logger) {
      logger.warn(
        "".concat(logPrefix, ": Waiting ").concat(waitTimeoutMs, "ms before continuing. currentTry: ").concat(currentTry, " maxTries: ").concat(provisionedAttempts)
      );
    }
    await delay(waitTimeoutMs);
    return retry(
      __spreadProps(__spreadValues({}, options), {
        remainingAttempts: remainingAttempts - 1
      }),
      provisionedAttempts,
      advanced
    );
  } else if (shouldRetry(result) && logger) {
    logger.error(
      "retry failed. attempt #".concat(currentTry, "/").concat(provisionedAttempts, "; ").concat(provisionedAttempts - currentTry, " left. will abort")
    );
  }
  return {
    hadSuccess: shouldRetry(result) === false,
    result
  };
};

// src/scrub.ts
var scrub = (key, obj) => {
  const isArray = obj instanceof Array;
  const isObject = typeof obj === "object";
  if (!isArray && !isObject) {
    return obj;
  }
  const objectCopy = Object.assign(obj);
  if (isArray) {
    for (let i = 0; i < objectCopy.length; i++) {
      objectCopy[i] = scrub(key, objectCopy[i]);
    }
  } else if (isObject) {
    const keys = Object.keys(objectCopy);
    keys.forEach((k) => {
      if (k === key) {
        delete objectCopy[key];
      } else if (objectCopy[k] != null) {
        objectCopy[k] = scrub(key, objectCopy[k]);
      }
    });
  }
  return objectCopy;
};

// src/error.ts
var isError = (input) => {
  return input instanceof Error || "stack" in input && "message" in input;
};
var syncErrorBoundary = (fn) => {
  try {
    return fn();
  } catch (error) {
    if (error instanceof Error) {
      return error;
    }
    if (typeof error === "string") {
      return new Error(error);
    }
    return new Error("error with an invalid type encountered");
  }
};
var errorBoundary = async (fn) => {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof Error) {
      return error;
    }
    if (typeof error === "string") {
      return new Error(error);
    }
    return new Error("error with an invalid type encountered");
  }
};

// src/throttle.ts
function throttle(fn, waitms = 500) {
  let waiting = false;
  let lastReturn;
  return (...args) => {
    if (waiting) {
      return lastReturn;
    }
    waiting = true;
    setTimeout(() => {
      waiting = false;
    }, waitms);
    lastReturn = fn(...args);
    return lastReturn;
  };
}

// src/domains.ts
import isDomainNameValid from "is-valid-domain";
import isHostnameValid from "is-valid-hostname";
import wildcardMatch from "wildcard-match";
var isValidRecord = (record) => isDomainNameValid(record, {
  wildcard: true,
  subdomain: true,
  allowUnicode: true
}) || isHostnameValid(record);
var domainHasRecordMatch = (domainRecordList, domainName) => {
  if (isValidRecord(domainName) === false) {
    return [false, "origin is not a valid domain"];
  }
  const validDomains = domainRecordList.filter((domain) => {
    return isValidRecord(domain);
  });
  const matchMethods = validDomains.map((domain) => wildcardMatch(domain));
  const possibleMatch = matchMethods.find((isMatch) => isMatch(domainName));
  return possibleMatch == null ? [false, "origin does not match any accepted domains"] : [true, "success"];
};

// src/testUtils.ts
var MockLogger = class {
  constructor() {
    this.args = [];
    this.method = [];
    this.debug = (message, _context, _tags) => {
      this.args.push(message);
      this.method.push("debug");
    };
    this.info = (message, _context, _tags) => {
      this.args.push(message);
      this.method.push("info");
    };
    this.warn = (message, _context, _tags) => {
      this.args.push(message);
      this.method.push("warn");
    };
    this.error = (message, _context, _tags) => {
      this.args.push(message);
      this.method.push("error");
    };
    this.fatal = (message, _context, _tags) => {
      this.args.push(message);
      this.method.push("fatal");
    };
  }
  crumb() {
    return;
  }
  recordFail() {
    return;
  }
  verbose(message, _context, _tags) {
    this.args.push(message);
    this.method.push("verbose");
  }
  teardown() {
    return Promise.resolve();
  }
  addToBaseContext(_newContext) {
    return;
  }
  getLoggerWithRunId(_runId) {
    return {};
  }
};

// src/poll.ts
var PollTimeoutError = class extends Error {
};
function poll(fn, opts = {}) {
  const { intervalMs = 20, timeoutMs = 1e3 } = opts;
  const startTime = Date.now();
  return new Promise((resolve, reject) => {
    const intTimer = setInterval(() => {
      try {
        if (fn()) {
          clearInterval(intTimer);
          resolve();
        } else if (Date.now() - startTime > timeoutMs) {
          clearInterval(intTimer);
          reject(new PollTimeoutError("Polling timeout hit"));
        }
      } catch (e) {
        clearInterval(intTimer);
        reject(e);
      }
    }, intervalMs);
  });
}
export {
  MockLogger,
  PollTimeoutError,
  calculateExponentialBackoff,
  delay,
  domainHasRecordMatch,
  errorBoundary,
  isDomainNameValid,
  isError,
  isValidRecord,
  poll,
  retry,
  scrub,
  syncErrorBoundary,
  throttle
};
//# sourceMappingURL=index.js.map
