const url='localhost:3000'
document.querySelector('#signup').addEventListener('click', (e)=>{
    e.preventDefault()
    
        let obj={
            name:document.getElementById('name').value,
            email:document.getElementById('email').value,
            password:document.getElementById('password').value
         }
         console.log(obj)
        axios.post(`http://localhost:3000/user/signup`,obj).then(e=>{
           
        }).catch(e=> {
            console.log(e,'got erro')
            document.getElementById('error').innerHTML=e.response.data
            setTimeout(()=>document.getElementById('error').innerHTML='' ,4000)
        })                        
        
    })