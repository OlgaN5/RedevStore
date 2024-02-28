require('dotenv').config()
const express = require('express')
const app = express()
const router = require('./routes/index.router')
const config = require('./config/config')


let server
async function start() {
    await config(app)
    const port = process.env.PORT || 4000
    server = app.listen(port, () => {
        console.log('ok')
    })
    app.use('/api', router)
    return server
}

module.exports = start()