const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true 
  },
  isDone: {
    type: Boolean,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})
module.exports = mongoose.model('Todo', todoSchema)

//*Mongoose automatically looks for the plural, lowercased version of your model name. 
//Thus, for the example above, the model Todo is for the todos collection in the database.

//在這邊我們將todoSchema整個建構式匯出，所以匯入的頁面並不需要匯入 mongoose。
//推斷所需要的方法函式都已經包含在建構式裡面了