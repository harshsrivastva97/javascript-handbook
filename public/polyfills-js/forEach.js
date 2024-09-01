const arr = [1, 2, 3, 4]

// POLYFILL: Array.prototype.forEach
Array.prototype.myForEach = function(fn) {
    for (let el of this) {
        fn(el)
    }
}

// TEST
function consoleLog(x) {
    console.log(x)
}
console.log('result : polyfill :: Array.prototype.forEach: ')
arr.myForEach(consoleLog)