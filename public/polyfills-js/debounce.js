const input = document.getElementById('inputField')
const textField = document.getElementById('debounce_text')

function debounce(fn, t) {
    let id = null
    return (...args) => {
        clearTimeout(id)
        id = setTimeout(() => {
            fn(...args)
        }, t)
    }
}

input.addEventListener('input', e => {
    onInputChange(e.target.value)
})

let count = 0;
function print(text) {
    textField.innerText = text
    console.log(count++, text)
}

const onInputChange = debounce(print, 300)