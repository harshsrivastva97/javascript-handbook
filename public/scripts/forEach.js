const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

Array.prototype.myForEach = function (fn) {
  for (let el of this) {
    fn(el);
  }
};

// Tester Function
function consoleLog(x) {
  console.log(x);
}
arr.myForEach(consoleLog);
