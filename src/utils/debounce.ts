export const debounce = (
  callback: () => void,
  waitMs: number,
  maxWaitMs: number
): (() => void) => {
  let timeoutId = null;
  let firstRequestTimeMs = null;

  const executor = () => {
    timeoutId = null;
    callback();
  };

  return () => {
    const currentTimeMs = new Date().getTime();
    if (timeoutId == null) {
      firstRequestTimeMs = currentTimeMs;
    } else {
      window.clearTimeout(timeoutId);
      if (currentTimeMs - firstRequestTimeMs >= maxWaitMs) {
        executor();
        return;
      }
    }

    timeoutId = window.setTimeout(executor, waitMs);
  };
};
