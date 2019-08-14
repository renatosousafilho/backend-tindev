const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
const cors = require('cors')

const server = express()

mongoose.connect("mongodb+srv://renato:QlllT6fJWdOTt8Lw@cluster0-uce3s.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true
})

server.use(cors())
server.use(express.json())
server.use(routes)

server.listen(3330)






