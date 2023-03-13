const Sequelize=require('sequelize')
const sequelize=require('../util/sequelize')
module.exports=sequelize.define('forgot',{
    id:{
        type:Sequelize.STRING,
        primaryKey:true
    },
   isActive:{
    type:Sequelize.BOOLEAN
   }

})