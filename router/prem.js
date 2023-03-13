const express=require('express')
const controller=require('../controller/purchase')
const authentication=require('../middleware/autho')
const premiumFeature=require('../controller/premiumFeature')

const router=express.Router()
router.get('/createOrder',authentication.authenticate,controller.createOrderId)
router.post('/updateOrder',authentication.authenticate,controller.updateOrderId)
router.post('/updateFailedOrder',authentication.authenticate,controller.failOrderStatus)
router.get('/leaderboard',authentication.authenticate,premiumFeature.leaderboardOfAll)
router.get('/downloadexpense',authentication.authenticate,premiumFeature.downloadAllExpenseLink)



module.exports=router 