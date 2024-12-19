const arr = [1, 2, 3, 4];

Array.prototype.myReduce = function (fn, initialValue) {
  let result = initialValue ?? this[0];
  for (let el of this) {
    result = fn(result, el);
  }
  return result;
};

// Tester Function
const sum = arr.myReduce((acc, curr) => acc + curr, 0);
console.log(sum);
