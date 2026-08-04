import {
  __spreadValues
} from "../../chunk-BYZ2GIR3.js";
import { getTeamFromFeatureName } from "../../constants/product";
const generateRandomTraceId = () => {
  const digits = "0123456789abcdef";
  let n = "";
  for (let i = 0; i < 16; i += 1) {
    const rand = Math.floor(Math.random() * 16);
    n += digits[rand];
  }
  return n;
};
const generateTaskId = () => {
  const epochSeconds = Math.floor(Date.now() / 1e3).toString(16);
  const remainingBits = generateRandomTraceId().slice(8) + generateRandomTraceId();
  return epochSeconds + remainingBits;
};
const sendStartEvent = ({
  task,
  source,
  feature,
  identifiers,
  sendGasEvent,
  sendLog,
  sendIncrementMetric
}) => {
  const taskId = generateTaskId();
  const team = getTeamFromFeatureName(feature).name;
  const payload = {
    action: "taskStart",
    actionSubject: "ui",
    source,
    attributes: __spreadValues({
      task,
      taskId
    }, identifiers)
  };
  const metricName = "taskmetrics.".concat(payload.action);
  sendGasEvent({ payload });
  sendLog({
    message: metricName,
    tags: __spreadValues({
      task,
      action: "taskStart",
      feature,
      team,
      taskId
    }, identifiers)
  });
  sendIncrementMetric({
    metricName,
    tags: {
      source,
      task,
      feature,
      team
    }
  });
  return taskId;
};
const sendSuccessEvent = ({
  task,
  source,
  feature,
  taskId,
  durationMs,
  identifiers,
  sendGasEvent,
  sendLog,
  sendDistributionMetric
}) => {
  const team = getTeamFromFeatureName(feature).name;
  const payload = {
    action: "taskSuccess",
    actionSubject: "ui",
    source,
    attributes: __spreadValues({
      task,
      taskId,
      durationMs
    }, identifiers)
  };
  const metricName = "taskmetrics.".concat(payload.action);
  sendGasEvent({ payload });
  sendLog({
    message: metricName,
    tags: __spreadValues({
      task,
      action: "taskSuccess",
      feature,
      team,
      taskId,
      durationMs
    }, identifiers)
  });
  sendDistributionMetric({
    metricName,
    durationMs,
    tags: {
      source,
      task,
      feature,
      team
    }
  });
};
const sendFailEvent = ({
  task,
  source,
  feature,
  taskId,
  durationMs,
  failureReason,
  identifiers,
  sendGasEvent,
  sendLog,
  sendDistributionMetric
}) => {
  const team = getTeamFromFeatureName(feature).name;
  const payload = {
    action: "taskFail",
    actionSubject: "ui",
    source,
    attributes: __spreadValues({
      task,
      taskId,
      durationMs,
      failureReason
    }, identifiers)
  };
  const metricName = "taskmetrics.".concat(payload.action);
  sendGasEvent({ payload });
  sendLog({
    message: metricName,
    tags: __spreadValues({
      task,
      action: "taskFail",
      feature,
      team,
      taskId,
      durationMs,
      failureReason
    }, identifiers)
  });
  sendDistributionMetric({
    metricName,
    durationMs,
    tags: {
      source,
      task,
      feature,
      team,
      failureReason
    }
  });
};
const sendAbortEvent = ({
  task,
  source,
  feature,
  taskId,
  durationMs,
  identifiers,
  sendGasEvent,
  sendLog,
  sendDistributionMetric
}) => {
  const team = getTeamFromFeatureName(feature).name;
  const payload = {
    action: "taskAbort",
    actionSubject: "ui",
    source,
    attributes: __spreadValues({
      task,
      taskId,
      durationMs
    }, identifiers)
  };
  const metricName = "taskmetrics.".concat(payload.action);
  sendGasEvent({ payload });
  sendLog({
    message: metricName,
    tags: __spreadValues({
      task,
      action: "taskAbort",
      feature,
      team,
      taskId,
      durationMs
    }, identifiers)
  });
  sendDistributionMetric({
    metricName,
    durationMs,
    tags: {
      source,
      task,
      feature,
      team
    }
  });
};
export {
  generateRandomTraceId,
  generateTaskId,
  sendAbortEvent,
  sendFailEvent,
  sendStartEvent,
  sendSuccessEvent
};
//# sourceMappingURL=send-task-metrics.js.map
