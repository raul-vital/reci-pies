//********* IMPORTS **********/
require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')

//********* PORT CONNECTION **********/
const port = process.env.PORT ? process.env : '3000'


//********* MongoDB Connection **********/
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () =>{
    console.log(`Connected to MongoDB - ${mongoose.connection.name}`)
})


app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
)


//********* ROUTES **********/
app.get('/', (req, res) => {
    res.render("index.ejs")
})










//********* LISTENER **********/
app.listen(port, () => {
    console.log(`Listening in P(ie)ORT.... ${port}`)
})