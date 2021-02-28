const isValidSlug = (val) => {
    if (!typeof val === 'string' || val.length && val.length < 4) {
        return false
    }
    const regex = /[^a-zA-Z0-9_-]/g
    return !regex.test(val)
}

module.exports = {isValidSlug}