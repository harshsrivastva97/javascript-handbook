// POLYFILL: Function.prototype.call
Function.prototype.myCall = function(context, ...params) {
    context.func = this
    const result = context.func(...params)
    delete context.func
    return result
}

// TEST
const john = { name: 'John' }
const thomas = { name: 'Thomas' }
function print(msg, x) {
    console.log(`${msg} ${x} ${this.name}`)
}
print.myCall(thomas, 'Hello', 'Hi')