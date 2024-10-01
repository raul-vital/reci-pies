const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const User = require('../models/user')

//********* ROUTES **********/

router.get('/sign-up', (req,res)=>{
    res.render('auth/sign-up.ejs')
})

router.get('/sign-in',(req,res)=>{
    res.render('auth/sign-in.ejs')
})