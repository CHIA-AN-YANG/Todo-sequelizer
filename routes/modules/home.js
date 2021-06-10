const express = require('express')
const router = express.Router()
const db = require('../../models')
const Todo = db.Todo
const User = db.User

router.get('/', (req, res) => {
  const userId = req.user.id
  Todo.findAll({where:{userId}, raw:true, nest:true })
  .then(todos => {
    return res.render('index', { todos: todos })
  })
  .catch(err => res.status(422).json(err))
})

module.exports = router