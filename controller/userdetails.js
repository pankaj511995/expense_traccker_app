const User=require('../models/user')
exports.signupUser=(req,res)=>{
    const {name,email,password}=req.body
   User.create({name:name,email:email,password:password}).then(e=>res.status(200).json({status:true}))
   .catch(e=>res.status(400).json('email already exist'))
}
exports.signinUser=(req,res)=>{
    const {email,password}=req.body
    User.findAll({where:{email:email}}).then(e=>{
        if(e[0].password===Number(password)){
            res.status(200).json({success:true})
        }else{
            res.status(404).json({messaga:'incorrect password'})
        }
        
    }).catch(e=>res.status(404).json({messaga:'new user signup now'}))
}
