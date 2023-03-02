const Expense=require('../models/expense')
exports.addExpenseAmount=async(req,res)=>{
// try{}catch(e){
//     console.log('error while adding item')
// }
    const{amount,comment,catagory}=req.body
   const exp=await Expense.create({amount:amount,comment:comment,catagory:catagory})
   res.status(200).json(exp)
}
exports.deleteAmount=async(req,res)=>{
    try{
   await Expense.destroy({where:{id:req.params.id}})
   res.status(200).json({success:true})
}catch(err){
    res.status(400).json({message:'something went wrong'})
}
}
exports.ediiAmount=async(req,res)=>{
    try{
       const exp = await Expense.findOne({where:{id:req.params.id}})
        res.status(200).json(exp)
     }catch(err){
         res.status(400).json({message:'something went wrong'})
     }
}
exports.showAllExpense=async(req,res)=>{
    try{
   const exp= await Expense.findAll()
   res.status(200).json(exp)
    }catch(err){
    res.status(400).json({message:'something went wrong'})
    }
}