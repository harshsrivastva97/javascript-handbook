const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

Array.prototype.myForEach = function (fn) {
  for (let el of this) {
    fn(el);
  }
};

// Test the custom forEach function
arr.myForEach(console.log);
