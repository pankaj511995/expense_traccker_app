const User=require('../models/user');
const service=require('../service/s3bucket')

exports.leaderboardOfAll=async(req,res)=>{
    try{
        if(req.user.isPremium===false) 
        return res.status(400).json({message:'join premium to enjoy this feature'})
        const user=await User.findAll({
                 attributes:['id','name','totalExpense'],
                 order:[['totalExpense','DESC']]
                })
        res.status(200).json(user)
    }catch(err){
    console.log('error while pesting leaderborard')
}
}
exports.downloadAllExpenseLink= async(req,res)=>{
    try{
    if(req.user.isPremium===false) 
    return res.status(400).json({message:'join premium to enjoy this feature'})

    const exp=await req.user.getExpenses()
    const location=await service.S3BucketUpload(JSON.stringify(exp),req.user.email)
            await req.user.createDownload({location:location})
    const url=await req.user.getDownloads({attributes:['location','createdAt']})
   res.status(200).json({Location:url,link:location})
}catch(err){
    console.log('error while downloading expense ')
}
}

