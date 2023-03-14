const uuid=require('uuid')
const User=require('../models/user')
const sequelize=require('../util/sequelize')
const forgotPassword=require('../models/forgotPassword')
const service=require('../service/email')
const serviceRepet=require('../service/repete')

exports.forgotPasswordLink=async(req,res)=>{
    const t = await sequelize.transaction();
    try{
        const uid=uuid.v4()   
    const user=await User.findOne({where:{email:req.body.email}})
    if(user){
            const p1=service.sendEmail(req.body.email,uid)
           const p2= user.createForgot({id:uid,isActive:true},{transaction:t})
           await Promise.all([p1,p2])//if may be email fail to send then rollback
           await t.commit()
        res.status(200).json({message:'sent email'})
    }else throw new Error()
}catch(err){
    await t.rollback()
    serviceRepet.error(res,'something went wrong','error while sending forgot email link')
} 
}
exports.sendPasswordLink=(req,res)=>{
    res.render('resetLink', {
        pageTitle: 'forgot',
        id:req.params.id,
        path: '/'
  });  
}


exports.updatePassword=async(req,res)=>{
    const t = await sequelize.transaction();
    try{
            const {password1,password2}=req.body
            if(password1!=password2) return res.status(400).json({message:'both are not same'})

        const f=await forgotPassword.findOne({where:{id:req.params.id}})
            if(f.isActive){
                const hash=await  serviceRepet.bcryptpassword(password1)
                 const p1= User.update({password:hash},{where:{id:f.UserId},transaction:t})
                 const p2=forgotPassword.update({isActive:false},{where:{id:req.params.id},transaction:t})
                    await Promise.all([p1,p2])
                    await t.commit()
                    res.status(200).json({passwordchanged:true})
                }
                else throw new Error()
           
    }catch(err){
        await t.rollback()
        serviceRepet.error(res,'something went wrong','error while updating reset password')
    }
}