const Razorpay=require('razorpay')
const Order=require('../models/orders')
const sequelize=require('../util/sequelize')
const User=require('../models/user')
const jwt=require('jsonwebtoken')

function generateToken(id,name,isPremium){
    return jwt.sign({id,name,isPremium},process.env.JWT_TOKEN)
}
exports.createOrderId=(req,res)=>{
  try{
    const rzpay=new Razorpay({
        key_id:process.env.RAZ_KEY,
        key_secret:process.env.REZ_SECRATE
    })
    const amount=200
    rzpay.orders.create({amount,currency:'INR'},async(err,order)=>{
        if(order){
            await req.user.createOrder({orderId:order.id,status:'PENDING'})
            res.status(200).json({orderId:order.id,key_id:process.env.RAZ_KEY})
        }
        if(err) throw new Error(err)
    })
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
    res.status(200).json({token:generateToken(req.user.id,req.user.name,true)})
}catch(err){
    await t.rollback();
    console.log('got error while uploading payment details')
}
}
exports.failOrderStatus=(req,res)=>{
    try{
        const{ payment_id, order_id}=req.body
        Order.update({paymentId: payment_id,status:'FAILED'},{where:{orderId: order_id,UserId:req.user.id}})
      
    }catch(err){
        console.log('got error while uploading failed status')
    }
}