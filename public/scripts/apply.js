Function.prototype.myApply = function (context, params) {
  context.func = this;
  const result = context.func(...params);
  delete context.func;
  return result;
};

// Test the custom apply function
const tom = { name: "Tom" };
const jerry = { name: "Jerry" };
function print(msg, x) {
  console.log(`${msg} ${x} ${this.name}`);
}
print.myApply(tom, ["Hello", "Hi"]);
