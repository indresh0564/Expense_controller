const bcrypt = require('bcrypt');
const user_model = require('../models/user');
const { json } = require('body-parser');

exports.User = (req,res,next)=>{
    try
    { 
        const {name, email, contact, password} = req.body;
        
        const saltround = 10;
        bcrypt.hash(password, saltround, async(err,hash)=>{
            if(err){
                throw new Error(JSON.stringify(err));
            }
        const data =await user_model.create({name:name , email:email, contact: contact, password:hash});
        res.status(201).json({newuser:data});
        })

    }catch(err){
        res.status(509).json({error:err});
    }  
};
