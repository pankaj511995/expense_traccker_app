const jwt=require('jsonwebtoken')

const bcrypt=require('bcrypt')

exports.generateToken=(id,name,isPremium)=>jwt.sign({id,name,isPremium},process.env.JWT_TOKEN)

exports.bcryptpassword=(password)=>{
    return new Promise((resolve,reject)=>{
        bcrypt.hash(password,Number(process.env.SALT),async(err,hash)=>{
            if(hash){
                resolve(hash)
            }
           if(err){
            reject(err)
           }
        })       
    })
}

exports.compair=(p1,p2)=>{
    return new Promise((resolve,reject)=>{
        bcrypt.compare(p1,p2,(err,result)=>{
            if(result)  {
              resolve(result)
            }
            if(err){
                reject(err)
            }
        })
    })
}


