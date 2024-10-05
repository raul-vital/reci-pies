//********* IMPORTS **********/
require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')
const path = require('path')
const morgan = require('morgan')

//********* MIDDLEWARE **********/
const signedIn = require('./middleware/signed-in')
const passUserToView = require('./middleware/pass-user-to-view')

//********* PORT CONNECTION **********/
const port = process.env.PORT || 3000

//********* CONTROLLERS **********/
const authController = require('./controllers/auth')
const recipesController = require('./controllers/recipes')

//********* MongoDB Connection **********/
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () =>{
    console.log(`Connected to MongoDB - ${mongoose.connection.name}`)
})

//******** MIDDLEWARE **********/
app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname,"public")))
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
)
app.use(passUserToView)


//********* ROUTES **********/
app.get('/', (req, res) => {
    res.render("index.ejs")
})


//********** CONTROLLERS MANAGER ***********/
app.use('/auth', authController)
app.use(signedIn)
app.use('/users/:userId/recipes', recipesController)




//********* LISTENER **********/
app.listen(port, () => {
    console.log(`Listening in P(ie)ORT.... 🥧 ${port}`)
})