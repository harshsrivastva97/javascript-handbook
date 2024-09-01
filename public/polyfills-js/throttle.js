const inputField = document.getElementById('inputField')
const textField = document.getElementById('throttle_text')

function throttle(fn, t) {
    let shouldWait = false
    return (...args) => {
        if (shouldWait) return
        fn(...args)
        shouldWait = true
        setTimeout(() => {
            shouldWait = false
        }, t)
    }
}

let count = 0
function print(text) {
    textField.innerText = text
    console.log(count++, text)
}

const onInputChange = throttle(print, 1000)

inputField.addEventListener('input', e => {
    onInputChange(e.target.value)
})