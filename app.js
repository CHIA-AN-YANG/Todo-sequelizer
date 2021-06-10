const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const session = require('express-session')
const app = express();
const PORT = process.env.PORT
// 載入設定檔，要寫在 express-session 以後
// const usePassport = require('./config/passport')
const flash = require('connect-flash')


//set middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

//set view engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' })) //這邊設定副檔名，也可以使用較簡潔的 hbs
app.set('view engine', 'hbs')

// mongoose
// require('./config/mongoose')
//對 app.js 而言，Mongoose 連線設定只需要「被執行」，不需要接到任何回傳參數繼續利用，所以這裡不需要再設定變數。

//passport + flash msg
// usePassport(app)
// app.use(flash())
// app.use((req, res, next) => {
//   console.log(req.user)
//   res.locals.isAuthenticated = req.isAuthenticated()
//   res.locals.user = req.user
//   res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
//   res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
//   next()
// })

app.get('/', (req,res)=>{
res.send(`<h1>Hellow World!</h1>`)
})

const routes = require('./routes')
app.use(routes)

app.listen(3000, () => {
  console.log(`App is running on port ${PORT}`)
})