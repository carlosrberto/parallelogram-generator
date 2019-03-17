/* eslint-disable import/prefer-default-export */
export const throttle = (fn, limit) => {
  let lastFn;
  let lastRan;
  return function newFn(...args) {
    const context = this;
    if (!lastRan) {
      fn.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(() => {
        if ((Date.now() - lastRan) >= limit) {
          fn.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};
