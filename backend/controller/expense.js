const expense_model = require("../models/expense");
const user = require("../models/user");
const sequelize = require("../database/mysql");
const AWS = require('aws-sdk');
const UserServices = require('../services/userServices');
const awsS3Sevices = require('../services/awsS3Services'); 

// async function uploadToS3(data , filename){

// const IAM_USER_KEY = 'AKIA5AQPD7A6R5LKYK6M';
// const IAM_USER_SECRET = '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';
// const BucketName = 'indreshsahubucket';
  
// const s3bucket = new AWS.S3({
//   accessKeyId:IAM_USER_KEY,
//   secretAccessKey:IAM_USER_SECRET
// })

// var params = {
//   Bucket:BucketName,
//   Key:filename,
//   Body:data,
//   ACL:'public-read'
// }

// return new Promise((resolve , reject)=>{
//   s3bucket.upload(params , (err , response)=>{
//     if(err){
//       console.log('somthing went wrong', err)
//       reject(err);
//     }else{
//       console.log('success', response.Location);
//       resolve(response.Location);
//     }
//   })
// })
// }

exports.download = async(req, res)=>{
  try{
    const expenses = await UserServices.get_expenses(req);
    const stringifiedExpenses = JSON.stringify(expenses);
    const filename = `Expense__${req.user.id}/${new Date}.txt`;

    const fileUrl = await awsS3Sevices.UploadToS3(stringifiedExpenses , filename);
    res.status(201).json({fileUrl , success:true});

  }catch(err){
    res.status(500).json({error:err, success:false});
  }
}

exports.expense = async (req, res, next) => {
  const t = await sequelize.transaction();

  const { expense, description, category } = req.body;
  var sum = parseInt(req.user.totalExpense) + parseInt(expense);

  try {
    const result = await expense_model.create(
      {
        expense: expense,
        description: description,
        category: category,
        userId: req.user.id,
      },
      { transaction: t }
    );
    await user.update(
      { totalExpense: sum || expense },
      { where: { id: req.user.id }, transaction: t }
    );

    await t.commit();
    res.status(200).json({ result: result });
  } catch (err) {

    await t.rollback();
    return res.status(500).json({ sucess: false, error: err });
  }
};

exports.get_expenses = (req, res, next) => {
  expense_model
    .findAll({ where: { userId: req.user.id } })
    .then((expenses) => {
      res.status(201).json(expenses);
    })
    .catch((err) => {
      res.status(500).json({ err: err });
    });
};

exports.delete_expense = async (req, res, next) => {
  const transac = await sequelize.transaction();

  try {
    const id = req.params.id;
    const exp = await expense_model.findOne({
      where: { id: id, userId: req.user.id },
      transaction: transac,
    });
    const sub = parseInt(req.user.totalExpense) - parseInt(exp.expense);

    await user.update(
      { totalExpense: sub },
      { where: { id: req.user.id }, transaction: transac }
    );
    await expense_model.destroy({
      where: { id: id, userId: req.user.id },
      transaction: transac,
    });
    await transac.commit();

    res.status(200).json({ result: sub });
  } catch (err) {
    await transac.rollback();
    return res.status(500).json({ sucess: false, error: err });
  }
};



