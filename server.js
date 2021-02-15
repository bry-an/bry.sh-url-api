const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const app = express()
const {generateSha} = require('./utils/generateId.js')
require('dotenv').config()
const {get, set} = require('./db/index.js')

app.use(helmet())
app.use(morgan('tiny'))

app.get('/', (req, res) => {
	res.send('API HEALTHY')
})
app.get('/:message', async (req, res) => {
	const {message} = req.params
	const sha = generateSha(message)
	console.log('generated', sha, message)
	const dbResponse = await set(sha, message)
	res.json({response: dbResponse})
})

app.get('/lookup/:hash', async (req, res) => {
	const {hash } = req.params
	const dbReponse = await get(hash)
	res.json({'Your slug is': dbReponse })
})

module.exports = { app }


