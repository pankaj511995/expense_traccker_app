const Sequelize=require('sequelize')
const sequelize=new Sequelize('expense','root','7501731287',{
    host:'localhost',
    dialect:'mysql'
})
module.exports=sequelize;

