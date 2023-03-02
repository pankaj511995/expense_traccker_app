const Expense=require('../models/expense')
exports.addExpenseAmount=(req,res)=>{
    const{amount,comment,catagory}=req.body
    console.log(amount,comment,catagory)
}