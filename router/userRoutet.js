const express=require('express')

const controller=require('../controller/userdetails')
const router=express.Router()
router.get('/signupuser',controller.signupUser)

module.exports=router