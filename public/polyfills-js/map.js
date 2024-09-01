const arr = [1, 2, 3, 4]

// POLYFILL: Array.prototype.map
Array.prototype.myMap = function(fn) {
    const temp = []
    for (let el of this) {
        el = fn(el)
        temp.push(el)
    }
    return temp;
}

// TEST
const newArr = arr.myMap(el => el*el)
console.log('result : polyfill :: Array.prototype.map: ', newArr)