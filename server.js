const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()

const IMGUR_API = 'https://api.imgur.com/3'
const port = 4000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    )
    next()
})

async function callApiUrl(url, res) {
    try {
        const { data } = await axios.get(url, {
            headers: { Authorization: 'Client-ID 2455cb9ff4bc073' }
        })
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
    }
}

app.get('/:id', (req, res) => {
    const fullUrl = `${IMGUR_API}/album/${req.params.id}`
    callApiUrl(fullUrl, res)
})

app.get('*', (req, res) => {
    const fullUrl = `${IMGUR_API}${req.url}`
    callApiUrl(fullUrl, res)
})

app.listen(port, () => console.log(`Server is running on ${port}`))

export default app
