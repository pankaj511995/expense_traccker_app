const express =require('express')
require('dotenv').config()
const helmet=require('helmet')
const path=require('path')
const bodyparser=require('body-parser')
const cors=require('cors')
const  sequelize=require('./util/sequelize')
const userdata=require('./router/userRout')
const allExpense=require('./router/expenseRout')
const allpremiumfeature=require('./router/prem')
const app=express()
app.use(cors()) 
app.use(helmet())
app.use(bodyparser.json({extended :false}))
app.set('view engine', 'ejs');  
app.set('views', 'views'); 


//All user related  
app.use('/user',userdata) 
//All expense table related
app.use('/expense',allExpense)
// only for premium user rerlated
app.use('/premium',allpremiumfeature)
// other then above route
app.use((req,res)=> {
    console.log(req.url)
    res.sendFile(path.join(__dirname,`public/${req.url}`))
})


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


sequelize.sync()
.then(e=>
    app.listen(process.env.PORT)
    )
.catch(e=>console.log('got error'))
      