

/*eslint-disable*/
let info = (...params) => {
    if (process.env.NODE_ENV !== 'test')
        console.log(...params)
}

const error = (...params) => {
    if (process.env.NODE_ENV !== 'test')
        console.error(...params)
}
info = (...params) => (process.env.NODE_ENV === 'test') ? console.log(...params) : null

module.exports = {
    info, error
}