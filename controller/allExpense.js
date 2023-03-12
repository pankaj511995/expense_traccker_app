const Expense=require('../models/expense')
exports.addExpenseAmount=async(req,res)=>{
try{
    const{amount,comment,catagory}=req.body
    const totalExpense=req.user.totalExpense+Number(amount)
    const user=req.user.update({totalExpense:totalExpense})
   const exp= await req.user.createExpense({amount:amount,comment:comment,catagory:catagory})
   
   await Promise.all([exp,user])
    // console.log(exp)
    res.status(200).json( exp.id)

}catch(e){
    console.log('error while adding item')
}
}
exports.deleteAmount=async(req,res)=>{
    try{
        console.log(req.params.id,req.body.amount,'delete id is ')
        const totalExpense=req.user.totalExpense-Number(req.body.amount)
        const user=req.user.update({totalExpense:totalExpense})
   await Expense.destroy({where:{id:req.params.id,UserId:req.user.id}})
   res.status(200).json({success:true})
}catch(err){
    res.status(400).json({message:'something went wrong'})
}
}
exports.ediiAmount=async(req,res)=>{
    try{
        const exp = await req.user.getExpenses({where:{id:req.params.id}})
            res.status(200).json(exp)
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