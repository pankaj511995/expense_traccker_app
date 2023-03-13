const User=require('../models/user')
const jwttoken=require('../service/repete')
const bcrypt1=require('../service/repete')
exports.signupUser=async(req,res)=>{
     try{
    const {name,email,password}=req.body
    if(email.length===0 ||password.length===0 || name.length===0)
        return res.status(400).json({message:'please fill all details'})
    
            const hash=await bcrypt1.bcryptpassword(password)
            await User.create({name:name,email:email,password:hash})
             res.status(200).json({status:true})

    }catch(e){
     res.status(400).json({message:'email already exist'})
    console.log('error while signup')
    }
}
exports.signinUser=async(req,res)=>{
    try{
    const {email,password}=req.body
    if(email.length===0 ||password.length===0){
        return res.status(400).json({message:'please all details'})
    }
        const user=await User.findOne({where:{email:email}})
       await bcrypt1.compair(password,user.password)
        res.status(200).json({token:jwttoken.generateToken(user.id,user.name,user.isPremium)})
}catch(e){
    res.status(404).json({message:'new user signup now'})
    console.log('error while sign in')
} 
}

