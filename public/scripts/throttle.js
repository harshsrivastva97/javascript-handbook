function throttle(fn, t) {
  let lastCalled = 0;
  let timeout = null;

  return function (...args) {
    const now = Date.now();
    const remaining = t - (now - lastCalled);

    clearTimeout(timeout);

    if (remaining > 0) {
      timeout = setTimeout(() => {
        lastCalled = Date.now();
        fn(...args);
      }, remaining);
    } else {
      lastCalled = now;
      fn(...args);
    }
  };
}

// Tester Function
function testThrottle() {
  const log = (...args) =>
    console.log("Throttled function executed with args:", ...args);

  const throttledLog = throttle(log, 1000);

  console.log("Calling throttledLog multiple times...");

  // Simulating rapid calls
  throttledLog(1); // Should execute immediately
  throttledLog(2); // Ignored
  setTimeout(() => throttledLog(3), 500); // Ignored
  setTimeout(() => throttledLog(4), 1000); // Should execute after 1 second
  setTimeout(() => throttledLog(5), 1500); // Ignored
  setTimeout(() => throttledLog(6), 2500); // Should execute after 2.5 seconds
}
testThrottle();
