import "../chunk-BYZ2GIR3.js";
const shouldShowTrigger = (triggers = {}, triggerName = null) => {
  return triggers[triggerName] && triggers[triggerName].show && !triggers[triggerName].complete;
};
const isTriggerComplete = (triggers = {}, triggerName = null) => {
  return triggers[triggerName] && triggers[triggerName].complete;
};
const getTriggerDefaults = () => ({
  complete: false,
  show: false
});
const getActivatedTrigger = () => ({
  complete: false,
  show: true
});
const getCompletedTrigger = () => ({
  complete: true,
  show: false
});
export {
  getActivatedTrigger,
  getCompletedTrigger,
  getTriggerDefaults,
  isTriggerComplete,
  shouldShowTrigger
};
//# sourceMappingURL=triggersUtils.js.map
