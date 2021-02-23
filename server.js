const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const {generateSha} = require('./utils/generateId.js')
require('dotenv').config()
const {get, set} = require('./db/index.js')

app.use(helmet())
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
	res.send('API HEALTHY')
})
app.get('/hash-lookup/:hash', async (req, res) => {
	const {hash} = req.params
	const dbResponse = await get(hash)
	if (dbResponse) {
		return res.json({dbResponse})
	} else {
		res.status(500).json({message: 'Not found'})
	}
})

app.get('/hash-redirect/:hash', async (req, res) => {
	const {hash} = req.params
	const dbResponse = await get(hash)
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

app.post('/add/custom', async (req, res) => {
	const { slug, url } = req.body
	const dbResponse = await get(slug)
	if (dbResponse) {
		res.json({alreadyExists: true, slug, url})
	} else {
		const dbResponse = await set(slug, url)
		if (dbResponse === 'OK') {
			res.json({alreadyExists: false, slug, url})
		} else res.status(500).json({error: 'Error saving your hash'})
	}
})

module.exports = { app }


