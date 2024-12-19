function throttle(fn, t) {
  let shouldWait = false;
  return (...args) => {
    if (shouldWait) return;
    fn(...args);
    shouldWait = true;
    setTimeout(() => {
      shouldWait = false;
    }, t);
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
