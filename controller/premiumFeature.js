const Expense=require('../models/expense')
const User=require('../models/user');
const sequelize = require('../util/sequelize');
function findingallvalue(user){
    const result=[]
    let count=0;
    return new Promise((res,rej)=>{
        user.forEach(async(e)=>{
            await Expense.sum('amount',{where:{UserId:e.id}}).then(f=>{
                result.push({amount:f,name:e.name})
               count++
            })
            if(count===user.length){
                res(result)
            }
        })
    })
}
exports.leaderboardOfAll=async(req,res)=>{
   
const user=await User.findAll({
    attributes:['id','name',[sequelize.fn('sum',sequelize.col('expenses.amount')),'amount']],
    include:[{
        model:Expense,
        attributes:[] 
    }],
    group:['User.id'] ,
    order:[['amount','DESC']]
})
// console.log(user)
// const arr=await findingallvalue(user)
res.status(200).json(user)
}

