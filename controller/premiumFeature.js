const Expense=require('../models/expense')
const User=require('../models/user');
const sequelize = require('../util/sequelize');

exports.leaderboardOfAll=async(req,res)=>{
    try{
        const user=await User.findAll({
                 attributes:['id','name','totalExpense'],
                 order:[['totalExpense','DESC']]
                })
        res.status(200).json(user)
    }catch(err){
    console.log('error while pesting leaderborard')
}
}

