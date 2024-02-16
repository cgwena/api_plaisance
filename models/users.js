const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: { type: Number, required: true },
    email : { type: email, required:true},
    password: { type: String, required: true }
})

module.exports = mongoose.model('User', userSchema)