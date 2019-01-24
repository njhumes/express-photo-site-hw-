const mongoose = require('mongoose')
const Photos = require('./photosSchema')
const userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    photos: [Photos.schema]
});


const User = mongoose.model('User', userSchema)

module.exports = User;