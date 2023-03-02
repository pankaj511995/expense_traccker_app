const Sequelize=require('sequelize')
const sequelize=require('../util/sequelize')
module.exports=sequelize.define('Expense',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    amount:{
        type:Sequelize.INTEGER,
        unique:false,
        allowNull:false
    },
    comment:{
        type:Sequelize.STRING,
        unique:true,
        allowNull:false
    }, 
    catagory:{
        type:Sequelize.STRING,
        allowNull:false
    }

})