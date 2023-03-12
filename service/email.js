const Sib=require('sib-api-v3-sdk')
require('dotenv').config()
exports.sendEmail=(email)=>{
    return new Promise((resolve,reject)=>{
            const Client=Sib.ApiClient.instance
            const apiKey=Client.authentications['api-key']
            apiKey.apiKey=process.env.SENDINBLUE_SMPT
            const sendEmailApi=new Sib.TransactionalEmailsApi()

                const sender={
                    email:process.env.EMAIL_ID,
                    name:'pankaj'
                }
                const recever=[{
                    email:email
                }
            ]

                sendEmailApi.sendTransacEmail({
                    sender,
                    to:recever,
                    subject:'this is span testing api only',
                    textContent:'hi pankaj how are you'
                }).then(e=>{
            resolve(e.messageId)
        }).catch(err=>reject(err))

    })
}

