const User=require('../models/user');
const service=require('../service/s3bucket')
const serviceRepet=require('../service/repete')
exports.leaderboardOfAll=async(req,res)=>{
    try{
        await serviceRepet.premium(req.user.isPremium)
        const user=await User.findAll({
                 attributes:['id','name','totalExpense'],
                 order:[['totalExpense','DESC']]
                })
        res.status(200).json(user)
    }catch(err){
        serviceRepet.error(res,'join premium to enjoy this feature','error while printing leaderboard')
}
}
exports.downloadAllExpenseLink= async(req,res)=>{
    try{
        await serviceRepet.premium(req.user.isPremium)
        const exp=await req.user.getExpenses()
        const location=await service.S3BucketUpload(JSON.stringify(exp),req.user.email)
            await req.user.createDownload({location:location})
        const url=await req.user.getDownloads({attributes:['location','createdAt']})
        res.status(200).json({Location:url,link:location})
}catch(err){
    serviceRepet.error(res,'join premium to enjoy this feature','error while downloading all expense')
}
}

