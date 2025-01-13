/**
 * @param {Function} fn
 * @return {Function}
 */
var curry = function(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args)
        } else {
            return curried.bind(this, ...args)
        }
    }
};

// Test the curry function
const sum = (a, b) => a + b;
const curriedFunction = curry(sum);
console.log(curriedFunction(1)(2)) // 3

