const Expense=require('../models/expense')
const User=require('../models/user')
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
   
const user=await User.findAll()
const arr=await findingallvalue(user)
res.status(200).json(arr.sort((a,b)=>b.amount-a.amount))
}

