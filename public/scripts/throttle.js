/**
 * @param {Function} fn
 * @param {number} t
 * @return {Function}
 */
var throttle = function (fn, t) {
  let timeout = null
  let lastCalled = 0
  return function (...args) {
    const now = Date.now()
    const remaining = t - (now - lastCalled)
    if (remaining > 0) {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        fn.apply(this, args)
        lastCalled = Date.now()
      }, remaining)
    }
    else {
      fn.apply(this, args)
      lastCalled = now
    }
  }
};

// Test the throttle function
const throttled = throttle(console.log, 150);
const now = Date.now()
throttled("log 1 at", Date.now() - now); // logged immediately.
throttled("log 2 at", Date.now() - now); // cancelled
throttled("log 3 at", Date.now() - now); // cancelled
throttled("log 4 at", Date.now() - now); // logged at t=150ms.
setTimeout(() => throttled("log 5 at", Date.now() - now), 150); // cancelled because remaining time is 0ms.
setTimeout(() => throttled("log 6 at", Date.now() - now), 151); // logged at t=151+k ms.
setTimeout(() => throttled("log 7 at", Date.now() - now), 350); // cancelled because log 8 is triggered immediately.
setTimeout(() => throttled("log 8 at", Date.now() - now), 350); // logged at t=350+k ms.