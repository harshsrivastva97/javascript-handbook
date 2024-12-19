const arr = [1, 2, 3, 4];

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
