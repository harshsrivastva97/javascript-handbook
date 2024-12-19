const arr = [1, 20, 3, 40];

Array.prototype.myFilter = function (fn) {
  const temp = [];
  for (let el of this) {
    if (fn(el)) {
      temp.push(el);
    }
  }
  return temp;
};

const filtered = arr.myFilter((el) => el > 10);
console.log(filtered);
