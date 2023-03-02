const express=require('express')
const controller=require('../controller/allExpense')

const router=express.Router()
router.post('/addExpense',controller.addExpenseAmount)
router.post('/deleteAmount/:id',controller.deleteAmount)
router.get('/ediiAmount/:id',controller.ediiAmount)
router.get('/showexpense',controller.showAllExpense)

module.exports=router 