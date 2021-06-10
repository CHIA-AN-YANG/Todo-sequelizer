const express = require('express')
const router = express.Router()
const { authenticator } = require('../middleware/auth.js')

const todos = require('./modules/todos')
const users = require('./modules/users')
const home = require('./modules/home')
const auth = require('./modules/auth')

router.use(function(req, res, next) {
  const date = new Date()
  console.log(`method: ${req.method}, router: ${req.url}, time: ${date}`)
  next()
})

router.use('/auth', auth)
router.use('/users', users)
router.use('/todos', authenticator, todos)
router.use('/', authenticator,home)

module.exports = router