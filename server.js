const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const app = express()
const {generate} = require('./utils/generateId.js')

app.use(helmet())
app.use(morgan('tiny'))

app.get('/', (req, res) => {
	res.send('API HEALTHY')
})
app.get('/:slug', (req, res) => {
	const {slug } = req.params
	const id = generate(5)
	res.json({'Your slug is': slug, 'Your id is': id})
})

app.post('/:slug', (req, res) => {
	const {slug } = req.params
	res.json({'Your slug is': slug})
})

module.exports = { app }


