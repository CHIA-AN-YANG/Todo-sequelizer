const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const session = require('express-session')
const app = express();
const PORT = process.env.PORT
const db = require('./models')
const Todo = db.Todo
const User = db.User
const usePassport = require('./config/passport')
const flash = require('connect-flash')


const path = require('path');
app.use('/static', express.static(path.join(__dirname, 'public')))
//set middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'))
app.use(session({
  store: '',
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}))

//set view engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' })) 
app.set('view engine', 'hbs')


//passport + flash msg
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')  
  res.locals.warning_msg = req.flash('warning_msg') 
  next()
})

const routes = require('./routes')
app.use(routes)

app.listen(3000, () => {
  console.log(`App is running on port ${PORT}`)
})