const user_model = require('../models/user');

exports.login = async(req,res,next)=>{
    try{
        const {email,password} = req.body;
        // if(isstringinvalid(email)||isstringinvalid(password))
        // {
        //    return res.status(400).json({ message : "email or password invalid",success:false});
        // }
        const user = await user_model.findAll({ where: { email }})
            if(user.length>0)
            {
                if(user[0].password===password){
                 res.status(200).json({success:true , message:"User logged successfully"})
                }else{
                   return res.status(400).json({success:false,message:"User password is incorrect"})
                  }
            }else{
                return res.status(404).json({success:false,message:"User does not exist"});
            }

        }catch(err){
            res.status(500).json({success:false,message:err});
        }
    
}