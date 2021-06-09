const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
    pattern: /[\w\d\S]/s
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 127
  },
  password: {
    type: String,
    required: true
  }
})
module.exports = mongoose.model('User', userSchema)