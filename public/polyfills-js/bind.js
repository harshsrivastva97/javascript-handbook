// POLYFILL: Function.prototype.bind
Function.prototype.myBind = function(context, ...params) {
    const self = this
    return function() {
        context.func = self
        const result = context.func(...params)
        delete context.func
        return result
    }
}

// TEST
function print(msg, x) {
    console.log(`${msg} ${x} ${this.name}`)
}
const john = { name: 'John' }
const thomas = { name: 'Thomas' }
const printThomas = print.myBind(thomas, 'good', 'morning!')
printThomas()