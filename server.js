const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const app = express()
const bodyParser = require('body-parser')
const {generateSha} = require('./utils/generateId.js')
require('dotenv').config()
const {get, set} = require('./db/index.js')

app.use(helmet())
app.use(morgan('tiny'))
app.use(bodyParser.json())

app.get('/', (req, res) => {
	res.send('API HEALTHY')
})
app.get('/hash-lookup/:hash', async (req, res) => {
	const {hash} = req.params
	console.log('has', hash)
	const dbResponse = await get(hash)
	console.log('dbres', dbResponse)
	if (dbResponse) {
		return res.redirect(`http://${dbResponse}`)
	} else {
		res.status(500).json({message: 'Not found'})
	}
})

app.post('/add', async (req, res) => {
	const {url} = req.body
	const sha = generateSha(url)
	const dbResponse = await get(sha)
	if (dbResponse) {
		res.json({alreadyExists: true, hash: sha, url})
	} else {
		const dbResponse = await set(sha, url)
		if (dbResponse === 'OK') {
			res.json({alreadyExists: false, hash: sha, url})
		} else res.status(500).json({error: 'Error saving your hash'})
	}
})

module.exports = { app }


