const express=require('express')
const controller=require('../controller/allExpense')
const authentication=require('../middleware/autho')

const router=express.Router()
router.post('/addExpense',authentication.authenticate,controller.addExpenseAmount)
router.post('/deleteAmount/:id',authentication.authenticate,controller.deleteAmount)
router.get('/ediiAmount/:id',authentication.authenticate,controller.ediiAmount)
router.get('/showexpense',authentication.authenticate ,controller.showAllExpense)

module.exports=router 