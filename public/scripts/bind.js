Function.prototype.myBind = function (context, ...params) {
  const self = this;
  return function () {
    context.func = self;
    const result = context.func(...params);
    delete context.func;
    return result;
  };
};

// Test the custom bind function
function print(msg, x) {
  console.log(`${msg} ${x} ${this.name}`);
}
const tom = { name: "Tom" };
const jerry = { name: "Jerry" };
const printThomas = print.myBind(tom, "good", "morning!");
printThomas();
