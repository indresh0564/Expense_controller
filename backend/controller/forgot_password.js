const uuid = require('uuid');
const SibApiV3Sdk = require('sib-api-v3-sdk');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();

const User = require('../models/user');
const forgotPassword = require('../models/forgotpassword');

exports.forgotpassword = async(req,res)=>{
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    
    var apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.API_KEY;
    try{
      const email = req.body.email;
      const user = await User.findOne({where : {email}});
      if(user){
        const id = uuid.v4();
        const forgotpasswordcreate = await forgotPassword
        .create({ id, active: true, userId: user.id })
        console.log(forgotpasswordcreate)
  
        const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
        const sender ={
          email : "indresh0564@gmail.com",
          name : "INDRESH SAHU",
        };
        
        const receivers = [
          {
            email : req.body.email,
          }
        ];

        const msg = {
          sender,
          to : receivers,
          subject : "Reset Your Password",
          htmlContent: `<a href="http://localhost:5000/password/resetpassword/${id}">Reset password </a>`,
        };
  
        try{
          const sendEmail = await apiInstance.sendTransacEmail(msg);
          return res.status(200).json({message: 'Link to reset password sent to your mail', success: true});
        }catch(error){
          console.error('Error sending the email:', error);
          throw new Error(error);
        }
      }else{
        throw new Error('User does not Exist');
      }
    }catch(err){
      console.log(err);
      return res.status(500).json({message : err.message, success : false})
    }
    
  }













// const uuid = require('uuid');
// const sibapiv3sdk = require('sib-api-v3-sdk');
// const bcrypt = require('bcrypt');
// const dotenv = require('dotenv').config();

// const User = require('../models/user');
// const Forgotpassword = require('../models/forgotpassword');

// const forgotpassword = async (req, res) => {
//     try {
//         const { email } =  req.body;
//         const user = await User.findOne({where : { email }});
//         if(user){
//             const id = uuid.v4();
//             user.createForgotpassword({ id , active: true })
//                 .catch(err => {
//                     throw new Error(err)
//                 })

//             sgMail.setApiKey(process.env.SENGRID_API_KEY)

//             const msg = {
//                 to: email, // Change to your recipient
//                 from: 'indresh0564@gmail.com', // Change to your verified sender
//                 subject: 'Sending with SendGrid is Fun',
//                 text: 'and easy to do anywhere, even with Node.js',
//                 html: `<a href="http://localhost:3000/password/resetpassword/${id}">Reset password</a>`,
//             }

//             sgMail
//             .send(msg)
//             .then((response) => {

//                 // console.log(response[0].statusCode)
//                 // console.log(response[0].headers)
//                 return res.status(response[0].statusCode).json({message: 'Link to reset password sent to your mail ', sucess: true})

//             })
//             .catch((error) => {
//                 throw new Error(error);
//             })

//             //send mail
//         }else {
//             throw new Error('User doesnt exist')
//         }
//     } catch(err){
//         console.error(err)
//         return res.json({ message: err, sucess: false });
//     }

// }

// module.exports = forgotpassword;