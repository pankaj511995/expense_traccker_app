const Sequelize=require('sequelize')
const sequelize=require('../util/sequelize')
module.exports=sequelize.define('Order',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    paymentId:Sequelize.STRING,
    orderId:{
        type:Sequelize.STRING,
        allowNull:false
    }, 
    status:Sequelize.STRING

})