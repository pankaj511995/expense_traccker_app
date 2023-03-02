const express =require('express')
require('dotenv').config()
const bodyparser=require('body-parser')
const cors=require('cors')
const  sequelize=require('./util/sequelize')
const userdata=require('./router/userRout')
const allExpense=require('./router/expenseRout')
const app=express()
app.use(cors())
app.use(bodyparser.json({extended :false}))

app.use('/user',userdata)
app.use('/expense',allExpense)

//table creation
const User=require('./models/user')
const Expense=require('./models/expense')

User.hasMany(Expense)
Expense.belongsTo(User)
sequelize.sync({force:false}).then(e=>app.listen(3000)).catch(e=>console.log('got error'))
      