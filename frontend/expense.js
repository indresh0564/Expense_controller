
//show Leaderboard On screen

// const { express } = require("express");

function showOnLeaderboard(){
try{
    const inputEle = document.createElement('input');
    inputEle.value = "Show Leaderboard";
    inputEle.type = "button";
    inputEle.onclick = async (e)=>{
    const token = localStorage.getItem('token');  
    const leaderboard_list = await axios.get("http://localhost:3000/leaderboard",{headers:{"Authorization":token}});

    var leaderboardEle = document.getElementById('leaderboard_id');
    leaderboardEle.innerHTML += '<h1>Leader Board</h1>';

    leaderboard_list.data.forEach(element => {
        leaderboardEle.innerHTML += `<li>Name - ${element.name} TotalExpense - ${element.totalExpense||0}</li>`;
    });

    }
    document.getElementById('message').innerHTML = "you are a premium user";
    document.getElementById('message').appendChild(inputEle);

}catch(err){
console.log(err);
}

}

//  buy premium button function 

document.getElementById('rzp-button1').onclick = async function(e){
    const  token = localStorage.getItem('token');
    const response = await axios.get("http://localhost:3000/get_order",{headers:{"Authorization":token}})
    
    var option = {
        "key": response.data.key_id,
        "order_id":response.data.order.id,

        "handler": async function(response){
           await axios.post("http://localhost:3000/post_order",{
            order_id : option.order_id,
            payment_id : response.razorpay_payment_id,
           },{headers:{"authorization":token}}) 

           alert("you are a Premium User Now")
          document.getElementById('rzp-button1').style.visibility = 'hidden';
        showOnLeaderboard();
        } 
    }
    const rzp1 = new Razorpay(option);
    rzp1.open();
    e.preventDefault();

    rzp1.on('payment.failed', function(response){
        console.log(response);
        alert("Something went wrong");
    })

}

    //  save expenses in database

   async function savetolocalstorage(e)
    {
        try{
            e.preventDefault();
        const expense = e.target.expense.value;
        const description = e.target.description.value;
        const category = e.target.category.value;

        const obj = {
            expense,
            description,
            category
        }
        const token = localStorage.getItem('token');
       await axios.post("http://localhost:3000/expense" , obj  , {headers:{"Authorization":token}})
       showOnScreen(obj);

        }catch(err){
            console.log(err);
        }    
    }

            // show expenses on screen

    function showOnScreen(obj)
    {  try{
        const parentEle = document.getElementById('listofitem');
       const childEle = document.createElement('li');
       childEle.textContent = `${obj.expense}-${obj.description}-${obj.category}`;
       
       const deleteBtn = document.createElement('input');
       deleteBtn.type = "submit";
       deleteBtn.value = "Delete";
       childEle.appendChild(deleteBtn);

       deleteBtn.onclick = (req,res)=>{
        const token = localStorage.getItem('token');
        axios.delete(`http://localhost:3000/delete_expense/${obj.id}`,{headers:{"Authorization":token}})
        localStorage.removeItem(deleteBtn);
        parentEle.removeChild(childEle);
        }

         parentEle.append(childEle);
    }catch(err){
        res.status(501).json({err:err});
    }

    }

    window.addEventListener("DOMContentLoaded",async(req,res)=>{

    const token = localStorage.getItem('token');

        // show leaderboard button and hide buyPremium button on screen
    // try{
     axios.get("http://localhost:3000/ispremiumuser", {headers:{"Authorization":token}})
     .then((response)=>{
        console.log(response);
        if(response.data===true){
        document.getElementById('rzp-button1').style.visibility = 'hidden';
        showOnLeaderboard();
        // res.status(202).json({response:response});
        }
     })
     .catch((err)=>{
        res.status(501).json({Error:err});
     })
   
    
        // show expenses on screen

    await axios.get("http://localhost:3000/get_expenses", {headers:{"Authorization":token}})
    .then((result)=>{ 
        for(let i=0; i<result.data.length; i++){
             showOnScreen(result.data[i]);
        }
    })
    .catch((err)=>{
        res.status(502).json({err:err});
    })
   })
