const paymentbtn=document.getElementById('premiumLink')
paymentbtn.addEventListener('click',openRazorPayLink)

async function openRazorPayLink(e){
    e.preventDefault()
    // try{}catch(err){
        // console.log('error while creating payment ')
    // } 
   const response=await  axios.get(`http://localhost:3000/premium/createOrder`,{headers:{'authorization':token}})
  
   const payopen={
        "key":response.data.key_id,
        "order_id":response.data.orderId,
        "handler":  (order)=>{
            axios.post(`http://localhost:3000/premium/updateOrder`,order,{headers:{'authorization':token}})
     .then( async(e)=>{
                    localStorage.setItem('username',(e.data.token))
                    localStorage.setItem('isPremium',JSON.stringify(true))
                    window.location.href='expense.html'
            })
           
        }
   }
   const rzp=new Razorpay(payopen)
   rzp.open()
   rzp.on('payment.failed',(order)=>{
    axios.post(`http://localhost:3000/premium/updateFailedOrder`,order.error.metadata,{headers:{'authorization':token}})
    console.log(order.error.metadata,'payment failed')
   })
}

function showpremium(){
       
    try{
    const isPremium=localStorage.getItem('isPremium')
    if(JSON.parse(isPremium)===true){
        document.getElementById('premiumLink').remove()
        document.getElementById('leaderboard').innerHTML=` <button class="btn" >Show Leaderborad </button>` 
    }
   
}catch(err){
    console.log('error while showing premium button')
}
}
showpremium()


document.getElementById('leaderboard').addEventListener('click',()=>{//leaderboard
    axios.get(`http://localhost:3000/premium/leaderboard`).then(e=>{
    console.log(e.data)
    showleaderboard(e.data)
    })
    console.log('click')
})

function showleaderboard(obj){
    let s=  document.getElementById('showleaderboard')
    obj.forEach(e=>{
        const li=document.createElement('li')
        li.appendChild(document.createTextNode(`Name : ${e.name} total exp :${e.amount}`))
        li.className-'listitem'
      s.appendChild(li)
    })
  


}