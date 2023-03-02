document.querySelector('#signin').addEventListener('click', async (e)=>{
    try{
                e.preventDefault()
                let obj={
                    email:document.getElementById('email').value,
                    password:document.getElementById('password').value
                 }
             await axios.post(`http://localhost:3000/user/signin`,obj)
                message('success')
                    
     }catch(e){  
        message(e.response.data.messaga)
        console.log('error while sign in ',e)}           
})
function message(e){
    document.getElementById('error').innerHTML=e
}