const Order = require('../models/order');
const RazorPay = require('razorpay');
const jwt = require('jsonwebtoken');

const purchasepremium = async (req,res)=>{
    try{
        var rzp = new RazorPay({
            key_id: 'rzp_test_3rO13alObCOmE1',
            key_secret: 'CpkI41J13Yk25IwLKnUFznqg'
        }) 
        const amount = 2500;
    
       await rzp.orders.create( {amount, currency: "INR"}, async(err,order)=>{
           
            if(err){
                throw new Error(JSON.stringify(err));  
            }
            console.log(order);
        //    await req.user.createOrder({ orderid: order.id, status:'PENDING'})
        await Order.create({ orderid: order.id, status:'PENDING'})
        .then(()=>{
                return res.status(201).json({order, key_id: rzp.key_id});
            })
            .catch((err)=>{
                throw new Error(JSON.stringify(err));  
            })
        })
    }catch(err){
        res.status(501).json({error:err});
    }
    }

    module.exports = {purchasepremium};
