const User=require('../models/user')
exports.signupUser=(req,res)=>{
    const {name,email,password}=req.body
   User.create({name:name,email:email,password:password}).then(e=>res.status(200).json({status:true}))
   .catch(e=>res.status(400).json('email already exist'))
}

// module.exports={
//     signpuUser
// }