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
  let {name, isDone} = req.body
  const userId = req.user.id
  if(isDone){ isDone = true }else{ isDone = false };
  return Todo.create({ name, isDone, userId })   
    .then(() => res.redirect('/')) 
    .catch(err => console.error(err))
})

//update
router.get('/:id/edit', (req, res) => {
  const userId = req.user.id
  const id = req.params.id;
  Todo.findOne({where:{id, userId}, raw:true,nest:true})
      .then(data => res.render('edit', { oldData: data }))
      .catch(err => console.error(err))
})
router.put('/:id', (req, res) => {
  const {name, isDone} = req.body 
  const id = req.params.id
  Todo.findByPk(id)
      .then( todo => {
        todo.name = name;
        todo.isDone = isDone === 'on'
        return todo.save()
      })
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

//read
router.get('/:id', (req, res) => {
  const userId = req.user.id
  const id = req.params.id
  Todo.findOne({where:{id, userId}, raw:true,nest:true})
      .then(data => res.render('detail', { todo: data })) 
      .catch(err => console.error(err))
})

//delete
router.delete('/:id', (req, res) => {
  const userId = req.user.id
  const id = req.params.id
  Todo.findOne({where:{id, userId}})
      .then(data => data.destroy())
      .then(() => res.redirect('/'))
      .catch(err => console.error(err))
})

module.exports = router
