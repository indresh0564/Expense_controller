const user_model = require('../models/user');

exports.User = async(req,res,next)=>{
    try
    { 
        const name = req.body.name;
        const email = req.body.email;
        const contact = req.body.contact;
        const password = req.body.password;
        const data =await user_model.create({name:name , email:email, contact: contact, password:password});
        res.status(201).json({newuser:data});

    }catch(err){
        res.status(509).json({error:err});
    }  
};
