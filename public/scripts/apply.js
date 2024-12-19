Function.prototype.myApply = function (context, params) {
  context.func = this;
  const result = context.func(...params);
  delete context.func;
  return result;
};

// Tester Function
const john = { name: "Don" };
const thomas = { name: "John" };
function print(msg, x) {
  console.log(`${msg} ${x} ${this.name}`);
}
print.myApply(john, ["Hello", "Hi"]);
