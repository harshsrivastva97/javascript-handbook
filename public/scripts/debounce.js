function debounce(fn, t) {
  let id = null;
  return (...args) => {
    clearTimeout(id);
    id = setTimeout(() => {
      fn(...args);
    }, t);
  };
}

// Tester Function
function testDebounce() {
  const log = (...args) =>
    console.log("Debounced function executed with args:", ...args);

  const debouncedLog = debounce(log, 1000);

  console.log("Calling debouncedLog multiple times...");

  // Call debouncedLog with a delay between calls
  debouncedLog(1); // This call will be debounced
  setTimeout(() => debouncedLog(2), 500); // This call will replace the previous one
  setTimeout(() => debouncedLog(3), 1200); // This call will execute after the delay
  setTimeout(() => debouncedLog(4), 2000); // This call will execute after the delay
}

testDebounce();
