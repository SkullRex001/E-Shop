const express = require('express')
const cookie_parser  = require('cookie-parser')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookie_parser())





module.exports = app