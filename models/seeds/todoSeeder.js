if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const Todo = require('../todo')
const User = require('../user')
const bcrypt = require('bcryptjs')


const SEED_USER = {
  user_name: 'Seedaria',
  email: 'seed@todoseeder.com',
  password: 'todoSeeder001'
}


db.once('open', () => {
  return bcrypt
  .genSalt(10)
  .then(salt => bcrypt.hash(SEED_USER.password, salt))
  .then(hash => User.create({user_name: SEED_USER.user_name, email: SEED_USER.email, password: hash}))
  .then(user => {
    const userId = user._id 
    console.log('create todo')
    return Promise.all(
      [Todo.create({ name: `test-promise`, isDone: false, userId }),
      User.findOne({email:user.email}).then(user => {console.log(user.user_name)})]
      //Array.from(arrayLike, (element, index, array) => { ... } )

      // Array.from(
      // { lenghth:10 }, (_, i) => { Todo.create({ name: `name-${i}`, isDone: false, userId }) }
      // )
    )
  })
  .then(() => { 
    console.log('finish seeding with 1 seed user & 10 todos')
    process.exit()
  })
})

// Models are fancy constructors compiled from Schema definitions. 
// An instance of a model is called a document. 
// Models are responsible for creating and reading documents from the underlying MongoDB database.