function debounce(fn, t) {
  let id = null;
  return (...args) => {
    clearTimeout(id);
    id = setTimeout(() => {
      fn(...args);
    }, t);
  };
}

// Test the debounce function
const debounced = debounce(console.log, 150);
const now = Date.now()
debounced("log 1 at", Date.now() - now); // cancelled.
debounced("log 2 at", Date.now() - now); // cancelled.
setTimeout(() => debounced("log 3 at", Date.now() - now), 149); // cancelled.
setTimeout(() => debounced("log 4 at", Date.now() - now), 151); // logged at t=153 ms.
setTimeout(() => debounced("log 5 at", Date.now() - now), 350); // cancelled.
setTimeout(() => debounced("log 6 at", Date.now() - now), 350); // logged at t=350 ms.
