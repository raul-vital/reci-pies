//********* IMPORTS **********/
require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')

//********* IMPORTS **********/
const port = process.env.PORT ? process.env : '3000'

//********* ROUTES **********/
app.get('/', (req, res) => {
    res.render("index.ejs")
})










//********* LISTENER **********/
app.listen(port, () => {
    console.log(`Listening in P(ie)ORT.... ${port}`)
})