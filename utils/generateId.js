const { nanoid } = require('nanoid')

const generate = (length) => {
    return nanoid(length)
}

module.exports = {generate}