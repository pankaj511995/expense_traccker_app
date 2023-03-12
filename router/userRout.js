const express=require('express')
const controller=require('../controller/userdetails')
const authentication=require('../middleware/autho')

const router=express.Router()
router.post('/signup',controller.signupUser)
router.post('/signin',controller.signinUser)
router.post('/forgotPassword',controller.forgotPasswordLink)

module.exports=router 