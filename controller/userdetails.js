const User=require('../models/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

function generateToken(id,name){
    return jwt.sign({id,name},process.env.JWT_TOKEN)
}
exports.signupUser=async(req,res)=>{
    try{
    const {name,email,password}=req.body
    console.log(name.length)
    if(email.length===0 ||password.length===0 || name.length===0){
        return res.status(400).json({message:'please all details'})
    }
    bcrypt.hash(password,Number(process.env.SALT),async(err,hash)=>{
        if(hash){
             User.create({name:name,email:email,password:hash})
             .then(e=> res.status(200).json({status:true}))
             .catch(err=> res.status(400).json({message:'email already exist'}))
        }else throw new Error(e)
    })
} catch(e){
    res.status(400).json({message:'something went wrong'})
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
     bcrypt.compare(password,user.password,(err,result)=>{
        console.log(user.id,user.name,'user id and name')
        if(result)  res.status(200).json({token:generateToken(user.id,user.name)})
        else res.status(404).json({message:'incorrect password'})
     }) 
}catch(e){
    res.status(404).json({message:'new user signup now'})
    console.log('error while sign in')
} 
}
