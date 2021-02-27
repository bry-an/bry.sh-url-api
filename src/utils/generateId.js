const SHA1 = require("crypto-js/sha1");

const generateSha = (message) => {
    const sha = SHA1(message).toString()
    return sha.slice(0, 4)
}

module.exports = {generateSha}