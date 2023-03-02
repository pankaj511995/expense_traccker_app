const jwt=require('jsonwebtoken')
const User=require('../models/user')
exports.authenticate= (req,res,next)=>{
    try{
        jwt.verify(req.headers.authorization,process.env.JWT_TOKEN,async(err,token)=>{
            if(token){
                const user= await User.findByPk(token.id)
                    req.user=user
                    next()
            }else res.status(404),json({message:'user not exist'})
        })
    }catch(err){
        console.log('error while authentication')
    }

}
