Function.prototype.myCall = function (context, ...params) {
  context.func = this;
  const result = context.func(...params);
  delete context.func;
  return result;
};

// Test the custom call function
const tom = { name: "Tom" };
const jerry = { name: "Jerry" };
function print(msg, x) {
  console.log(`${msg} ${x} ${this.name}`);
}
print.myCall(tom, "Hello", "Hi");
