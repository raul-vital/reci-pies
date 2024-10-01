const express = require('express')
const router = express.Router()

const User = require('../models/user')

//********* ROUTES **********/
router.get('/', async (req, res)=>{
    const user = await User.findById(req.session.user._id)
    res.render('recipes/index.ejs', {recipes: user.recipes})
})

router.get('/new', (req,res)=>{
    res.render('./new.ejs')
})

module.exports = router