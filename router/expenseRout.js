const express=require('express')
const controller=require('../controller/allExpense')
const authentication=require('../middleware/autho')

const router=express.Router()

router.post('/addExpense',authentication.authenticate,controller.addExpenseAmount)
router.post('/deleteAmount/:id',authentication.authenticate,controller.deleteAmount)
router.get('/ediiAmount/:id',authentication.authenticate,controller.ediiAmount)
router.post('/pagination',authentication.authenticate ,controller.paginationofExpense)
router.get('/totalAmount',authentication.authenticate ,controller.getTotalAmount)

module.exports=router 