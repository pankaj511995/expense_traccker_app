const User=require('../models/user')
const serviceRepet=require('../service/repete')
exports.signupUser=async(req,res)=>{
     try{
         const {name,email,password}=req.body
        await serviceRepet.validate(res,'please fill all details',email,name,password)
         const hash=await serviceRepet.bcryptpassword(password)
        await User.create({name:name,email:email,password:hash})
         res.status(200).json({status:true})

    }catch(e){
        serviceRepet.error(res,'email already exist','error while signup')
    }
}
exports.signinUser=async(req,res)=>{
    try{
    const {email,password}=req.body
    await serviceRepet.validate(res,'please fill all details',email,password)
        const user=await User.findOne({where:{email:email}})
       await serviceRepet.compair(password,user.password)
        res.status(200).json({token:serviceRepet.generateToken(user.id,user.name,user.isPremium)})
}catch(e){
    serviceRepet.error(res,'incorrect password','error while sign in')
} 
}

