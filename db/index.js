const redis = require('redis')

const client = redis.createClient({
    host: '0.0.0.0',
    port: 6379,
});

client.on('error', err => {
    console.log('Error ' + err);
});

const set = (key, val) => {
    return new Promise((resolve, reject) => {
        client.set(key, val, (err, reply) => {
            if (err) reject(err)
            resolve(reply)
        });
    })
}

const get = (key) => {
    return new Promise((resolve, reject) => {
        client.get(key, (err, res) => {
        if (err) reject(err)
        resolve(res)
        })
    })
}

module.exports = {set, get}