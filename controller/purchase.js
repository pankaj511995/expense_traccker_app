const Order=require('../models/orders')
const sequelize=require('../util/sequelize')
const payment=require('../service/razorpay')
const jwttoken=require('../service/repete')
exports.createOrderId=async(req,res)=>{
  try{
            const order=await payment.createOrder()        
            await req.user.createOrder({orderId:order.id,status:'PENDING'})
            res.status(200).json({orderId:order.id,key_id:process.env.RAZ_KEY})
    
}catch(err){
    res.status(400).json({message:'something went wrong'})
    console.log('error while creating payment link')
  }
}

exports.updateOrderId=async (req,res)=>{
    const t = await sequelize.transaction();
    try{
        const{razorpay_payment_id,razorpay_order_id}=req.body
        const p1= Order.update({paymentId:razorpay_payment_id,status:'SUCCESS'},{where:{orderId:razorpay_order_id,UserId:req.user.id},transaction:t})
        const p2=req.user.update({isPremium:true},{transaction:t})
        await Promise.all([p1,p2])
        await t.commit()
        res.status(200).json({token:jwttoken.generateToken(req.user.id,req.user.name,true)})
    }catch(err){
        await t.rollback();
        console.log('got error while uploading payment details')
    }
}
exports.failOrderStatus=async(req,res)=>{
    try{
        const{ payment_id, order_id}=req.body
       await Order.update({paymentId: payment_id,status:'FAILED'},{where:{orderId: order_id,UserId:req.user.id}})
      
    }catch(err){
        console.log('got error while uploading failed status')
    }
}