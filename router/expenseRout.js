const express=require('express')
const controller=require('../controller/allExpense')

const router=express.Router()
router.post('/addExpense',controller.addExpenseAmount)


module.exports=router 