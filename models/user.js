const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    ingredients: {
        type: [String],
        required: true,
    },
    instructions:{
        type:[String],
        required: true,
    },
    protein: {
        type: Number,
    },
    carbs: {
        type: Number,
    },
})



const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber:{
        type: Number
    },
    recipes: [recipeSchema]

})


const User = mongoose.model('User', userSchema)
module.exports = User