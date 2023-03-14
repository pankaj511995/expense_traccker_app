const Expense=require('../models/expense')
const sequelize=require('../util/sequelize')
const serviceRepet=require('../service/repete')

exports.addExpenseAmount=async(req,res)=>{
    const t = await sequelize.transaction();
    try{ 
        const{amount,comment,catagory}=req.body
        await serviceRepet.validate(res,'please fill all details',amount,comment,catagory)
        const user=req.user.update({totalExpense:req.user.totalExpense+Number(amount)},{transaction:t})
         const exp= req.user.createExpense({amount:amount,comment:comment,catagory:catagory},{transaction:t})
   
        const pexp= await Promise.all([exp,user])
        await t.commit()
        res.status(200).json( pexp[0].id) 

    }catch(e){ 
    await t.rollback()
    serviceRepet.error(res,'something went wrong','error while adding item')
    } 
} 
exports.deleteAmount=async(req,res)=>{
    const t=await sequelize.transaction()
    try{
        const user=req.user.update({totalExpense:req.user.totalExpense-Number(req.body.amount)},{transaction:t})
        const exp= Expense.destroy({where:{id:req.params.id,UserId:req.user.id}},{transaction:t})

             await Promise.all([exp,user]) 
            await t.commit()
             res.status(200).json({success:true})
        
    }catch(err){
        await t.rollback()
        serviceRepet.error(res,'something went wrong','error while deleting item')
    }
}

exports.ediiAmount=async(req,res)=>{
    try{
            const exp = await req.user.getExpenses({where:{id:req.params.id}})
            res.status(200).json(exp)
     }catch(err){
        serviceRepet.error(res,'something went wrong','error while editing item')
     }
}
exports.getTotalAmount=(req,res)=>{
    try{
        res.status(200).json(req.user.totalExpense)
 }catch(err){
    serviceRepet.error(res,'something went wrong','error while editing item')
 }
}
exports.paginationofExpense=async(req,res)=>{
    try{
        const{perpage,pageNo}=req.body
        const pageNumber=Number(pageNo)
        const perPage=Number(perpage)
        const count=await req.user.countExpenses()
        const exp= await req.user.getExpenses({ offset:pageNumber*perPage,  limit :perPage })
        let lastpage=(Math.ceil(count/perPage)-1)       
        const obj={
            currentPage:pageNumber,
            hasNextpage: (count/perPage)>pageNumber+1,
            nextpage:pageNumber+1,
            hasPreviouspage:pageNumber>0,
            previouspage:pageNumber-1,
            lastpage:lastpage>pageNumber+1?lastpage:0
        }
        res.status(200).json({expnese:exp,pageObj:obj})
    }catch(err){
        serviceRepet.error(res,'something went wrong','error showing all item')
    }
}
