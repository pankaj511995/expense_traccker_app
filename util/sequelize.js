const Sequelize=require('sequelize')
const sequelize=new Sequelize(process.env.FILE_NAME,process.env.USER_ID,process.env.PASSWORD,{
    host:process.env.HOST,
    dialect:process.env.DIALECT
})
module.exports=sequelize;



