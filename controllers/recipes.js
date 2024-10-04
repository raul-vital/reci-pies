const express = require('express')
const router = express.Router()

const User = require('../models/user')

//********* ROUTES **********/

//********* INDEX, PASS RECIPES **********/
router.get('/', async (req,res)=>{
    try{
      const user = await User.findById(req.session.user._id)
      res.render('recipes/index.ejs', {recipes: user.recipes})
    }catch(error){
        console.log(error)
        res.redirect('/')
    }
})
//********* NEW FORM **********/
router.get('/new', (req,res)=>{
    res.render('./new.ejs')
})

//********* CREATE NEW **********/
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

//********* SHOW PAGE **********/
router.get('/:recipeId', async (req,res)=>{
    try{
      const user = await User.findById(req.session.user._id)
      const recipe = user.recipes.id(req.params.recipeId)
      res.render('./show.ejs', {
        recipe: recipe
    })
   }catch(error){
    res.redirect('/')
   }

})

//********* EDIT ROUTE **********/
router.put('/:recipeId', async (req,res)=>{
    try{
      const user = await User.findById(req.session.user._id)
      const recipeItem = user.recipes.id(req.params.recipeId)
      recipeItem.set(req.body)
      await user.save()
      res.redirect(`/users/${user._id}/recipes`)
    }catch(error){
        console.log(error)
        res.redirect('/')
    }
})

//********* DELETE ROUTE **********/
router.delete('/:recipeId', async (req,res)=>{
   try{ 
     const user = await User.findById(req.session.user._id)
     user.recipes.id(req.params.recipeId).deleteOne()
     await user.save()
     res.redirect(`/users/${user._id}/recipes`)
   }catch(error){
      console.log(error)
      res.redirect('/')
   }
})

//********* EDIT FORM **********/
router.get('/:recipeId/edit', async (req,res)=>{
    try{
      const user = await User.findById(req.session.user._id)
      const recipeItem = user.recipes.id(req.params.recipeId)
      res.render('./edit.ejs', {recipeItem})
    }catch(error){
        console.log(error)
        res.redirect('/')
    }
})


module.exports = router