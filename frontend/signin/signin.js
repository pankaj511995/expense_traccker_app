document.querySelector('#signin').addEventListener('click', async (e)=>{
    try{
                e.preventDefault()
                let obj={
                    email:document.getElementById('email').value,
                    password:document.getElementById('password').value
                 }
            const tok=  await axios.post(`http://localhost:3000/user/signin`,obj)
            localStorage.setItem('username',(tok.data.token))
            window.location.href='../addexpense/expense.html'
                message('success')
                    
     }catch(e){  
        message(e.response.data.message)
        console.log('error while sign in ',e)}           
})
function message(e){
    document.getElementById('error').innerHTML=e
}