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
        allowNull:false
    },
    comment:{
        type:Sequelize.STRING,
        allowNull:false
    }, 
    catagory:{
        type:Sequelize.STRING,
        allowNull:false
    }

})