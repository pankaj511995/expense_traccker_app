const token=localStorage.getItem('username')
console.log(token,'token is ')
document.getElementById('addExpense').addEventListener('click',addExpense)
const addItem=document.getElementById('addItem')
addItem.addEventListener('click',editDeletebtn)

window.addEventListener('DOMContentLoaded', () => {
    axios.get(`http://localhost:3000/expense/showexpense`,{headers:{'authorization':token}}).then(e=>{
        const f=true
    e.data.forEach(e=>{
        totalAmount(e.amount)
        showAllItemOnScreen(e,f)
    }) 
    })
});
function addExpense(e){
    e.preventDefault()
    
        let obj={
            amount:document.getElementById('amount').value,
            comment:document.getElementById('comment').value,
            catagory:document.getElementById('catagory').value
         }
         
         showAllItemOnScreen(obj,false)
    }



function showAllItemOnScreen(obj,screenload){
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
                axios.post(`http://localhost:3000/expense/addExpense`,obj,{headers:{'authorization':token}}).then(e=>{
                    const id=e.data.id
                    del.value=id
                    edit.value=id
                    totalAmount(obj.amount)
                    addItem.appendChild(li)
                })
                .catch(e=> document.getElementById('error').innerHTML=e.response.data)
            }
     }catch(e){ console.log('error while adding item',e) }            
    
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
        await axios.get(`http://localhost:3000/expense/ediiAmount/${id}`,{headers:{'authorization':token}})
        .then(e=>{console.log('for editing',e.data)
                document.getElementById('amount').value=e.data[0].amount
                document.getElementById('comment').value=e.data[0].comment
                document.getElementById('catagory').value=e.data[0].catagory
            })
    }
  
 axios.post(`http://localhost:3000/expense/deleteAmount/${id} `,{amount},{headers:{'authorization':token}}) .then(f=>{  
    totalAmount(-amount)
    addItem.removeChild(e.target.parentElement)})//deleting item after successfully deleting from backend
    }
}catch(g){console.log('error while deleting ',g)}
}

    function totalAmount(amount){
        const totalTable=document.getElementById('total')
            if(!totalTable.value){
                totalTable.value=Number(amount)
            }else{
                totalTable.value=Number(totalTable.value)+Number(amount)
            
            totalTable.innerHTML=`Tottal Expense <button class="totalamount" >${totalTable.value}</button>`
            }
          
    }
