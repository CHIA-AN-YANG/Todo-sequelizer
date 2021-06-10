const express = require('express')
const router = express.Router()
const db = require('../../models')
const Todo = db.Todo
const User = db.User

//create
router.get('/new', (req, res) => {
  return res.render('new')
})
router.post('/', (req, res) => {
  res.redirect('/')
})

//update
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const id = req.params.id;
  res.render('edit', { oldData: data })
})
router.put('/:id', (req, res) => {
  const {name, isDone} = req.body 
  const id = req.params.id
  res.redirect('/')
})

//read
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const id = req.params.id
  res.render('detail', { todo: data })
})

//delete
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const id = req.params.id
  res.redirect('/')
})

module.exports = router
