const User=require('../models/user')
exports.signupUser=async(req,res)=>{
    try{
    const {name,email,password}=req.body
   await User.create({name:name,email:email,password:password})
   res.status(200).json({status:true})
} catch(e){
    res.status(400).json('email already exist')
    console.log('error while signup')
}
}
exports.signinUser=async(req,res)=>{
    try{
    const {email,password}=req.body
    const user=await User.findAll({where:{email:email}})
        if(user[0].password===Number(password)){
            res.status(200).json({success:true})
        }else{
            res.status(404).json({messaga:'incorrect password'})
        } 
}catch(e){
    res.status(404).json({messaga:'new user signup now'})
    console.log('error while sign in')
}
}
