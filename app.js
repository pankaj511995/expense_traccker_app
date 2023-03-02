const express =require('express')
const bodyparser=require('body-parser')
const cors=require('cors')
const  sequelize=require('./models/user')
const controller=require('./controller/userdetails')
const app=express()
app.use(cors())
app.use(bodyparser.json({extended :false}))

app.post('/user/signup',controller.signupUser)
app.post('/user/signin',controller.signinUser)
sequelize.sync().then(e=>app.listen(3000)).catch(e=>console.log('got error'))
   