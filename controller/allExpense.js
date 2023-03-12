const Expense=require('../models/expense')
const sequelize=require('../util/sequelize')
exports.addExpenseAmount=async(req,res)=>{
    const t = await sequelize.transaction();
try{ 
        const{amount,comment,catagory}=req.body
        const user=req.user.update({totalExpense:req.user.totalExpense+Number(amount)},{transaction:t})
         const exp= req.user.createExpense({amount:amount,comment:comment,catagory:catagory},{transaction:t})
   
        const pexp= await Promise.all([exp,user])
        await t.commit()
        res.status(200).json( pexp[0].id) 

}catch(e){ 
    await t.rollback()
    console.log('error while adding item')
} 
} 
exports.deleteAmount=async(req,res)=>{
    const t=await sequelize.transaction()
    try{
        const user=req.user.update({totalExpense:req.user.totalExpense+Number(amount)},{transaction:t})
        const exp= Expense.destroy({where:{id:req.params.id,UserId:req.user.id}},{transaction:t})

             await Promise.all([exp,user]) 
            await t.commit()
             res.status(200).json({success:true})
        
    }catch(err){
    await t.rollback()
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