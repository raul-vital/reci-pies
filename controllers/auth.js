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
        return res.send('Password and Confirm Password do not match. Try again.')
    }
    const hashPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashPassword
    await User.create(req.body)
       return res.redirect('/auth/sign-in')
    }catch(error){
        console.log(error)
        res.redirect('/')
    }
})

router.post('/sign-in', async(req,res)=>{
    try{
    const databaseUser = await User.findOne({username: req.body.username})
    if(!databaseUser){
        return res.send('Unable to sign in. Please try again.')
    }

    const validPassword = bcrypt.compareSync(req.body.password, databaseUser.password)

    if(!validPassword){
        return res.send('Unable to sign in. Please try again.')
        
    }
    req.session.user ={
        username: databaseUser.username,
        _id: databaseUser._id
    }
    res.redirect('/')
    }catch(error){
        console.log(error)
        res.redirect('/')

    }

})
module.exports = router