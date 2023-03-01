const url='localhost:3000'
document.querySelector('#signup').addEventListener('click', (e)=>{
    e.preventDefault()
    
        let obj={
            name:document.getElementById('name').value,
            email:document.getElementById('email').value,
            password:document.getElementById('password').value
         }
        axios.post(`http://localhost:3000/user/userDetails`,obj).then(e=>{
           
            if(e)  window.location.href='signin.html'
        }).catch(e=> {
            console.log(e,'got erro')
            document.getElementById('error').innerHTML=e.response.data
            setTimeout(()=>document.getElementById('error').innerHTML='' ,4000)
        })                        
        
    })