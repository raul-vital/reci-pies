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

router.get('/sign-out',(req,res)=>{
    req.session.destroy()
    res.redirect('/')
})


router.post('/sign-up', async (req,res)=>{
    try{
    const databaseUser = await User.findOne({username: req.body.username})
    if(databaseUser){
        return res.send('Username not available!')
    }
    if(req.body.password !== req.body.confirmPassword) {
        return res.send('Password and Confirm Passwords do not match. Try again.')
    }
    const hashPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashPassword
    await User.create(req.body)
       return res.send('User Created!')
    }catch(error){
        console.log(error)
        res.redirect('/')
    }
})

module.exports = router