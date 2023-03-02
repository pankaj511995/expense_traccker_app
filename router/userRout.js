const express=require('express')
const controller=require('../controller/userdetails')

const router=express.Router()
router.post('/signup',controller.signupUser)
router.post('/signin',controller.signinUser)

module.exports=router 