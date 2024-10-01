const express = require('express')
const router = express.Router()

const User = require('../models/user')

//********* ROUTES **********/
router.get('/', async (req,res)=>{
    try{
    const user = await User.findById(req.session.user._id)
    res.render('recipes/index.ejs', {recipes: user.recipes})
    }catch(error){
        console.log(error)
        res.redirect('/')
    }
})

router.get('/new', (req,res)=>{
    res.render('./new.ejs')
})

router.post('/', async (req,res)=>{
   try{
    const user = await User.findById(req.session.user._id)
    user.recipes.push(req.body)
    await user.save()
    res.redirect(`/users/${user._id}/recipes`)
   }catch(error){
    console.log(error)
    res.redirect('/')
   }

})
module.exports = router