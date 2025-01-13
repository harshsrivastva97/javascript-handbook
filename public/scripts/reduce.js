const arr = [1, 2, 3, 4];

Array.prototype.myReduce = function (fn, initialValue) {
  let result = initialValue === undefined ? 1 : 0;
  for (let el of this) {
    result = fn(result, el);
  }
  return result;
};

// Test the custom reduce function
const sum = arr.myReduce((acc, curr) => acc + curr, 0);
console.log(sum);
