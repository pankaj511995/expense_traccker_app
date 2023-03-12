const token=localStorage.getItem('username')

document.getElementById('addExpense').addEventListener('click',addExpense)
const addItem=document.getElementById('addItem')
addItem.addEventListener('click',editDeletebtn)

window.addEventListener('DOMContentLoaded', async() => {
    try{
    const value= await axios.get(`http://localhost:3000/expense/showexpense`,{headers:{'authorization':token}})
      JSON.parse(value.data).forEach(e=>{
            totalAmount(e.amount)
            showAllItemOnScreen(e,true)
          

    }) 
    
}catch(err){
    console.log('error while onloading')
}
    
});
function addExpense(e){
    try{    
    e.preventDefault()    
        let obj={
            amount:document.getElementById('amount').value,
            comment:document.getElementById('comment').value,
            catagory:document.getElementById('catagory').value
         }
         
         showAllItemOnScreen(obj,false)
     }catch(e){
            console.log('error while adding ')
        }
    }



async function showAllItemOnScreen(obj,screenload){
    try{
        if(obj.amount===''||obj.comment===''){
                document.getElementById('error').innerHTML='OOh! plaese fill all field'
                setTimeout(()=>document.getElementById('error').innerHTML="",3000)
                return
             }
                let li=document.createElement('li')
                li.appendChild(document.createTextNode(`${obj.amount} : ${obj.comment} : ${obj.catagory} ::`))
                let del=document.createElement('button')
                del.appendChild(document.createTextNode('Delete'))
                del.className='delete'
                li.className='list'
                li.value=obj.amount
                let edit=document.createElement('button')
                edit.appendChild(document.createTextNode('Edit'))
                edit.className='edit'
                li.appendChild(del)
                li.appendChild(edit)
                
            if(screenload){
                addItem.appendChild(li)
                del.value=obj.id
                edit.value=obj.id
               
            }else{
               const value=await axios.post(`http://localhost:3000/expense/addExpense`,obj,{headers:{'authorization':token}})
               const id=Number(value.data)
                    del.value=id
                    edit.value=id
                    totalAmount(obj.amount)
                    addItem.appendChild(li)
                
               
            }
     }catch(e){ 
         document.getElementById('error').innerHTML=`something went wrong`
        console.log('error while adding item',e) }            
    
}

async function editDeletebtn (e){
    e.preventDefault()
try{

        const edit=e.target.classList.contains('edit')
        const delet=e.target.classList.contains('delete')
    if(edit || delet){
        const  id=e.target.value
        const amount=  e.target.parentElement.value
    if(edit){
       const value= await axios.get(`http://localhost:3000/expense/ediiAmount/${id}`,{headers:{'authorization':token}})
        const{amount,comment,catagory}=value.data[0]
                document.getElementById('amount').value=amount
                document.getElementById('comment').value=comment
                document.getElementById('catagory').value=catagory
            
    }
  
   await axios.post(`http://localhost:3000/expense/deleteAmount/${id} `,{amount},{headers:{'authorization':token}})
    totalAmount(-amount)
    addItem.removeChild(e.target.parentElement)//deleting item after successfully deleting from backend
    }
}catch(g){console.log('error while deleting ',g)}
}


const total=document.getElementById('total')
function totalAmount(amount){
            let value=Number(amount)
                total.value=Number(total.value) +value
            total.innerHTML=`Tottal Expense <button class="totalamount" >${total.value}</button>`
          
    }

    
