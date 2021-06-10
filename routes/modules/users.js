const express = require('express')
const router = express.Router()
const db = require('../../models')
const User = db.User
const passport = require('passport')
const bcrypt = require('bcryptjs')


//register
router.get('/register', (req, res) => {
  return res.render('register')
})
router.post('/register', (req, res) => {
  const errors = []
  const { name, email, password, confirmPassword } = req.body
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填。' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  console.log('errors array: ', errors)
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email
    })
  }
  //check if user exists
  User.findOne({where:{email}}).then(user => { 
    if(user){ errors.push({message:'user already exists, please log in.'}) }
    if(password!==confirmPassword){ errors.push({message:'user already exists, please log in.'}) }
    if(errors.length >0){ 
      console.log(`errors: ${errors}`)
      return res.render('register', {errors, name, email}) }

    return bcrypt
    .genSalt(10) 
    .then(salt => bcrypt.hash(password, salt))
    .then(hash => User.create({
      name,
      email,
      password: hash
    }))
    .then(() => {
      req.flash('success_msg', '註冊成功！請登入以使用本服務。')
      res.redirect('/users/login')
    })
    .catch(err => console.log(err))
}
)})



//login
router.get('/login', (req, res) => {
  return res.render('login')
})
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

//log out
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已成功登出')
  res.redirect('/users/login')
})

module.exports = router