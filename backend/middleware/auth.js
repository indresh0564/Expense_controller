const user_model = require('../models/user');
const jwt = require('jsonwebtoken');

    const authenticate = (req,res,next)=>{
        const token = req.header('authorization');
        
        const user = jwt.verify(token,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
        
        user_model.findByPk(user.userId)
        .then((user)=>{
            req.user = user;
            next();
        })
        .catch(err=>res.status(500).json({error:err}));
        }
        module.exports = { authenticate };  

