const expense_model = require('../models/expense');
const user = require('../models/user');
const sequelize = require('../database/mysql');
const { NUMBER } = require('sequelize');


exports.expense =async (req, res, next)=>{
    const t = await sequelize.transaction();

    const {expense, description, category} = req.body;
    var sum = parseInt(req.user.totalExpense)+parseInt(expense);

    try{
    const result = await expense_model.create({expense:expense, description:description,category:category, userId:req.user.id},{transaction:t})
        await user.update({totalExpense:sum||expense},{where:{id:req.user.id} , transaction:t})
        await t.commit();
        res.status(200).json({result:result}); 

    }catch(err){
        await t.rollback();
        return res.status(500).json({sucess:false, error:err});
    }
}

exports.get_expenses = (req, res, next)=>{
   expense_model.findAll({where:{userId:req.user.id}})
   .then((expenses)=>{
    res.status(201).json(expenses);
   })
   .catch((err)=>{res.status(500).json({err:err});});
}

exports.delete_expense = async(req,res,next)=>{
    const transac = await sequelize.transaction();

    try{
        const id = req.params.id;
        const exp = await expense_model.findOne({where:{id:id,userId:req.user.id} , transaction:transac});
        const sub = parseInt(req.user.totalExpense)-parseInt(exp.expense);
    
        await user.update({totalExpense:sub},{where:{id:req.user.id} , transaction:transac})
        await expense_model.destroy({where:{id:id,userId:req.user.id} , transaction:transac});
        await transac.commit();

        res.status(200).json({result:sub}); 
    }catch(err){
        await transac.rollback();
        return res.status(500).json({sucess:false, error:err});  
    }
    
}
