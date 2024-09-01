// POLYFILL: Function.prototype.apply
Function.prototype.myApply = function(context, params) {
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
print.myApply(john, ['Hello', 'Hi'])