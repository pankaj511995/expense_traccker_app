const Expense=require('../models/expense')
exports.addExpenseAmount=async(req,res)=>{
try{
    const{amount,comment,catagory}=req.body
   const exp=await req.user.createExpense({amount:amount,comment:comment,catagory:catagory})
   res.status(200).json(JSON.stringify( exp))
}catch(e){
    console.log('error while adding item')
}
}
exports.deleteAmount=async(req,res)=>{
    try{
   await Expense.destroy({where:{id:req.params.id,UserId:req.user.id}})
   res.status(200).json({success:true})
}catch(err){
    res.status(400).json({message:'something went wrong'})
}
}
exports.ediiAmount=async(req,res)=>{
    try{
        const exp = await req.user.getExpenses({where:{id:req.params.id}})
            res.status(200).json(JSON.stringify(exp))
     }catch(err){
         res.status(400).json({message:'something went wrong'})
     }
}
exports.showAllExpense=async(req,res)=>{
    try{
        const exp= await req.user.getExpenses()
        res.status(200).json(JSON.stringify(exp))
    }catch(err){
    res.status(400).json({message:'something went wrong'})
    }
}