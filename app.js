const express =require('express')
require('dotenv').config()
const bodyparser=require('body-parser')
const cors=require('cors')
const  sequelize=require('./util/sequelize')
const userdata=require('./router/userRout')
const allExpense=require('./router/expenseRout')
const allpremiumfeature=require('./router/prem')
const app=express()
app.use(cors())
app.use(bodyparser.json({extended :false}))
app.set('view engine', 'ejs');  
app.set('views', 'views'); 


app.use('/user',userdata)
app.use('/expense',allExpense)
app.use('/premium',allpremiumfeature)

//table creation
const User=require('./models/user')
const Expense=require('./models/expense')
const Order=require('./models/orders')
const forgotPassword=require('./models/forgotPassword')
const Download=require('./models/download')

User.hasMany(Expense)
Expense.belongsTo(User)
User.hasMany(Order)
Order.belongsTo(User)
User.hasMany(forgotPassword)
forgotPassword.belongsTo(User)
User.hasMany(Download)
Download.belongsTo(User)


// sequelize.sync({force:true})
// .then(e=>
    app.listen(3000)
//     )
// .catch(e=>console.log('got error'))
      