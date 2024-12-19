Function.prototype.myBind = function (context, ...params) {
  const self = this;
  return function () {
    context.func = self;
    const result = context.func(...params);
    delete context.func;
    return result;
  };
};

// Tester Function
function print(msg, x) {
  console.log(`${msg} ${x} ${this.name}`);
}
const john = { name: "Don" };
const thomas = { name: "John" };
const printThomas = print.myBind(thomas, "good", "morning!");
printThomas();
