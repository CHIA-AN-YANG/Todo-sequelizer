const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

//create
router.get('/new', (req, res) => {
  return res.render('new')
})
router.post('/', (req, res) => {
  let {name, isDone} = req.body
  const userId = req.user._id
  if(isDone){ isDone = true }else{ isDone = false };
  return Todo.create({ name, isDone, userId })   
    .then(() => res.redirect('/')) 
    .catch(error => console.log(error))
})

//update
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const id = req.params.id;
  Todo.findOne(id, userId)
      .lean() 
      .then(data => res.render('edit', { oldData: data })) 
})
router.put('/:id', (req, res) => {
  const {name, isDone} = req.body 
  const id = req.params.id
  Todo.findById(id)
      .then( todo => {
        todo.name = name;
        todo.isDone = isDone === 'on'
        return todo.save()
      })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//read
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const id = req.params.id
  Todo.findOne(id,userId)
      .lean()
      .then(data => res.render('detail', { todo: data })) 
      .catch(error => console.error(error))
})

//delete
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const id = req.params.id
  Todo.findOne(id,userId) //取交集 限制只能找到自己的資料
      .then(data => data.remove())
      .then(() => res.redirect('/'))
})

module.exports = router
