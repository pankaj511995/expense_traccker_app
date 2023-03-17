const User=require('../models/user')
const serviceRepet=require('../service/repete')
exports.authenticate= async(req,res,next)=>{
    try{
       const token=await serviceRepet.verify(req.headers.authorization,process.env.JWT_TOKEN)
           req.user= await User.findByPk(token.id)
                    next()      
    }catch(err){ 
        serviceRepet.error(res,'user does not exist','error while authentication')
    }

}
