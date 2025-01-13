const arr = [1, 2, 3, 4];

Array.prototype.myMap = function (fn) {
  const temp = [];
  for (let el of this) {
    el = fn(el);
    temp.push(el);
  }
  return temp;
};

// Test the custom map function
const newArr = arr.myMap((el) => el * el);
console.log(newArr);
