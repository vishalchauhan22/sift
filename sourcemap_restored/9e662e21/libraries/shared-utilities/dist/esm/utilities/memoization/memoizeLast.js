import "../../chunk-BYZ2GIR3.js";
const NEVER_CALLED = Symbol("NeverCalled");
const memoizeLast = (sourceFunction) => {
  let lastArg = NEVER_CALLED;
  let lastResult;
  const memoizedFn = (arg) => {
    if (lastArg !== arg) {
      lastArg = arg;
      lastResult = sourceFunction(arg);
    }
    return lastResult;
  };
  memoizedFn.reset = () => {
    lastArg = NEVER_CALLED;
  };
  return memoizedFn;
};
export {
  memoizeLast
};
//# sourceMappingURL=memoizeLast.js.map
