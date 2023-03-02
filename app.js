const express =require('express')
const bodyparser=require('body-parser')
const cors=require('cors')
const  sequelize=require('./models/user')
const userdata=require('./router/userRout')
const app=express()
app.use(cors())
app.use(bodyparser.json({extended :false}))

app.use('/user',userdata)

sequelize.sync().then(e=>app.listen(3000)).catch(e=>console.log('got error'))
      